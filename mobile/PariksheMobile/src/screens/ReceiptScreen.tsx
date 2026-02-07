import React, { useEffect, useState } from "react";
import { ActivityIndicator, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getPurchaseDetail } from "../services/purchases";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Receipt">;

type Purchase = {
  id: string;
  productTitle: string;
  amount: number;
  status: string;
  createdAt: string;
};

export const ReceiptScreen = ({ route }: Props) => {
  const { purchaseId } = route.params;
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    let isMounted = true;
    getToken()
      .then(token => getPurchaseDetail(token, purchaseId))
      .then(data => {
        if (isMounted) {
          setPurchase(data.purchase ?? null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [purchaseId]);

  const handleShare = async () => {
    if (!purchase) {
      return;
    }
    const message = [
      "Parikshe Receipt",
      `Purchase ID: ${purchase.id}`,
      `Product: ${purchase.productTitle}`,
      `Amount: ₹${purchase.amount}`,
      `Status: ${purchase.status}`,
      `Date: ${new Date(purchase.createdAt).toLocaleString()}`
    ].join("\n");
    await Share.share({ message });
  };

  const handleExportPdf = async () => {
    if (!purchase) {
      return;
    }
    const html = `
      <h1>Parikshe Receipt</h1>
      <p><strong>Purchase ID:</strong> ${purchase.id}</p>
      <p><strong>Product:</strong> ${purchase.productTitle}</p>
      <p><strong>Amount:</strong> ₹${purchase.amount}</p>
      <p><strong>Status:</strong> ${purchase.status}</p>
      <p><strong>Date:</strong> ${new Date(purchase.createdAt).toLocaleString()}</p>
    `;
    const pdf = await RNHTMLtoPDF.convert({
      html,
      fileName: `parikshe-receipt-${purchase.id}`,
      directory: "Documents"
    });
    if (pdf.filePath) {
      await Share.share({
        url: `file://${pdf.filePath}`,
        message: "Parikshe receipt"
      });
    }
  };

  return (
    <Screen>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator />
        ) : purchase ? (
          <>
            <Text style={styles.title}>Receipt</Text>
            <Text style={styles.meta}>Purchase ID: {purchase.id}</Text>
            <Text style={styles.meta}>Product: {purchase.productTitle}</Text>
            <Text style={styles.meta}>Amount: ₹{purchase.amount}</Text>
            <Text style={styles.meta}>Status: {purchase.status}</Text>
            <Text style={styles.meta}>
              Date: {new Date(purchase.createdAt).toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleShare}>
              <Text style={styles.primaryButtonText}>Share receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleExportPdf}>
              <Text style={styles.secondaryButtonText}>Export PDF</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.meta}>Purchase not found</Text>
        )}
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
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: lightTheme.colors.surfaceAlt,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: lightTheme.colors.primary,
    fontWeight: "600"
  }
});
