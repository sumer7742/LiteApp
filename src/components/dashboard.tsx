import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SimpleDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0D2B2F" barStyle="light-content" />

      {/* HEADER */}
    

      <ScrollView >
        {/* SUMMARY CARDS */}
        <View style={styles.cardContainer}>
          <DashboardCard title="Total Users" value="1,245" icon="users" />
          <DashboardCard title="Total Revenue" value="₹52,340" icon="credit-card" />
          <DashboardCard title="Transactions" value="389" icon="repeat" />
          <DashboardCard title="Pending Requests" value="24" icon="clock" />
            <DashboardCard title="Total Users" value="1,245" icon="users" />
          <DashboardCard title="Total Revenue" value="₹52,340" icon="credit-card" />
          <DashboardCard title="Transactions" value="389" icon="repeat" />
          <DashboardCard title="Pending Requests" value="24" icon="clock" />
        </View>

        {/* RECENT ACTIVITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <ActivityItem text="User Rahul completed KYC" />
          <ActivityItem text="New payout request received" />
          <ActivityItem text="Payment successful ₹2,000" />
          <ActivityItem text="Password changed successfully" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔹 Dashboard Card Component */
const DashboardCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) => (
  <View style={styles.card}>
    <Icon name={icon} size={22} color="#0D2B2F" />
    <Text style={styles.cardValue}>{value}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

/* 🔹 Activity Item */
const ActivityItem = ({ text }: { text: string }) => (
  <View style={styles.activityItem}>
    <Icon name="check-circle" size={18} color="#0D2B2F" />
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    backgroundColor: "#0D2B2F",
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  cardTitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
  },
});