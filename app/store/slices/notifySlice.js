import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkNotify = createAsyncThunk("notify/check", async () => {
  try {
    const rs = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/notify/check/`,
      { withCredentials: true }
    );
    if (rs.data.status === "Success") 
      return rs.data.notifyAvailable ?? 0;

    return 0;
  } catch (err) {
    console.log(err);
    return 0;
  }
});

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    available: 0,
  },
  reducers: {
    setStateNofity(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkNotify.fulfilled, (state, action) => {
      state.available = action.payload;
    });
  },
});

export const { setStateNofity } = notifySlice.actions;
export default notifySlice.reducer;
