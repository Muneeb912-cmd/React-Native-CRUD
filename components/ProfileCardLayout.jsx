import React from "react";
import { Card, Avatar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const ProfileCardLayout = ({ userData, showModal }) => {
  return (
    <Card
      style={styles.card}
      onPress={() => {
        showModal();
      }}
    >
      <Card.Content style={styles.cardContent}>
        <Avatar.Image
          size={100}
          source={
            userData.gender == "Male"
              ? require("../assets/images/avatar_male.png")
              : require("../assets/images/avatar_female.png")
          }
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{userData.username}</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginStart: 20,
              marginBottom: 5,
            }}
          />
          <Text style={styles.otherText}>{userData.useremail}</Text>
          <Text style={styles.otherText}>{userData.phone || "123456789"}</Text>
          <Text style={styles.otherText}>Gender: {userData.gender}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  otherText: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default ProfileCardLayout;
