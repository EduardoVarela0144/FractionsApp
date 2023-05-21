import React, { useState } from "react";
import { Text, View, TextInput, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../assets/styles";

export default function GameHome() {
  const [name, Setname] = useState("Useless Text");
  const navigation = useNavigation();
  const goToGame = () => {
    navigation.navigate("Game Screen", { name: name });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/images/Men.png")}
          style={{
            width: 100,
            height: 100,
            marginBottom: 30,
            marginHorizontal: 10,
          }}
        />
        <Image
          source={require("../assets/images/Female.png")}
          style={{
            width: 100,
            height: 100,
            marginBottom: 30,
            marginHorizontal: 10,
          }}
        />
        <Image
          source={require("../assets/images/Punk.png")}
          style={{
            width: 100,
            height: 100,
            marginBottom: 30,
            marginHorizontal: 10,
          }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#343838" }}>
          Enter your name ...{" "}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          onChangeText={Setname}
          placeholder="Eduardo Varela"
        />
        <View
          style={{
            backgroundColor: "#ADE1FF",
            width: 150,
            borderRadius: 10,
          }}
        >
          <Button onPress={goToGame} color={"#109DFF"} title="Start" />
        </View>
      </View>
    </View>
  );
}
