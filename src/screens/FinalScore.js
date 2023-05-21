import React from "react";
import { Text, View, Image, Button } from "react-native";
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
    fontSize: 100,
    marginTop: 30,
  };

  const selectedImage = imageMap[params.avatar] || Men;

  const goToHome = () => {
    navigation.navigate("Game Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.bg} />
      <View
        style={{
          alignItems: "center",
          marginTop: 100,
          justifyContent: "center",
        }}
      >
        <Image
          source={selectedImage}
          style={{
            width: 300,
            height: 300,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          {params.name}{" "}
        </Text>
      </View>
      <View style={{ marginTop: 70, alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}> Your Score </Text>
        <Text style={score}> {params.score} / 100 </Text>
      </View>
      <View
        style={{
          backgroundColor: "#ADE1FF",
          width: 150,
          borderRadius: 10,
          marginTop: 30,
        }}
      >
        <Button onPress={goToHome} color={"#109DFF"} title="Finish" />
      </View>
    </View>
  );
}
