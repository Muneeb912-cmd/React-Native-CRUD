import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Appbar, Modal, Portal, Text, Button, Card } from "react-native-paper";
import CardLayout from "../components/CardLayout";
import { getData } from "../service/Service";
import { useNavigation } from "@react-navigation/native";
import ProfileCardLayout from "../components/ProfileCardLayout";
import UserDetailsCard from "../components/UserDetailsCard";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const navigation = useNavigation();

  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const modalPadding = isLandscape ? 80 : 20;
  const containerStyle = { padding: 20,paddingLeft: isLandscape ? 80 : 20, paddingRight: isLandscape ? 80 : 20};

  const showModal = () => setVisible(true);
  const hideModal = () => setTimeout(() => setVisible(false), 100); 

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const data = await getData();
      setDataList(data.data);
    } catch (error) {
      Alert.alert("Error Occurred", error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#4285F4" }}>
        <Appbar.Content title="Home Screen" titleStyle={{ color: "white" }} />
        <Appbar.Action
          icon="account"
          onPress={() => {
            navigation.navigate("ProfileScreen");
          }}
          color="white"
        />
      </Appbar.Header>
      <View style={{ flex: 1, padding: 10 }}>
        {!isLoading ? (
          <CardLayout
            dataList={dataList}
            getUserData={getUserData}
            setSelectedUser={setSelectedUser}
            showModal={showModal}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 10 }}>Loading...</Text>
        )}
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[containerStyle, { paddingLeft: modalPadding, paddingRight: modalPadding }]}
          hideModalContentWhileAnimating={true}
        >
          <UserDetailsCard userData={selectedUser} />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 2,
  },
});
