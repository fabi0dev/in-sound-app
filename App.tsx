import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme as DefaultTheme, theme } from "@themes/default";
import Navigator from "./src/navigator";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [loadedFonts] = useFonts({
    NunitoSansRegular: require("./src/assets/fonts/NunitoSans_7pt-Regular.ttf"),
    NunitoSansBold: require("./src/assets/fonts/NunitoSans_7pt-SemiBold.ttf"),
  });

  if (!loadedFonts) {
    return null;
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={theme.colors.base} style="light" />
          <Navigator defaultNavigator={"Home"} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
