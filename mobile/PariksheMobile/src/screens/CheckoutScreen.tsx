import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { confirmPurchase, createCheckout } from "../services/purchases";
import RazorpayCheckout from "react-native-razorpay";
import { createOrder, getRazorpayKey, verifyPayment } from "../services/payments";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export const CheckoutScreen = ({ navigation, route }: Props) => {
  const { productId } = route.params;
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [summary, setSummary] = useState<{
    title: string;
    price: number;
    discountAmount: number;
    total: number;
  } | null>(null);
  const { getToken } = useAuth();

  const handlePay = async () => {
    setLoading(true);
    try {
      const result = await createCheckout(productId, couponCode || undefined);
      if (result.status !== "ok") {
        Alert.alert("Checkout failed");
        return;
      }

      const summaryData = result.summary ?? null;
      setSummary(summaryData);
      if (!summaryData?.total) {
        Alert.alert("Invalid total");
        return;
      }

      const key = await getRazorpayKey();
      const order = await createOrder(summaryData.total);

      const options = {
        key: key.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Parikshe",
        description: summaryData.title,
        order_id: order.orderId
      };

      const paymentResult = await RazorpayCheckout.open(options);
      const verifyResult = await verifyPayment({
        orderId: order.orderId,
        paymentId: paymentResult.razorpay_payment_id,
        signature: paymentResult.razorpay_signature
      });

      if (verifyResult.status === "ok") {
        const token = await getToken();
        await confirmPurchase(token, {
          productId,
          amount: summaryData.total,
          status: "paid",
          paymentOrderId: order.orderId,
          paymentId: paymentResult.razorpay_payment_id,
          paymentStatus: "paid"
        });
        navigation.navigate("PurchaseSuccess", { productId });
      } else {
        Alert.alert("Payment verification failed");
      }
    } catch {
      Alert.alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.card}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.meta}>Batch: {summary?.title ?? "Full-year"}</Text>
        <Text style={styles.meta}>Price: ₹{summary?.price ?? 0}</Text>
        <Text style={styles.meta}>Discount: ₹{summary?.discountAmount ?? 0}</Text>
        <Text style={styles.meta}>Total: ₹{summary?.total ?? 0}</Text>
        <TextInput
          style={styles.input}
          placeholder="Coupon code (optional)"
          value={couponCode}
          onChangeText={setCouponCode}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handlePay} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? "Processing..." : "Pay now"}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.colors.surface,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderColor: lightTheme.colors.border,
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors.textPrimary
  },
  meta: {
    marginTop: 8,
    fontSize: 14,
    color: lightTheme.colors.textSecondary
  },
  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: lightTheme.colors.surface
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  }
});
