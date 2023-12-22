import React from 'react'
import { useParams } from 'react-router-dom'
import {PostFrom} from '../components/index'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function EditFrom() {
  const id=useParams().post
  const [data,setData]=React.useState({})
  const [load,setLoad]=React.useState(false)
  const postList = useSelector((state) => state.post.postData);

  useEffect(function(){
    // service.getPost(id).then(function(response){
    //   setData(response)
    // })
    // .catch(function(error){
    //   console.log(error)
    // }).finally(function(){
    //     setLoad(true)
    // })
    // console.log(data)
    // return ()=>{}

    setLoad(false)
    setData(postList.find((post)=>post.$id===id))
    setLoad(true)

  },[])
  if(load) return (
    <div>
        <PostFrom post={data}/>
    </div>
  )
  else return <h1>Loading</h1>
}

export default EditFrom