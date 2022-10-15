import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WorkNavigator } from "./navigation/AdminNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";
import { BaseFullNavigator } from "./navigation/AdminNavigator";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware } from "redux";
import roomReducer from "./store/reducers/roomReducer";

const rootReducer = combineReducers({
   rooms: roomReducer,
});

const store = configureStore(
   {
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
         }),
   },
   applyMiddleware(ReduxThunk)
);

const fontsFetch = () => {
   return Font.loadAsync({
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
   });
};

export default function App() {
   const [dataLoaded, setDataLoaded] = useState(false);

   if (!dataLoaded) {
      return (
         <AppLoading
            startAsync={fontsFetch}
            onFinish={() => {
               setDataLoaded(true);
            }}
            onError={console.warn}
         />
      );
   }

   LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
   LogBox.ignoreAllLogs(); //Ignore all log notifications

   return (
      <NavigationContainer>
         <Provider store={store}>
            <BaseFullNavigator />
         </Provider>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
