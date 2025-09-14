import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newNotificationsCount: 0,
  allRoles: [],
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    saveNewNotification(state, action) {
      state.newNotificationsCount = action.payload;
    },
    saveRoles(state, action) {
      state.allRoles = action.payload;
    },
  },
});

export const { saveNewNotification, saveRoles } = commonSlice.actions;

export default commonSlice.reducer;
