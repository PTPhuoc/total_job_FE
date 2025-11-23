import { createSlice } from "@reduxjs/toolkit";

const webSlice = createSlice({
  name: "web",
  initialState: {
    load: true,
    localLoad: false,
    stateCrawl: false,
  },
  reducers: {
    setWeb(state, action) {
      return { ...state, ...action.payload };
    },
    setDefaultWeb() {
      return { load: true, localLoad: false, stateCrawl: false };
    },
    setAllNotLoad() {
      return { load: false, localLoad: false, stateCrawl: false };
    },
  },
});

export const { setWeb } = webSlice.actions;
export default webSlice.reducer;
