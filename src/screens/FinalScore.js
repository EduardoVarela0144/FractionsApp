import React from "react";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { styles } from "../assets/styles";
import Men from "../assets/images/Men.png";
import Punk from "../assets/images/Punk.png";
import Female from "../assets/images/Female.png";
import Female2 from "../assets/images/Female2.png";
const imageMap = {
  Men: Men,
  Punk: Punk,
  Female: Female,
  Female2: Female2,
};

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
    marginTop: 20,
  };

  const selectedImage = imageMap[params.avatar] || Men;

  const goToHome = () => {
    navigation.navigate("GameHome Screen");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.bg} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Image
          source={selectedImage}
          style={{ width: "60%", aspectRatio: 1, height: "60%" }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontWeight: "bold",
            marginVertical: "3%",
          }}
        >
          {params.name}{" "}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25 }}> Your Score </Text>
        <Text style={score}> {params.score} / 100 </Text>
      </View>
      <View
        style={{
          backgroundColor: "#ADE1FF",
          width: "40%",
          borderRadius: 10,
          marginTop: "5%",
        }}
      >
        <TouchableOpacity onPress={goToHome} style={{ paddingVertical: "3%" }}>
          <Text style={{ fontSize: 30, color: "#109DFF", textAlign: "center" }}>
            Finish
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
