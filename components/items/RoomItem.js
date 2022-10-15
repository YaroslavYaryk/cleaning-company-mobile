import React, { useEffect, useState, useCallback, useRef } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   Dimensions,
   TouchableOpacity,
   LayoutAnimation,
   Animated,
} from "react-native";
import Colors from "../../constants/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { toggleAnimation } from "../../constants/animation";
import { AntDesign } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RoomItem = (props) => {
   const { item, isFocused, roomWorks } = props;
   const [showContent, setShowContent] = useState(false);

   const leftSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
         inputRange: [0, 100],
         outputRange: [0, 1],
         extrapolate: "clamp",
      });
      return (
         <TouchableOpacity onPress={props.handleEdit} activeOpacity={0.6}>
            <View style={styles.editBox}>
               <Animated.Text
                  style={{ transform: [{ scale: scale }], fontSize: 20 }}
               >
                  Edit
               </Animated.Text>
            </View>
         </TouchableOpacity>
      );
   };

   const rightSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
         inputRange: [-100, 100],
         outputRange: [1, -1],
         extrapolate: "clamp",
      });
      return (
         <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
            <View style={styles.deleteBox}>
               <Animated.Text
                  style={{ transform: [{ scale: scale }], fontSize: 20 }}
               >
                  Delete
               </Animated.Text>
            </View>
         </TouchableOpacity>
      );
   };

   const animationController = useRef(new Animated.Value(0)).current;

   const toggleListItem = () => {
      const config = {
         duration: 300,
         toValue: showContent ? 0 : 1,
         useNativeDriver: true,
      };
      Animated.timing(animationController, config).start();
      LayoutAnimation.configureNext(toggleAnimation);
      setShowContent(!showContent);
   };

   return (
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
         <View style={styles.container}>
            <View style={styles.wrapperInner}>
               <Text style={styles.nameText}>{item.name}</Text>
            </View>
            <View style={styles.buttonBlock}>
               <View style={styles.buttonBlockInner}>
                  <TouchableOpacity onPress={toggleListItem}>
                     <Text style={styles.buttonBlockText}>Components</Text>
                  </TouchableOpacity>
               </View>
            </View>
            <Animated.View
               style={{
                  transform: [{ translateY: animationController }],
               }}
            >
               {showContent && (
                  <View style={{ overflow: "hidden" }}>
                     {item.roomWorks.map((el) => (
                        <View key={el.id} style={{ marginBottom: 5 }}>
                           <View
                              style={{
                                 flexDirection: "row",
                                 alignItems: "center",
                              }}
                           >
                              <View>
                                 <AntDesign
                                    name="staro"
                                    size={20}
                                    color={Colors.greenLight}
                                 />
                              </View>
                              <View style={{ marginLeft: 5 }}>
                                 <Text>{el.name}</Text>
                              </View>
                           </View>
                        </View>
                     ))}
                     {/* <ScrollView>
                        {a.map((el) => (
                           <View key={el.name}>
                              <Text>{el.name}</Text>
                           </View>
                        ))}
                     </ScrollView> */}
                  </View>
               )}
            </Animated.View>
         </View>
      </Swipeable>
   );
};

const styles = StyleSheet.create({
   wrapperInner: { marginBottom: 30 },
   product: {
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "white",
      width: "100%",
      marginBottom: 20,
      padding: 20,
   },
   buttonBlock: {
      alignItems: "flex-end",
      borderRadius: 5,
   },
   buttonBlockInner: {
      borderWidth: 1,
      backgroundColor: Colors.greenLight,
      borderColor: Colors.headerBold,
      padding: 5,
      borderRadius: 5,
   },
   container: {
      // height: 80,
      width: SCREEN_WIDTH,
      backgroundColor: "white",
      justifyContent: "center",
      padding: 16,
      borderRadius: 10,
   },
   editBox: {
      backgroundColor: "#7895B2",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: "100%",
      marginBottom: 20,
      borderRadius: 10,
   },
   deleteBox: {
      backgroundColor: "#F05454",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: "100%",
      marginBottom: 20,
      borderRadius: 10,
   },
   nameText: {
      fontSize: 18,
   },
   buttonBlockText: {
      color: "white",
   },
});

export default RoomItem;
