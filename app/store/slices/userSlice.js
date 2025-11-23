import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const decodeToken = createAsyncThunk("user/decodeToken", async () => {
  try {
    const rs = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_PORT + "api/auth/decode/",
      {},
      { withCredentials: true }
    );
    if (rs.data.status === "Success") {
      return rs.data.tokenJwt;
    } else {
      return {
        name: "",
        email: "",
        role: "",
        expiresIn: 0,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      name: "",
      email: "",
      role: "",
      expiresIn: 0,
    };
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    role: "",
    expiresIn: 0,
  },
  reducers: {
    logout(state) {
      state.name = "";
      state.email = "";
      state.role = "";
      state.expiresIn = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(decodeToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.name = action.payload.name ? action.payload.name : "";
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.expiresIn = action.payload.exp;
      }
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
