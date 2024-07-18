import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 export const getMainApi = createAsyncThunk('games/allgemes',async()=>{
    
    let {data}= await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{headers:{
        'X-RapidAPI-Key': 'fa7d552fdfmsh29adebcace07b64p15baecjsn34115d66cfe6',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
    })
    return data


   
   



})
let initialState ={allgames:[]}
const  AllapiSlice = createSlice({

    name:"games", 
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getMainApi.fulfilled,(state,action)=>{
              state.allgames=action.payload
        },
        builder.addCase(getMainApi.rejected),(state,action)=>{
            state.allgames=action.payload
        })
    }

})
let gameRudecer= AllapiSlice.reducer
export default  gameRudecer
