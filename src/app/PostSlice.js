import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId:'',
    postData:[]
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        setPost:(state,action)=>{
            state.postId = action.payload.$id,
            state.postData = action.payload
        }
    }
})

export const {setPost} = postSlice.actions;
export default postSlice.reducer;