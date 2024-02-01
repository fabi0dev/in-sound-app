import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { default as HomeNavigator } from "./HomeNavigator";

import { LogBox } from "react-native";

const Stack = createStackNavigator();

const Navigator = () => {
  LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          //@ts-ignore
          headerMode: false,
        }}
        initialRouteName="Home"
      >
        {Object.entries(HomeNavigator).map(([nameScreen, Component]) => {
          return (
            <Stack.Screen
              key={nameScreen}
              name={nameScreen}
              component={Component as never}
              options={{ title: nameScreen }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
