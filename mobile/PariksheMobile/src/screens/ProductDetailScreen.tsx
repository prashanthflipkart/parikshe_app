import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { lightTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getProductById } from "../services/catalog";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export const ProductDetailScreen = ({ navigation, route }: Props) => {
  const { productId } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<{
    id: string;
    title: string;
    durationMonths?: number;
    price: number;
    type: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    getProductById(productId)
      .then(data => {
        if (isMounted) {
          setProduct(data.product ?? null);
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
  }, [productId]);

  return (
    <Screen scroll>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.title}>{product?.title ?? "Batch"}</Text>
            <Text style={styles.meta}>
              {product?.type === "crash" ? "Crash course" : "Full-year"} •{" "}
              {product?.durationMonths ?? 12} months
            </Text>
            <Text style={styles.meta}>Includes live + recorded + tests + notes</Text>
            <Text style={styles.price}>₹{product?.price ?? 0}</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Checkout", { productId })}
            >
              <Text style={styles.primaryButtonText}>Buy now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>View offers</Text>
            </TouchableOpacity>
          </>
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
    marginTop: 6,
    fontSize: 13,
    color: lightTheme.colors.textSecondary
  },
  price: {
    marginTop: 12,
    fontSize: 18,
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
