import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { getPurchaseHistory } from "../services/purchases";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Purchase = {
  id: string;
  productTitle: string;
  amount: number;
  status: string;
  createdAt: string;
};

export const PurchaseHistoryScreen = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Purchase[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isMounted = true;
    getToken()
      .then(token => getPurchaseHistory(token))
      .then(data => {
        if (isMounted) {
          setItems(data.purchases ?? []);
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
  }, []);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>My Purchases</Text>
        <Text style={styles.subtitle}>Receipts & transactions</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : items.length === 0 ? (
        <Text style={styles.empty}>No purchases yet</Text>
      ) : (
        items.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("Receipt", { purchaseId: item.id })}
          >
            <Text style={styles.cardTitle}>{item.productTitle}</Text>
            <Text style={styles.cardMeta}>₹{item.amount} • {item.status}</Text>
            <Text style={styles.cardMeta}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: lightTheme.colors.textMuted
  },
  empty: {
    marginTop: 24,
    marginHorizontal: 16,
    color: lightTheme.colors.textSecondary
  },
  loader: {
    marginTop: 24
  },
  card: {
    backgroundColor: lightTheme.colors.surface,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderColor: lightTheme.colors.border,
    borderWidth: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: lightTheme.colors.textPrimary
  },
  cardMeta: {
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  }
});
