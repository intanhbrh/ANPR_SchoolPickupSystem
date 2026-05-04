import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";

export default function EmailScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const sendOtp = async () => {
    if (!email.endsWith("@kl.his.edu.my")) {
      Alert.alert("Error", "Use school email only");
      return;
    }

    try {
      const response = await fetch("http://anpr.kl.his.edu.my/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname: "Student" }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "OTP sent to email");
        navigation.navigate("OTP", { email });
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (err) {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter school email"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}