import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Otp">;

export const OtpScreen = ({ navigation, route }: Props) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    if (otp.trim().length !== 6) {
      Alert.alert("Enter 6-digit OTP");
      return;
    }

    navigation.navigate("Onboarding", { phone, otp: otp.trim() });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Sent to {phone}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Continue</Text>
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
