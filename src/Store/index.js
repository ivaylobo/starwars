import loginSlice from "./login-slice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {log: loginSlice.reducer}
});

export default store;