import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import { TabParamList } from "../navigation/types";

import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useUser } from "../constant/Userprovider";
import useModal from "../hooks/usemodal";
import { useWithdrawList } from "../hooks/useWithdraw";

/* ================================
   TYPES ⭐
================================ */

export type RootStackParamList = {
  Withdraw: {
    type?: "Initial" | "Pending" | "Completed" | "Rejected";
    STATUS?: "ALL" | "PENDING" | "SUCCESS" | "FAILED";
  };
};
export type TabParamList = {
  
  Withdraw: {
    type?: string;
    STATUS?: string;
  };
  
};
type Props = BottomTabScreenProps<TabParamList, "Withdraw">

/* ================================
   COMPONENT
================================ */

const Withdraw = ({ route }: Props) => {

  const type = route?.params?.type ?? "Initial";
  const STATUS = route?.params?.STATUS ?? "ALL";

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();
  const { isModalOpen, openModal } = useModal();

  const { data, isLoading, isError, refetch } = useWithdrawList({
    pageNumber,
    pageSize,
    searchQuery,
    ...(STATUS !== "ALL" && { status: STATUS }),
  });

  /* ================================
     MEMOIZED DATA ⭐
  ================================= */

  const listData = useMemo(() => {
    return data?.results ?? [];
  }, [data]);

  /* ================================
     RENDER ITEM ⭐
  ================================= */

  const renderItem = ({ item, index }: any) => {

    const statusColor =
      item.status === "SUCCESS"
        ? "#16a34a"
        : item.status === "FAILED"
        ? "#dc2626"
        : item.status === "PENDING"
        ? "#f59e0b"
        : "#6b7280";

    return (
      <View style={styles.card}>

        <View style={styles.cardHeader}>
          <Text style={styles.title}>
            {index + 1}. {item.user?.full_name || "N/A"}
          </Text>

          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.value}>{item.user?.mobile ?? "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>₹{item.amount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Txn ID</Text>
          <Text style={styles.value}>{item.transaction_id ?? "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>UTR</Text>
          <Text style={styles.value}>{item.utr || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Method</Text>
          <Text style={styles.value}>{item.method ?? "-"}</Text>
        </View>

        <Text style={styles.date}>
          {item.initiatedAt ?? ""}
        </Text>

      </View>
    );
  };

  /* ================================
     UI
  ================================= */

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        {type} Payout
      </Text>

      {/* PAYOUT BUTTON */}
      {type === "Initial" &&
        STATUS === "ALL" &&
        (user?.role === "PAYOUT_APP_USER" ||
          user?.role === "APP_USER") && (

        <View style={styles.payoutHeader}>
          <TouchableOpacity
            style={styles.payoutButton}
            onPress={() =>
              openModal?.({ isMpinVerify: true }, user)
            }
          >
            <Text style={styles.payoutButtonText}>
              Payout Request
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SEARCH */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search by name / mobile / txn id..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setPageNumber(1);
          }}
          style={styles.searchInput}
        />
      </View>

      {/* STATES */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#2563eb" />

      ) : isError ? (
        <Text style={styles.error}>
          Something went wrong
        </Text>

      ) : listData.length === 0 ? (
        <Text style={styles.noData}>
          No Withdrawals Found
        </Text>

      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item, index) =>
            item?.id ? `${item.id}-${index}` : `withdraw-${index}`
          }
          renderItem={renderItem}
          onRefresh={refetch}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* PAGINATION */}
      <View style={styles.pagination}>

        <TouchableOpacity
          disabled={pageNumber === 1}
          onPress={() => setPageNumber(p => Math.max(1, p - 1))}
        >
          <Text style={styles.pageButton}>
            Previous
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Page {data?.pagination?.pageNumber ?? 1} /
          {data?.pagination?.totalPages ?? 1}
        </Text>

        <TouchableOpacity
          disabled={!data?.pagination?.next}
          onPress={() => setPageNumber(p => p + 1)}
        >
          <Text style={styles.pageButton}>
            Next
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },

  searchWrapper: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
    elevation: 3,
  },

  searchInput: {
    height: 45,
    fontSize: 15,
    color: "#111827",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  label: {
    color: "#6b7280",
    fontSize: 13,
  },

  value: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "500",
  },

  amount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563eb",
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "right",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
  },

  pageButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "600",
    overflow: "hidden",
  },

  pageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  noData: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
    fontSize: 15,
  },

  error: {
    textAlign: "center",
    marginTop: 40,
    color: "#dc2626",
    fontSize: 15,
  },
  payoutHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
  backgroundColor: "transparent",
},

payoutButton: {
  backgroundColor: "#2563eb",
  paddingVertical: 12,
  paddingHorizontal: 18,
  borderRadius: 10,
  elevation: 3,
},

payoutButtonText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "600",
},
});