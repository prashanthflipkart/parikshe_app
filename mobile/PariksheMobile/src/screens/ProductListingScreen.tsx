import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { getProducts } from "../services/catalog";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Product = {
  id: string;
  title: string;
  price: number;
  type: string;
};

export const ProductListingScreen = () => {
  const navigation = useNavigation<Nav>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then(data => {
        if (isMounted) {
          setProducts(data.products ?? []);
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
        <Text style={styles.title}>Batches</Text>
        <Text style={styles.subtitle}>SSLC • PU Science • PU Commerce</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        products.map(product => (
          <View key={product.id} style={styles.card}>
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardMeta}>
              {product.type === "crash" ? "Revision + Grand Tests" : "Live + Recorded + Tests"}
            </Text>
            <Text style={styles.price}>₹{product.price}</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
            >
              <Text style={styles.primaryButtonText}>View details</Text>
            </TouchableOpacity>
          </View>
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
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: lightTheme.colors.primary
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: lightTheme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  },
  loader: {
    marginTop: 24
  }
});
