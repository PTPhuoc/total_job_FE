import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
  name: "windowWarning",
  initialState: {
    for: "",
    title: "",
    content: "",
    handle: "pending",
    type: "N",
    isOpen: false,
    value: "",
  },
  reducers: {
    setWindowWarning(state, action) {
      return { ...state, ...action.payload };
    },
    setDefaultWindowWarning() {
      return {
        for: "",
        title: "",
        content: "",
        handle: "pending",
        type: "N",
        isOpen: false,
        value: "",
      };
    },
  },
});

export const { setWindowWarning, setDefaultWindowWarning } = windowSlice.actions;
export default windowSlice.reducer;
