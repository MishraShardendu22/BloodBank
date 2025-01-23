import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: "",
    role: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    password: "",
    createdAt: "",
    updatedAt: "",
    hospitalName: "",
    organisationName: "",
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Previous State:", state.user);
      console.log("Payload:", action.payload);

      state.user = { ...state.user, ...action.payload };
      console.log("Updated State:", state.user);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
