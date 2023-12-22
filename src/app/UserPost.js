import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userPostId:[],
    userPost:[]
}

const userPostSlice = createSlice({
    name:'userPost',
    initialState,
    reducers:{
        setUserPost : function (state,action){
            state.userPostId = action.payload.$id;
            state.userPost = action.payload;
        }
    }
})

export const {setUserPost} = userPostSlice.actions;
export default userPostSlice.reducer;