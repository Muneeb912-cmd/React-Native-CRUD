import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card, TextInput, Button, Text, Divider, Chip, Avatar } from "react-native-paper";
import { updateData } from "../service/Service";

import { validateEmail, validateUsername } from "../service/Validators";
import UserModel from "../models/UserModel";

const UpdateUserData = ({ userData, hideModal, getUserData }) => {
  const [user, setUser] = useState(
    userData || new UserModel("", "", "", "", "", "")
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
    phone: "",
    gender: "",
  });
  const [selectedGender, setSelectedGender] = useState(user.gender || "Male"); // Default to "Male"

  const validateFields = () => {
    let valid = true;
    let newErrors = {};

    if (!validateEmail(user.useremail)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validateUsername(user.username)) {
      newErrors.userName = "Please enter a valid username.";
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

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    handleInputChange("gender", gender);
  };

  const updateUserData = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      await updateData(user);
      Alert.alert("Update Successful", "Data has successfully been updated!");
      getUserData();
      hideModal();
    } catch (error) {
      Alert.alert("Update Failed", error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Update Data</Text>
          <TextInput
            label="User Name"
            value={user.username}
            onChangeText={(text) => handleInputChange("username", text)}
            style={styles.input}
            error={!!errors.userName}
          />
          {errors.userName ? (
            <Text style={styles.error}>{errors.userName}</Text>
          ) : null}

          <TextInput
            label="Email"
            value={user.useremail}
            onChangeText={(text) => handleInputChange("useremail", text)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
          />
          {errors.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}

          <TextInput
            label="Phone"
            value={user.phone || ""}
            onChangeText={(text) => handleInputChange("phone", text)}
            style={styles.input}
            keyboardType="number-pad"
            autoCapitalize="none"
            error={!!errors.phone}
          />
          {errors.phone ? (
            <Text style={styles.error}>{errors.phone}</Text>
          ) : null}

          <Text style={styles.genderTitle}>Gender: {user.gender}</Text>
          <View style={styles.genderContainer}>
            <Chip
              mode="outlined"
              selected={selectedGender === "Male"}
              onPress={() => handleGenderSelect("Male")}
              style={styles.chip}
              selectedColor={selectedGender === "Male" ? "blue" : undefined}
              icon={() => <Avatar.Icon size={24} icon="gender-male" />}
            >
              Male
            </Chip>
            <Chip
              mode="outlined"
              selected={selectedGender === "Female"}
              onPress={() => handleGenderSelect("Female")}
              style={styles.chip}
              selectedColor={selectedGender === "Female" ? "blue" : undefined}
              icon={() => <Avatar.Icon size={24} icon="gender-female" />}
            >
              Female
            </Chip>
          </View>

          <Button
            mode="contained"
            onPress={updateUserData}
            style={styles.button}
            disabled={isLoading}
          >
            Update
          </Button>
          <Button
            mode="contained"
            onPress={hideModal}
            style={styles.button}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Divider style={styles.divider} />
        </Card.Content>
      </Card>
    </View>
  );
};

export default UpdateUserData;

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
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  genderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chip: {
    flex: 1,
    marginHorizontal: 4,
  },
});
