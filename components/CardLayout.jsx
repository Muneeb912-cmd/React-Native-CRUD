import React,{useState} from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { Card, Avatar, IconButton,Text } from "react-native-paper";

const CardLayout = ({ dataList,getUserData,setSelectedUser,showModal }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getUserData();
    } catch (error) {
      Alert.alert("Error Occurred", error.message || "An error occurred");
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={dataList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card
          style={styles.card}
          onPress={() => {
            setSelectedUser(item);
            showModal();
          }}
        >
          <Card.Content style={styles.cardContent}>
            <Avatar.Image
              size={50}
              source={
                item.gender == "Male"
                  ? require("../assets/images/avatar_male.png")
                  : require("../assets/images/avatar_female.png")
              }
            />
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{item.username}</Text>
            </View>
            <IconButton
              icon="chevron-right"
              size={30}
              onPress={() =>
                console.log(`Navigate to ${item.username}'s profile`)
              }
            />
          </Card.Content>
        </Card>
      )}
    />
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
  },
});

export default CardLayout;
