import React from 'react'
import service from '../services/services'
import './css/PostLayOut.css'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

function PostLayOut({title, image,id,userId}) {
    const navigate = useNavigate()
    const userid = useSelector(state => state.auth.userData.$id)
    console.log(userid)
  return (
    <div className='layoutContainer'>
        <div className='layoutImage'>
            <img src={service.filePreview(image)} alt="" />
        </div>
            <h1>{title}</h1>
        <div className='layoutButtons'>
            <button onClick={()=>{navigate(`/${id}`)}}>read</button>
            {userid === userId && 
            <>
            <button onClick={()=>{navigate(`/edit/${id}`)}}>edit</button>
            <button onClick={()=>{
                service.deletePost(id).then(res =>{
                    window.location.reload()
                })
            }}>Delete</button>
            </>
        }
        </div>
    </div>
  )
}

export default PostLayOut