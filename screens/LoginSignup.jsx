import React from "react";
import Heading from "../components/Heading";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import LoginSignUpForm from "../components/LoginSignupForm";

const LoginSignupScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <Image
            source={require("../assets/images/app_img.png")}
            style={styles.image}
          />
          <Heading title={"User Authentication"} />
        </View>
        <LoginSignUpForm />
        <Text style={styles.footerText}>Copyright © 2024 | Duko Devs</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginSignupScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding:30
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 20,
  },
});
