import { createSlice } from "@reduxjs/toolkit";

const GlobalSlices = createSlice({
  name: "global",
  initialState: {
    isError: false,
    messaage: "Error",
    isLoading: false,
    isData: [],
  },
  reducers: {
    globalAction: (state, action) => {
      switch (action.payload.type) {
        case "SET_ERROR":
          //   console.log(action.payload);
          return {
            ...state,
            isError: action.payload.value.isError,
            messaage: action.payload.value.messaage,
          };
        case "SET_LOADING":
          return {
            ...state,
            isLoading: action.payload.value,
          };
        case "SET_DATA":
          return {
            ...state,
            isData: action.payload.value,
          };
        default:
          return;
      }
    },
  },
});

export const { globalAction } = GlobalSlices.actions;
export default GlobalSlices.reducer;
