import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import FractionCalculator from "../screens/FractionCalculator";
import GameNavigation from "./GameNavigation";
import { styles } from "../assets/styles";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName="Calculator">
      <Tab.Screen
        name="Game"
        component={GameNavigation}
        options={{
          title: "Game",
          tabBarIcon: ({ size }) => (
            <Icon name="rocket" color="#1BABFF" size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={FractionCalculator}
        options={{
          title: "Calculator",
          tabBarIcon: ({ size }) => (
            <Icon name="calculator" color="#1BABFF" size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Scores"
        component={FractionCalculator}
        options={{
          title: "Scores",
          tabBarIcon: ({ size }) => (
            <Icon name="user" color="#1BABFF" size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
