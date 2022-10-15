import Room from "../models/Room";

const ROOMS = [
   new Room(1, "bathroom", "bathroom", [
      {
         id: 2,
         name: "refill toilet papper",
         slug: "refill-toilet-papper",
      },
   ]),
   new Room(2, "kitchen", "kitchen", [
      {
         id: 3,
         name: "wash dishes",
         slug: "wash-dishes",
      },
   ]),
   new Room(3, "badroom", "badroom", [
      {
         id: 8,
         name: "change pillows",
         slug: "change-pillows",
      },
      {
         id: 10,
         name: "do smth else",
         slug: "do-smth-else",
      },
   ]),
   new Room(4, "working room changed", "working-room-changed", []),
];

export default ROOMS;
