import React from "react";
import { Text, View } from "react-native";
import { styles } from "../assets/styles";

export default function FinalScore(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const score = {
    color:
      params.score <= 50
        ? "red"
        : params.score > 50 && params.score <= 70
        ? "yellow"
        : "red",
    fontSize: 50,
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}> Your Score </Text>
      <Text style={score}> {params.score} / 100 </Text>
    </View>
  );
}
