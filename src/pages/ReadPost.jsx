import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../services/services';
import { colors } from '@mui/material';

function ReadPost() {

    const [post,setPost] = useState({});
    const slug = useParams().slug;
    const [load,setLoad] = useState(false);
    const postList = useSelector((state) => state.post.postData);

    useEffect(function(){
        setLoad(false)
        setPost(postList.find(post => post.$id === String(slug)))
        setLoad(true)
    },[])
    console.log(post)
  if(load) return (
    <div style={titleStyle}>
        <div style={ImageStyle}>
          <img src={service.filePreview(post.image)} alt="" />
        </div>
        <h1 style={{textAlign:'center'}}>{post.title.toUpperCase()}</h1>
        <div>
            <p style={{color:'black',textAlign:'center'}}>{parse(String(post.content))}</p>
        </div>
    </div>
  )
  else return <h1>loading...</h1>
}

export default ReadPost

const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    margin:'18px'
  }
  
  const ImageStyle={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:'18px'

}