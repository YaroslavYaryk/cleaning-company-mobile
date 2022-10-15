import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   KeyboardAvoidingView,
   Alert,
   ScrollView,
   Dimensions,
   TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import Input from "../../../components/UI/Input";
import { AntDesign } from "@expo/vector-icons";
import * as roomActions from "../../../store/actions/roomActions";

const { width } = Dimensions.get("window");

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
   if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
         ...state.inputValues,
         [action.input]: action.value,
      };
      const updatedValidities = {
         ...state.inputValidities,
         [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
         updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
         formIsValid: updatedFormIsValid,
         inputValidities: updatedValidities,
         inputValues: updatedValues,
      };
   }
   return state;
};

const EditRoom = (props) => {
   const dispatch = useDispatch();

   const { roomId } = props.route.params;
   const room = useSelector((state) =>
      state.rooms.rooms.find((el) => (el.id = roomId))
   );

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [workNames, setWorkNames] = useState(
      room.roomWorks.map((el) => ({ index: el.id, value: el.name }))
   );
   const [isChanged, setIsChanged] = useState(false);

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         name: room.name ? room.name : "",
      },
      inputValidities: {
         name: room.name ? true : false,
      },
      formIsValid: room.name ? true : false,
   });

   console.log(formState.inputValues);

   const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
         dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
         });
      },
      [dispatchFormState]
   );

   const addRoomWorkInput = (index) => {
      if (!isChanged) {
         setIsChanged(true);
      }
      setWorkNames([...workNames, { index: index, value: "" }]);
   };

   const removeRoomWorkInput = (index) => {
      if (!isChanged) {
         setIsChanged(true);
      }
      setWorkNames(workNames.filter((el) => el.index !== index));
   };

   const handleCreateRoom = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         var validRoomNames = workNames.map((el) => el.value);
         var nonEmptyRoomNames = validRoomNames.filter((el) => el != "");
         await dispatch(
            roomActions.editRoom(
               roomId,
               formState.inputValues.name,
               nonEmptyRoomNames,
               isChanged
            )
         );
      } catch (error) {
         setError(error.message);
         setIsLoading(false);
         return;
      }
      setIsLoading(false);
      props.navigation.navigate("RoomList");
   }, [useDispatch, formState, workNames, isChanged]);

   const handleChangeWorkNames = (index, val) => {
      console.log("change");
      const oldNames = [...workNames];
      var arrIndex = oldNames.findIndex((el) => el.index == index);
      // console.log(oldNames, arrIndex);
      var oldName = oldNames[arrIndex];
      oldName.value = val;
      oldNames[arrIndex] = oldName;
      setWorkNames(oldNames);
      if (!isChanged) {
         setIsChanged(true);
      }
   };

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
      <View style={{ flex: 1, backgroundColor: Colors.backGround }}>
         <ScrollView>
            <View style={styles.form}>
               <Input
                  id="name"
                  label="Room name"
                  errorText="Please enter a valid name!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={room.name ? room.name : ""}
                  initiallyValid={false}
                  required
               />
            </View>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
               <View style={{ width: width - (width / 100) * 10 }}>
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
                  >
                     <View>
                        <Text style={{ fontWeight: "500", fontSize: 17 }}>
                           Room works
                        </Text>
                     </View>
                     <View>
                        <AntDesign
                           name="pluscircleo"
                           size={24}
                           color={Colors.greenLight}
                           onPress={() => {
                              addRoomWorkInput(
                                 Math.floor(Math.random() * 10000)
                              );
                           }}
                        />
                     </View>
                  </View>
               </View>
            </View>
            {workNames.map((workName, index) => (
               <View
                  key={index}
                  style={[styles.formInner, { borderBottomWidth: 1 }]}
               >
                  <TextInput
                     id={`input_${workName.index}`}
                     // label="Work name"
                     errorText="Please enter a valid name!"
                     keyboardType="default"
                     autoCapitalize="sentences"
                     autoCorrect
                     returnKeyType="next"
                     onChangeText={(val) => {
                        handleChangeWorkNames(workName.index, val);
                        console.log("text change");
                     }}
                     value={
                        workNames.find((el) => el.index == workName.index).value
                     }
                     initialValue={workName.value}
                     initiallyValid={false}
                     placeholder={"Room work"}
                     required
                  />
                  <View style={{ position: "absolute", right: 0, top: 0 }}>
                     <View>
                        <AntDesign
                           name="delete"
                           size={24}
                           color="red"
                           onPress={() => removeRoomWorkInput(workName.index)}
                        />
                     </View>
                  </View>
               </View>
            ))}
            <View style={styles.saveButtonBlock}>
               <View
                  style={[
                     styles.saveButtonBlockInner,
                     {
                        backgroundColor: formState.formIsValid
                           ? Colors.header
                           : "grey",
                     },
                  ]}
               >
                  <TouchableOpacity
                     disabled={formState.formIsValid ? false : true}
                     onPress={handleCreateRoom}
                     activeOpacity={0}
                  >
                     <View
                        style={{
                           width: width * 0.9,
                           alignItems: "center",
                           //    height: "100%",
                        }}
                     >
                        <Text style={styles.saveButtonBlockText}>Save</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   form: {
      margin: 20,
   },
   formInner: {
      marginHorizontal: 20,
      marginBottom: 20,
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   saveButtonBlock: {
      alignItems: "center",
      marginTop: 20,
   },
   saveButtonBlockInner: {
      alignItems: "center",

      width: "90%",
      borderWidth: 1,
      borderColor: Colors.primary,
      padding: 10,
      borderRadius: 10,
   },
   saveButtonBlockText: {
      fontSize: 18,
      color: Colors.headerBold,
      fontWeight: "600",
   },
});

export default EditRoom;
