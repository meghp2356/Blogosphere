import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserPost } from "../app/UserPost";
import { PostLayOut } from "../components";

function UserPost() {
  const Post = useSelector((state) => state.post.postData);
  const userId = useSelector((state) => state.auth.userData.$id);
  const userPost = useSelector((state) => state.userPost.userPost);
  const dispatch = useDispatch();
  console.log(Post);

  useEffect(() => {
    dispatch(
      setUserPost(
        Post.filter((post) => {
          return post.userid === userId;
        }).reverse()
      )
    );
    console.log(userPost, userId);
  }, []);
  return (
    <>
    <div className="home">
    <h1>YOUR POSTS</h1>
    <h2>All of your Posts</h2>
  </div>
    <div className="postList">
      {userPost.map((post) => (
          <PostLayOut key={post.$id} title={post.title} image={post.image} id={post.$id}  userId={post.userid}/>
          ))}
    </div>
    </>
  );
}

export default UserPost;
