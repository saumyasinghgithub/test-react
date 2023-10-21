import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_API_URL;

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
            "x-api-key": "$2a$08$9mxaW1nqVNxmfjSOBhuIMuqAIZRU5v5uEToa5POvrS9H7CZ50cFM2",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,OPTIONS,PATCH",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, token, access-control-allow-origin",
            Accept: "application/json, text/plain, */*",
        },
      };
      const response  = await axios.post(
        `${backendURL}/user/login`,
        { username, password },
        config
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem('userToken', response.data.token);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
      // store user's token in local storage
      //localStorage.setItem("userToken", data.userToken);
      //return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error_message) {
        return rejectWithValue(error.response.data.error_message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/add",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
            "x-api-key": "$2a$08$9mxaW1nqVNxmfjSOBhuIMuqAIZRU5v5uEToa5POvrS9H7CZ50cFM2",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,OPTIONS,PATCH",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, token, access-control-allow-origin",
            Accept: "application/json, text/plain, */*",
        },
      };

      const response = await axios.post(
        `${backendURL}/user/add`,
        { username, email, password },
        config
      );
      console.log(response);
      if (response.data.success) {
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
