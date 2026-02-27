import { StyleSheet, Text, View } from "react-native";

 function Payout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 🎉</Text>
      <Text style={styles.subtitle}>Payout.</Text>
    </View>
  );
}
export default Payout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
});