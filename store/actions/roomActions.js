import { HOST, PORT } from "../../constants/server";
import Room from "../../models/Room";
export const READ_ROOMS = "READ_ROOMS";
export const ADD_ROOM = "ADD_ROOM";
export const EDIT_ROOM = "EDIT_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";

// export const fetchProjects = () => {
//    try {
//       return async (dispatch, getState) => {
//          var token = getState().auth.token;

//          const response = await fetch(`${HOST}:${PORT}/api/projects/`, {
//             method: "GET",
//             headers: {
//                "Content-Type": "multipart/form-data",
//                "Access-Control-Allow-Origin": "*",
//                Authorization: `Token ${token}`,
//             },
//          });

//          if (!response.ok) {
//             throw new Error("Something went wrong!");
//          }

//          const resData = await response.json();

//          dispatch({
//             type: READ_PRODUCTS,
//             projects: resData,
//          });
//       };
//    } catch (err) {
//       throw err;
//    }
// };

export const createRoom = (name, roomWorks) => {
   return async (dispatch, getState) => {
      //   var token = getState().auth.token;
      //   const response = await fetch(`${HOST}:${PORT}/api/project/create/`, {
      //      method: "POST",
      //      headers: {
      //         "Content-Type": "application/json",
      //         "Access-Control-Allow-Origin": "*",
      //         Authorization: `Token ${token}`,
      //      },
      //      body: JSON.stringify({
      //         name: name,
      //      }),
      //   });

      //   if (!response.ok) {
      //      const errorResData = await response.json();
      //      throw new Error(errorResData.message);
      //      // work here
      //   }

      //   const resData = await response.json();
      const newRoom = new Room(
         Math.random(),
         name,
         name,
         roomWorks.map((el) => ({ id: Math.random(), name: el, slug: el }))
      );

      dispatch({
         type: ADD_ROOM,
         newRoom: newRoom,
      });
   };
};

export const editRoom = (id, name, roomWorks, changed) => {
   return async (dispatch, getState) => {
      // var token = getState().auth.token;
      // const response = await fetch(
      //    `${HOST}:${PORT}/api/project/${id}/update/`,
      //    {
      //       method: "PUT",
      //       headers: {
      //          "Content-Type": "application/json",
      //          "Access-Control-Allow-Origin": "*",
      //          Authorization: `Token ${token}`,
      //       },
      //       body: JSON.stringify({
      //          name: name,
      //       }),
      //    }
      // );

      // if (!response.ok) {
      //    const errorResData = await response.json();
      //    throw new Error(errorResData.message);
      //    // work here
      // }
      dispatch({
         type: EDIT_ROOM,
         id: id,
         name: name,
         roomWorks: roomWorks,
         changed: changed,
      });
   };
};

export const deleteRoom = (id) => {
   return async (dispatch, getState) => {
      //   var token = getState().auth.token;
      //   const response = await fetch(
      //      `${HOST}:${PORT}/api/project/${id}/delete/`,
      //      {
      //         method: "DELETE",
      //         headers: {
      //            "Content-Type": "application/json",
      //            "Access-Control-Allow-Origin": "*",
      //            Authorization: `Token ${token}`,
      //         },
      //      }
      //   );

      //   if (!response.ok) {
      //      const errorResData = await response.json();
      //      throw new Error(errorResData.message);
      //      // work here
      //   }
      console.log("here");
      dispatch({
         type: DELETE_ROOM,
         id: id,
      });
   };
};

// export const fetchProjectReports = (project) => {
//    try {
//       return async (dispatch, getState) => {
//          var token = getState().auth.token;

//          const response = await fetch(
//             `${HOST}:${PORT}/api/project_reports/${project}/all/`,
//             {
//                method: "GET",
//                headers: {
//                   Authorization: `Token ${token}`,
//                },
//             }
//          );

//          if (!response.ok) {
//             throw new Error("Something went wrong!");
//          }

//          const resData = await response.json();
//          const loadedReports = [];
//          for (const key in resData) {
//             loadedReports.push(
//                new ProjectReport(
//                   resData[key].id,
//                   resData[key].project,
//                   resData[key].file_document,
//                   resData[key].date
//                )
//             );
//          }

//          dispatch({
//             type: READ_PRODUCT_REPORTS,
//             reports: loadedReports,
//          });
//       };
//    } catch (err) {
//       throw err;
//    }
// };
