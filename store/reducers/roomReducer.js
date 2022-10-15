import ROOMS from "../../data/rooms";
import { ADD_ROOM, DELETE_ROOM, EDIT_ROOM } from "../actions/roomActions";
const initialState = {
   rooms: ROOMS,
};

const roomReducer = (state = initialState, action) => {
   switch (action.type) {
      //   case READ_RECEIPTS:
      //      return {
      //         ...state,
      //         rooms: action.rooms,
      //      };

      case ADD_ROOM:
         return {
            ...state,
            rooms: state.rooms.concat(action.newRoom),
         };

      case EDIT_ROOM:
         var { id, name, roomWorks, changed } = action;
         var oldRooms = [...state.rooms];
         var roomIndex = oldRooms.findIndex((elem) => (elem.id = id));

         var newRoom = oldRooms[roomIndex];
         newRoom.name = name;
         if (changed) {
            newRoom.roomWorks = roomWorks.map((el) => ({
               id: Math.floor(Math.random() * 10000),
               name: el,
               slug: el,
            }));
         }
         oldRooms[roomIndex] = newRoom;
         return {
            ...state,
            rooms: oldRooms,
         };
      case DELETE_ROOM:
         console.log("here");
         return {
            ...state,
            rooms: state.rooms.filter((obj) => obj.id != action.id),
         };
   }
   return state;
};

export default roomReducer;
