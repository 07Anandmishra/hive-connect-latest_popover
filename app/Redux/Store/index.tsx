import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slices/UserSlice'


const store=configureStore({
    reducer:{
      users : userSlice,
    }
})
export default store