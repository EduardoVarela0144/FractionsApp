import React from "react";
import { Text, View, Image } from "react-native";
import Men from "../../assets/images/Men.png";
import Punk from "../../assets/images/Punk.png";
import Female from "../../assets/images/Female.png";
import Female2 from "../../assets/images/Female2.png";

export default function ScoreData({ id, points, name, avatar }) {
  const imageMap = {
    Men: Men,
    Punk: Punk,
    Female: Female,
    Female2: Female2,
  };
  const selectedImage = imageMap[avatar] || Men;

  var bar_styles = {
    backgroundColor: "#1BABFF",
    width: `${points}%`,
    height: 10,
    borderRadius: 10,
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image source={selectedImage} style={{ width: 50, height: 50 }} />
        <Text> {name} </Text>
      </View>
      <View
        style={{
          backgroundColor: "#dedede",
          width: "50%",
          height: 10,
          borderRadius: 10,
        }}
      >
        <View style={bar_styles} />
      </View>
    </View>
  );
}
