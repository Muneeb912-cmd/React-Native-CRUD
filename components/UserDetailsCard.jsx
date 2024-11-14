import React from "react";
import { Card, Avatar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const UserDetailsCard = ({ userData }) => {
  return (
    <Card>
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
          <Text style={styles.otherText}>Phone: {userData.phone || "123456789"}</Text>
          <Text style={styles.otherText}>Gender: {userData.gender}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    margin: 10,
    elevation: 2,
    flexDirection: "Column",
    alignItems: "center",
  },
  nameContainer: {
    alignItems: "center",
  },
  nameText: {
    marginTop:10,
    fontSize: 20,
    fontWeight: "bold",
  },
  otherText: {
    fontSize: 16,
  },
});

export default UserDetailsCard;
