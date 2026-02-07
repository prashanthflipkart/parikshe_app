import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { requestOtp } from "../services/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigation/AppNavigator";

type Nav = NativeStackNavigationProp<AuthStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<Nav>();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.trim().length < 8) {
      Alert.alert("Enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      const result = await requestOtp(phone.trim());
      if (result.status === "ok") {
        if (result.devOtp) {
          Alert.alert("Dev OTP", `OTP: ${result.devOtp}`);
        }
        navigation.navigate("Otp", { phone: phone.trim() });
      } else {
        Alert.alert("Failed to send OTP");
      }
    } catch {
      Alert.alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome / ಸ್ವಾಗತ</Text>
        <Text style={styles.subtitle}>Login with your phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleSendOtp} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? "Sending..." : "Send OTP"}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: lightTheme.colors.surface
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
