import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  c_fractions: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 60,
    width: "100%",
    padding: 10,
  },
  text: { color: "white" },
  input: {
    borderRadius: 15,
    width: "100%",
    height: 90,
    marginTop: 15,
    color: "white",
    fontSize: 50,
    textAlign: "right",
    writingDirection: "rtl",
  },
  c_button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#035FE5",
    borderRadius: 10,
  },
});
