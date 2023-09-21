import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk } from "./useThunk";
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => {
  // try {
  //   const resp = await customFetch.post("/auth/register", user);
  //   return resp.data;
  // } catch (error) {
  //   return thunkApi.rejectWithValue(error.response.data.msg);
  // }

  return registerUserThunk("/auth/register", user, thunkAPI);
});

export const updateUser = createAsyncThunk("user/updateUser", async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch("/auth/updateUser", user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    console.log(resp.data);
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
  // try {
  //   const resp = await customFetch.post("/auth/login", user);
  //   return resp.data;
  //   // console.log(resp);
  //   //   console.log(`Register User :  ${JSON.stringify(user)}`);
  // } catch (error) {
  //   return thunkAPI.rejectWithValue(error.response.data.msg);
  //   // console.log(error);
  // }

  return loginUserThunk("/auth/login", user, thunkAPI);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`hello there ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`User Updated!!${user.name}`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
  },
});

export const { toggleSideBar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
