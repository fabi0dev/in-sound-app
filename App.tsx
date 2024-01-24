import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme, theme } from "@themes/default";
import Navigator from "./src/navigator";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  const [loadedFonts] = useFonts({
    NunitoSansRegular: require("./src/assets/fonts/NunitoSans_7pt-Regular.ttf"),
    NunitoSansBold: require("./src/assets/fonts/NunitoSans_7pt-SemiBold.ttf"),
  });
  if (loadedFonts !== true) {
    return null;
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Provider store={store}>
        <StatusBar backgroundColor={theme.colors.base} style="light" />
        <Navigator defaultNavigator={"Home"} />
      </Provider>
    </ThemeProvider>
  );
}
