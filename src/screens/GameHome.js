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
  const [name, Setname] = useState("");
  const [TextValidation, SetTextValidation] = useState(false);
  const [Avatar, SetAvatar] = useState("");
  const navigation = useNavigation();

  const goToGame = () => {
    if (name === "" || Avatar === "") {
      SetTextValidation(true);
    } else {
      Setname("");
      SetAvatar("");
      SetTextValidation(false);
      navigation.navigate("Game Screen", { name: name, avatar: Avatar });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 80,
          backgroundColor: "red",
        }}
      >
        <TouchableOpacity
          style={{
            width: "25%",
            backgroundColor: "blue",
            alignItems: "center",
          }}
          onPress={() => SetAvatar("Men")}
          activeOpacity={1}
        >
          <Image
            source={require("../assets/images/Men.png")}
            style={[
              styles.avatarButton,
              Avatar === "Men" && styles.selectedAvatarButton,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            backgroundColor: "yellow",
            alignItems: "center",
          }}
          onPress={() => SetAvatar("Female")}
          activeOpacity={1}
        >
          <Image
            source={require("../assets/images/Female.png")}
            style={[
              styles.avatarButton,
              Avatar === "Female" && styles.selectedAvatarButton,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            backgroundColor: "green",
            alignItems: "center",
          }}
          onPress={() => SetAvatar("Punk")}
          activeOpacity={1}
        >
          <Image
            source={require("../assets/images/Punk.png")}
            style={[
              styles.avatarButton,
              Avatar === "Punk" && styles.selectedAvatarButton,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            backgroundColor: "pink",
            alignItems: "center",
          }}
          onPress={() => SetAvatar("Female2")}
          activeOpacity={1}
        >
          <Image
            source={require("../assets/images/Female2.png")}
            style={[
              styles.avatarButton,
              Avatar === "Female2" && styles.selectedAvatarButton,
            ]}
            resizeMode="contain"
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
          value={name}
        />
        <View style={{ alignItems: "flex-start" }}>
          {TextValidation ? (
            <Text
              style={{ textAlign: "left", color: "red", marginVertical: 10 }}
            >
              The name and avatar cannot be empty
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
