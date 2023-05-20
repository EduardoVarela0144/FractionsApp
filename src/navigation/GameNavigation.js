import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FractionCard from "../screens/FractionCard";
const Stack = createNativeStackNavigator();

export default function GameNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GameHome Screen"
        component={FractionCard}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="Game Screen"
        component={FractionCard}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
