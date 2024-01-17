import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { default as HomeNavigator } from "./HomeNavigator";

const Stack = createStackNavigator();

interface NavigatorProp {
  defaultNavigator: string;
}

const Navigator = ({ defaultNavigator }: NavigatorProp) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          //@ts-ignore
          headerMode: false,
        }}
        initialRouteName="Home"
      >
        {defaultNavigator == "Home" &&
          Object.entries(HomeNavigator).map(([nameScreen, Component]) => {
            return (
              <Stack.Screen
                key={nameScreen}
                name={nameScreen}
                component={Component}
              />
            );
          })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
