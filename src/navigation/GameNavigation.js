import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FractionGame from "../screens/FractionGame";
import GameHome from "../screens/GameHome";
import FinalScore from "../screens/FinalScore";
const Stack = createNativeStackNavigator();

export default function GameNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GameHome Screen"
        component={GameHome}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="Game Screen"
        component={FractionGame}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="Final Score Screen"
        component={FinalScore}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
