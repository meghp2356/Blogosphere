import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice'
import PostSlice from './PostSlice'
import userPost from './UserPost'

const store = configureStore({
    reducer: {
        auth:user,
        post:PostSlice,
        userPost:userPost
    }
})

export default store