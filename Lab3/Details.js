import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

export default function Details({ route }) {
  const { name, description, licenseInfo, defaultBranchRef, refs, createdAt } =
    route.params;

  // Convert updatedAt to a Date object
  const createdAtDate = new Date(createdAt);

  // Get the date string in locale-specific format (date only)
  const formattedDate = createdAtDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <View style={styles.bodyContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.projectName}>{name}</Text>
          <Text style={styles.descrip}>{description}</Text>
        </View>

        <Text style={styles.infoLeft}>
          License:{" "}
          <Text style={styles.infoRight}>
            {licenseInfo ? licenseInfo.key : "N/A"}
          </Text>
        </Text>
        <Text style={styles.infoLeft}>
          Commits:{" "}
          <Text style={styles.infoRight}>
            {defaultBranchRef.target.history.totalCount}
          </Text>
        </Text>
        <Text style={styles.infoLeft}>
          Branches: <Text style={styles.infoRight}>{refs.totalCount}</Text>
        </Text>
        <Text style={styles.infoLeft}>
          Created at: <Text style={styles.infoRight}>{formattedDate}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: "#303030",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  topContainer: {
    paddingBottom: 15,
  },
  projectName: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    padding: 30,
  },
  descrip: {
    fontSize: 22,
    textAlign: "center",
    color: "#d3d3d3",
  },
  infoLeft: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    color: "#d3d3d3",
  },
  infoRight: {
    fontSize: 20,
    textAlign: "center",
    color: "#d3d3d3",
  },
});
