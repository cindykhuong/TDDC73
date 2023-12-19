// Description: Component that displays an image carousel with navigation arrows
//              and pagination dots
// Author: Cindy Khuong, Rebecca Sjödin

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

//Function to render one image at a time
export default function Carousel({ data, renderMode }) {
  // Declare window width. Used for rendering
  const windowWidth = Dimensions.get("window").width;

  // State declaration
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const flatListRef = React.useRef(null);

  // Render images for carousel
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth }}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.images} resizeMode="cover" />
          {/* Overlay with kitten name */}
          {item.title && (
            <View style={styles.textContainer}>
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{item.title}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

// Function to render a grid item in the Carousel component
  const renderGridItem = ({ item }) => {

    // Calculate the start and end index for the current grid item
    const startIndex = item * 4;
    const endIndex = Math.min(startIndex + 4, data.length);

    // Arrays to store rows and individual row data
    const rows = [];
    const rowData = [];

    // Loop through the data to create rows with two images each
    for (let i = startIndex; i < endIndex; i += 2) {
      // Create a row with two images side by side
      rowData.push(
        <View
          key={i}
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          {/* First image in the row */}
          <TouchableOpacity key={i}>
            <Image
              source={data[i].image}
              style={styles.gridImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Second image in the row (if exists) */}
          {i + 1 < endIndex && (
            <TouchableOpacity key={i + 1}>
              <Image
                source={data[i + 1].image}
                style={styles.gridImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }

    // Add the row to the rows array
    rows.push(<View key={item}>{rowData}</View>);
    // Return the grid item with its rows
    return <View>{rows}</View>;
  };

  ////////////////////

  // Render dots (pagination) for carousel
  const renderDots = () => {
    // Uses map function to loop through the images and create a <View> element for each image.
    // The <View> represents a dot.
    // If currentIndex (stateVaraible) matches index from loop it applies style for the active dot

    // Determine the data length based on renderMode
    const dotsData =
      renderMode === "renderItem"
        ? data //render one dot per image
        : Array(Math.ceil(data.length / 4)).fill(); //render dots depeneding on the division of images shown

    return (
      <View style={styles.dotContainer}>
        {/* maps through dotsdata */}
        {dotsData.map((_, index) => (
          <View
            key={index} //index for each image
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null, //set active or null style
            ]}
          />
        ))}
      </View>
    );
  };

  // Update currentIndex based on current item in the carousel
  //ViewableItems are the images
  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    // Ensure viewableItems exists and has at least one item
    if (viewableItems && viewableItems.length > 0) {
      // Update currentIndex to the index of the first viewable item
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // If renderGridItem, divide number of images by 4, round up if decimal.
  const numPages =
    renderMode === "renderItem" ? data.length : Math.ceil(data.length / 4);

  // last image --> go to first image
  const scrollToNext = () => {
    const nextIndex = (currentIndex + 1) % numPages;
    flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
  };

  // first image --> last image
  const scrollToPrev = () => {
    const prevIndex = (currentIndex - 1 + numPages) % numPages;
    flatListRef.current?.scrollToIndex({ animated: true, index: prevIndex });
  };

  // Decide how to map the data based on renderMode
  const dataFunction = () => {
    return renderMode == "renderItem"
      ? data
      : Array(Math.ceil(data.length / 4))
          .fill()
          .map((_, index) => index);
  };

  // Decide which render method to use based on renderMode
  const renderFunction = () => {
    return renderMode === "renderItem" ? renderItem : renderGridItem;
  };

  // Decide which key extractor based on renderMode
  const keyFunction = () => {
    return renderMode == "renderItem"
      ? (item) => item.id // if render one image (renderItem) get its id
      : (item, index) => index.toString(); //multiple images (renderGridImage), call index 
  };

  return (
    <View style={styles.bodyContainer}>
      {/* Left arrow */}
      <TouchableOpacity style={styles.arrowLeft} onPress={scrollToPrev}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Image carousel */}
      <FlatList
        // Dependant on which render mode
        data={dataFunction()}
        renderItem={renderFunction()}
        keyExtractor={keyFunction()} //unique key for each  item
        horizontal //renders flatlist horizontally
        pagingEnabled // scroll one page at a time
        showsHorizontalScrollIndicator={false} //to not show the horizontal scroll
        //Percentage of item that must be visible to be considered viewable
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        ref={flatListRef}
      />

      {/* Right arrow */}
      <TouchableOpacity style={styles.arrowRight} onPress={scrollToNext}>
        <FontAwesome name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      {/* Dots for the carousel */}
      {renderDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",
  },
  imageContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: 30,
    height: "100%"
  },
  images: {
    width: 320,
    height: 450,
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  arrowLeft: {
    position: "absolute",
    left: 16,
    top: "50%",
    zIndex: 1,
  },
  arrowRight: {
    position: "absolute",
    right: 16,
    top: "50%",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 20,
    alignSelf: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", //Transparent
    padding: 10,
    width: 320,
    height: 60,
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  gridImage: {
    height: (Dimensions.get("window").width - 30) / 2, // Image height based on available space
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 10,
    marginLeft: 9,
    margin: 5,
  },
});