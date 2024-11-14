import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Card, TextInput, Button, Text, Divider } from "react-native-paper";
import { login, signup } from "../service/Service";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../service/Validators";
import UserModel from "../models/UserModel";
import { Ionicons } from "@expo/vector-icons"; 

const clearStackAndGoToHome = (navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Home" }],
    })
  );
};

const LoginSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(new UserModel("", "", "", "", "", ""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });
  const navigation = useNavigation();

  const handleAuthToggle = () => setIsSignUp(!isSignUp);

  const validateFields = () => {
    let valid = true;
    let newErrors = {};

    if (!validateEmail(user.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (isSignUp && !validateUsername(user.name)) {
      newErrors.userName = "Please enter a valid username.";
      valid = false;
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password cannot be empty";
      valid = false;
    } else if (!validatePassword(user.password)) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }

    // Confirm Password validation (only when user is signing up)
    if (isSignUp && confirmPassword !== user.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
    if (errors[field])
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSignup = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const data = await signup(user);
      Alert.alert("Signup Successful", `Welcome, ${data.username}!`);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Signup Failed", error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const data = await login(user.email, user.password);
      Alert.alert("Login Successful", `Welcome back, ${data.email}!`);
      clearStackAndGoToHome(navigation)
    } catch (error) {
      Alert.alert("Login Failed", error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>

          {isSignUp && (
            <TextInput
              label="User Name"
              value={user.name}
              onChangeText={(text) => handleInputChange("name", text)}
              style={styles.input}
              error={!!errors.userName}
            />
          )}
          {errors.userName ? (
            <Text style={styles.error}>{errors.userName}</Text>
          ) : null}

          <TextInput
            label="Email"
            value={user.email}
            onChangeText={(text) => handleInputChange("email", text)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
          />
          {errors.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <TextInput
              label="Password"
              value={user.password}
              onChangeText={(text) => handleInputChange("password", text)}
              style={styles.input}
              secureTextEntry={!showPassword}
              error={!!errors.password}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.toggleIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}

          {isSignUp && (
            <View style={styles.inputContainer}>
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                secureTextEntry={!showConfirmPassword} // If showConfirmPassword is false, secureTextEntry will be true
                error={!!errors.confirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                style={styles.toggleIcon}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"} // Change icon based on showConfirmPassword state
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          )}
          {errors.confirmPassword ? (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={isSignUp ? handleSignup : handleLogin}
            style={styles.button}
            disabled={isLoading}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>

          <Divider style={styles.divider} />

          <View style={styles.toggleContainer}>
            <Text>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <Button onPress={handleAuthToggle}>
              {isSignUp ? "Login" : "Sign Up"}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginSignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
  },
  divider: {
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative",
  },
  toggleIcon: {
    position: "absolute",
    right: 10,
    top: 19,
  },
});
