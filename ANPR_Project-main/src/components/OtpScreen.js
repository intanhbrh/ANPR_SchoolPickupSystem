import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";

export default function OtpScreen({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://10.252.2.107:3000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful");
        navigation.replace("Home");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (err) {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter OTP sent to {email}</Text>

      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}