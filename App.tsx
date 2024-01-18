import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme, theme } from "@themes/default";
import Navigator from "./src/navigator";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    NunitoSansRegular: require("./src/assets/fonts/NunitoSans_7pt-Regular.ttf"),
    NunitoSansBold: require("./src/assets/fonts/NunitoSans_7pt-SemiBold.ttf"),
  });

  return (
    <ThemeProvider theme={DefaultTheme}>
      <StatusBar backgroundColor={theme.colors.base} style="light" />
      <Navigator defaultNavigator={"Home"} />
    </ThemeProvider>
  );
}
