import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "./src/assets/styles";
import Home from "./src/screens/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Home />
    </View>
  );
}
