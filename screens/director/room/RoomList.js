import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import RoomItem from "../../../components/items/RoomItem";
import CustomHeaderButton from "../../../components/UI/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";
import * as roomActions from "../../../store/actions/roomActions";

const RoomList = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   var rooms = useSelector((state) => state.rooms.rooms);

   const dispatch = useDispatch();

   const handleDeleteRoom = useCallback(
      async (id) => {
         setError(null);
         setIsLoading(true);
         try {
            await dispatch(roomActions.deleteRoom(id));
         } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsLoading(false);
            return;
         }
         setIsLoading(false);
         // props.navigation.navigate("RoomList");
      },
      [useDispatch]
   );

   useEffect(() => {
      if (error) {
         Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
      }
   }, [error]);

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.headerBold} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <FlatList
            // onScroll={scrollHandler}
            // ref={ref}
            data={rooms}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
               <View style={{ marginBottom: 20 }}>
                  <RoomItem
                     item={itemData.item}
                     handleEdit={() => {
                        props.navigation.navigate("EditRoom", {
                           roomId: itemData.item.id,
                        });
                     }}
                     handleDelete={() => {
                        handleDeleteRoom(itemData.item.id);
                     }}
                  ></RoomItem>
               </View>
            )}
         />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Rooms",
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Add"
               color="red"
               icon={MaterialIcons}
               iconName={Platform.OS === "android" ? "create" : "ios-create"}
               onPress={() => {
                  navData.navigation.navigate("CreateRoom");
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.backGround,
      paddingTop: 15,
      zIndex: 10,
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.backGround,
   },
   buttonSwipe: {
      fontSize: 18,
      fontWeight: "500",
   },
});

export default RoomList;
