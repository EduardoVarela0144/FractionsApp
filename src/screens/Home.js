import React from "react";
import { Text, View, TextInput, Button, Keyboard } from "react-native";
import { styles } from "../assets/styles";

export default function Home() {
  const handleFinish = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={styles.c_fractions}>
      <Text style={styles.text}>Ingresa la cantidad de fracciones</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        defaultValue="0"
        autoCorrect={false}
      />
      <View style={styles.c_button}>
        <View style={styles.button}>
          <Button
            title="Generar fracciones"
            color="white"
            onPress={handleFinish}
          />
        </View>
      </View>
    </View>
  );
}
