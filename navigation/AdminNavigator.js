import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Colors from "../constants/Colors";
import WorkList from "../screens/director/work/WorkList";

import RoomList from "../screens/director/room/RoomList";
import { screenOptions as roomListScreenOptions } from "../screens/director/room/RoomList";
import CreateRoom from "../screens/director/room/CreateRoom";
import EditRoom from "../screens/director/room/EditRoom";

import WorkersList from "../screens/director/workers/WorkersList";

import Profile from "../screens/account/Profile";

import Icon, { Icons } from "../components/inner/Icon";

const defaultNavOptions = {
   headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.header : "",
   },
   headerTitleStyle: {
      fontFamily: "open-sans-bold",
   },
   headerBackTitleStyle: {
      fontFamily: "open-sans",
   },
   headerTintColor: Platform.OS === "android" ? "white" : Colors.primary``,
};

const WorkStackNavigator = createStackNavigator();

export const WorkNavigator = () => {
   return (
      <WorkStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <WorkStackNavigator.Screen
            name="WorkList"
            component={WorkList}
            // options={receiptsScreenOptions}
         />
         {/* <WorkStackNavigator.Screen
            name="ReceiptDetails"
            component={ReceiptDetails}
            options={receiptDetailsScreenOptions}
         />
         <WorkStackNavigator.Screen
            name="CreateReceipt"
            component={CreateReceipt}
            // options={receiptDetailsScreenOptions}
         />
         <WorkStackNavigator.Screen
            name="EditReceipt"
            component={EditReceipt}
            // options={receiptDetailsScreenOptions}
         /> */}
      </WorkStackNavigator.Navigator>
   );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
   return (
      <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <ProfileStackNavigator.Screen
            name="Profile"
            component={Profile}
            // options={receiptsScreenOptions}
         />
         {/* <ProfileStackNavigator.Screen
            name="ReceiptDetails"
            component={ReceiptDetails}
            options={receiptDetailsScreenOptions}
         />
         <ProfileStackNavigator.Screen
            name="CreateReceipt"
            component={CreateReceipt}
            // options={receiptDetailsScreenOptions}
         />
         <ProfileStackNavigator.Screen
            name="EditReceipt"
            component={EditReceipt}
            // options={receiptDetailsScreenOptions}
         /> */}
      </ProfileStackNavigator.Navigator>
   );
};

const WorkersStackNavigator = createStackNavigator();

export const WorkerNavigator = () => {
   return (
      <WorkersStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <WorkersStackNavigator.Screen
            name="WorkersList"
            component={WorkersList}
            // options={receiptsScreenOptions}
         />
         {/* <WorkersStackNavigator.Screen
            name="ReceiptDetails"
            component={ReceiptDetails}
            options={receiptDetailsScreenOptions}
         />
         <WorkersStackNavigator.Screen
            name="CreateReceipt"
            component={CreateReceipt}
            // options={receiptDetailsScreenOptions}
         />
         <WorkersStackNavigator.Screen
            name="EditReceipt"
            component={EditReceipt}
            // options={receiptDetailsScreenOptions}
         /> */}
      </WorkersStackNavigator.Navigator>
   );
};

const RoomStackNavigator = createStackNavigator();

export const RoomNavigator = () => {
   return (
      <RoomStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <RoomStackNavigator.Screen
            name="RoomList"
            component={RoomList}
            options={roomListScreenOptions}
         />
         <WorkStackNavigator.Screen
            name="CreateRoom"
            component={CreateRoom}
            // options={receiptDetailsScreenOptions}
         />
         <WorkStackNavigator.Screen
            name="EditRoom"
            component={EditRoom}
            // options={receiptDetailsScreenOptions}
         />
         {/* <WorkStackNavigator.Screen
            name="EditReceipt"
            component={EditReceipt}
            // options={receiptDetailsScreenOptions}
         /> */}
      </RoomStackNavigator.Navigator>
   );
};

const Tab = createMaterialBottomTabNavigator();

export const BaseFullNavigator = () => {
   const [iconsColor, setIconsColors] = useState([
      Colors.headerBold,
      "grey",
      "grey",
      "grey",
   ]);

   const handleActiveIconColor = (number) => {
      var allColors = ["grey", "grey", "grey", "grey"];
      allColors[number - 1] = Colors.headerDark;
      setIconsColors(allColors);
   };

   return (
      <Tab.Navigator
         activeColor={Colors.headerBold}
         barStyle={{
            backgroundColor: Colors.primary,
            color: "black",
         }}
      >
         <Tab.Screen
            name="WorkNavigator"
            component={WorkNavigator}
            listeners={{
               tabPress: (e) => {
                  // Prevent default action
                  // e.preventDefault();

                  //Any custom code here
                  handleActiveIconColor(1);
               },
            }}
            options={{
               tabBarLabelPosition: "beside-icon",

               tabBarLabel: "Work",
               tabBarIcon: () => (
                  <Icon
                     name="receipt"
                     type={Icons.Ionicons}
                     size={20}
                     color={iconsColor[0]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="RoomNavigator"
            component={RoomNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(2);
               },
            }}
            options={{
               tabBarLabel: "Rooms",
               tabBarStyle: { display: "none" },
               tabBarIcon: () => (
                  <Icon
                     name="google-classroom"
                     type={Icons.MaterialCommunityIcons}
                     size={20}
                     color={iconsColor[1]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="WorkerNavigator"
            component={WorkerNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(3);
               },
            }}
            options={{
               tabBarLabel: "Workers",
               tabBarStyle: { display: "none" },
               tabBarIcon: () => (
                  <Icon
                     name="people"
                     type={Icons.Ionicons}
                     size={20}
                     color={iconsColor[2]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="ProfileNavigator"
            component={ProfileNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(4);
               },
            }}
            options={{
               headerShown: true,
               tabBarLabel: "Account",
               tabBarIcon: () => (
                  <Icon
                     name="user"
                     type={Icons.FontAwesome}
                     size={20}
                     color={iconsColor[3]}
                  />
               ),
            }}
         />
      </Tab.Navigator>
   );
};
