import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDepositsData } from "../hooks/useDeposit";
import Pagination from "../components/Pagination";
const DepositTableScreen = () => {
const [pageNumber, setPageNumber] = useState(1);
const [pageSize, setPageSize] = useState(10);

const { data, isLoading, isError } = useDepositsData({
  pageNumber,
  pageSize,
});

  const [expandedId, setExpandedId] = useState(null);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f6f9", padding: 12 }}>
      <FlatList
        data={data?.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id;

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                setExpandedId(isExpanded ? null : item.id)
              }
              style={styles.card}
            >
              {/* TOP ROW (Always Visible) */}
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.txnId}>
                    {item.transaction_id}
                  </Text>
                  <Text style={styles.date}>
                    {item.initiatedAt}
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.amount}>
                    ₹ {item.amount}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      item.status === "SUCCESS"
                        ? styles.success
                        : item.status === "FAILED"
                        ? styles.failed
                        : styles.pending,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* EXPANDED DETAILS */}
              {isExpanded && (
                <View style={styles.details}>
                  <Text>Order ID: {item.payReference || "-"}</Text>
                  <Text>User: {item.mobile || "-"}</Text>
                  <Text>UTR: {item.utr || "-"}</Text>
                  <Text>CompletedAt: {item.completedAt || "-"}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
   <Pagination
  totalItems={95}
  pageNumber={pageNumber}
  pageSize={pageSize}
  onPageChange={(page, size) => {
    setPageNumber(page);
    setPageSize(size);
  }}
/>
    </View>
  );
};

export default DepositTableScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  txnId: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#111",
  },

  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },

  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  success: {
    backgroundColor: "#22C55E",
  },

  failed: {
    backgroundColor: "#EF4444",
  },

  pending: {
    backgroundColor: "#F59E0B",
  },

  details: {
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
    gap: 4,
  },
});