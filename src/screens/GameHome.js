import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../assets/styles";

export default function GameHome() {
  const [name, Setname] = useState("Useless Text");
  const [TextValidation, SetTextValidation] = useState(false);
  const navigation = useNavigation();
  const goToGame = () => {
    name === "Useless Text"
      ? SetTextValidation(true)
      : navigation.navigate("Game Screen", { name: name });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Men.png")}
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginHorizontal: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Female.png")}
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginHorizontal: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Punk.png")}
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginHorizontal: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Female2.png")}
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginHorizontal: 10,
            }}
          />
        </TouchableOpacity>
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
        <View style={{ alignItems: "flex-start" }}>
          {TextValidation ? (
            <Text
              style={{ textAlign: "left", color: "red", marginVertical: 10 }}
            >
              The name cannot be empty
            </Text>
          ) : null}
        </View>
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
