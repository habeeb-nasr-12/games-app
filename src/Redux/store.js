import { configureStore } from "@reduxjs/toolkit";
import gameRudecer from "./Mainapi";


export const store = configureStore({
    reducer:{
     game:gameRudecer
    }
})