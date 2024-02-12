"use client";

import { UserState } from "@/constants/Auth";
import { toastStyle } from "@/utils/ToastStyle";
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

function getInitialState(): UserState {
  // Check if code is running in the browser
  if (typeof window !== "undefined") {
    const userItem = localStorage.getItem("user");
    const isAuthenticatedItem = localStorage.getItem("isAuthenticated") === "1";

    return {
      user: userItem ? JSON.parse(userItem) : null,
      loading: false,
      error: null,
      message: null,
      isAuthenticated: isAuthenticatedItem,
    };
  } else {
    return {
      user: null,
      loading: false,
      error: null,
      message: null,
      isAuthenticated: false,
    };
  }
}

const initialState: UserState = getInitialState();

export const LoginUser = createAsyncThunk(
  "loginUser",
  async (
    data: { email: string; password: string; rememberMe?: boolean },
    { rejectWithValue }
  ) => {
    // console.log(data);

    try {
      const res = await axios.post("/api/auth/login", data);

      //   console.log(res.data);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data.message || "An unknown error occurred",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const RregisterUser = createAsyncThunk(
  "RegisterUser",
  async (
    data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    // console.log(data);

    try {
      const res = await axios.post("/api/auth/register", data);
      //   console.log(res.data);

      return res;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data.message || "An unknown error occurred",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.message = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        toast.success(state.message, {
          style: toastStyle,
        });
        localStorage.setItem("isAuthenticated", "1");
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error occurred";
        state.message = "An error occurred";
        state.isAuthenticated = false;

        toast.error(state.message, {
          style: toastStyle,
        });
      });

    builder
      .addCase(RregisterUser.pending, (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.message = null;
        state.error = null;
      })
      .addCase(RregisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
        state.isAuthenticated = true;
        state.message = action.payload.data.message;
        toast.success(state.message, {
          style: toastStyle,
        });
        localStorage.setItem("isAuthenticated", "1");
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(RregisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error occurred";
        state.message = "An error occurred";
        state.isAuthenticated = false;
        toast.error(state.message, {
          style: toastStyle,
        });
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
