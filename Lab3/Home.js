import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";

const REPO_QUERY = gql`
  query MyQuery($Search: String!) {
    search(query: $Search, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          description
          stargazerCount
          name
          forkCount
          refs(first: 0, refPrefix: "refs/heads/") {
            totalCount
          }
          licenseInfo {
            key
          }
          createdAt
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

function tryFetchQuery(searchLang, startDate, endDate) {
  let searchQuery = "created:>" + startDate + " stars:>1000";

  if (searchLang !== "any") {
    searchQuery += ` language:${searchLang}`;
  }

  const { loading, error, data } = useQuery(REPO_QUERY, {
    variables: {
      Search: searchQuery,
      startDate,
    },
  });

  if (loading) return "loading";
  if (error) {
    console.log(`Error! ${error.message}`);
    return "error";
  }

  const repositories = data.search.nodes;

  return repositories;
}

export default function Home({ toggleDetails }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("any");

  //Get timeframe, current year
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);

  const repositories = tryFetchQuery(search, startOfYear.toISOString());

  if (repositories == "error") {
    return (
      <View style={styles.topContainer}>
        <Text> ERROR!</Text>
      </View>
    );
  } else if (repositories == "loading") {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.topContainer}>
          <ActivityIndicator size="large" />
          <Text style={{ color: "white" }}> LOADING...</Text>
        </View>
      </View>
    );
  }
  //
  else {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.headerText}>Trending</Text>
        </View>
        <FlatList
          data={repositories}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", {
                  name: item.name,
                  description: item.description,
                  licenseInfo: item.licenseInfo,
                  defaultBranchRef: item.defaultBranchRef,
                  refs: item.refs,
                  createdAt: item.createdAt,
                })
              }
            >
              <View style={styles.buttonContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{item.name}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.starContainer}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Stars: <Text>{item.stargazerCount}</Text>
                    </Text>
                  </View>
                  <View style={styles.forkContainer}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Forks: <Text>{item.forkCount}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
        <View style={styles.languageContainer}>
          <Picker
            selectedValue={search}
            onValueChange={(itemValue, itemIndex) => setSearch(itemValue)}
          >
            <Picker.Item label="All Languages" value="any" />
            <Picker.Item label="C" value="c" />
            <Picker.Item label="C#" value="c#" />
            <Picker.Item label="C++" value="c++" />
            <Picker.Item label="JavaScript" value="javascript" />
            <Picker.Item label="React" value="React" />
            <Picker.Item label="React Native" value="react native" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="HTML" value="html" />
            <Picker.Item label="PHP" value="php" />
            <Picker.Item label="CSS" value="css" />
            <Picker.Item label="Ruby" value="ruby" />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#303030",
  },
  topContainer: {
    width: "100%",
    height: 70,
    alignItems: "center",
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center",
  },

  //TEXT
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 35,
    color: "white",
  },

  //BUTTON
  buttonContainer: {
    backgroundColor: "#424242",
    margin: 5,
    borderRadius: 5,
    flex: 1,
    elevation: 5,
    shadowColor: "#000",
  },

  titleContainer: {
    height: 50,
    padding: 10,
    width: "100%",
  },

  descriptionContainer: {
    paddingLeft: 10,
    minHeight: 50,
    width: "100%",
  },
  bottomContainer: {
    height: 30,
    width: "100%",
    flexDirection: "row-reverse",
  },
  starContainer: {
    height: 20,
    minWidth: 90,
    marginRight: 10,
    borderWidth: 1,
    backgroundColor: "#FAF695",
    paddingHorizontal: 3,
  },
  forkContainer: {
    marginRight: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  descriptionText: {
    fontSize: 15,
    color: "white",
  },
  languageContainer: {
    alignSelf: "stretch",
    backgroundColor: "#ebed85",
  },
});
