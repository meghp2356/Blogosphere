import React, { useEffect } from "react";
import "./pageCss/home.css";
import { PostLayOut } from "../components/index";
import { useSelector } from "react-redux";

function Home() {
  const posts = useSelector((state) => state.post.postData);
  return (
    <>
      <div className="home">
        <h1>BlogoShere</h1>
        <h2>Start your blogosphere journey today.</h2>
      </div>
      <div className="postList">
        {posts.map((post,index) => {
          return (
            <PostLayOut
              image={post.image}
              title={post.title}
              key={index}
              id={post.$id}
              userId={post.userid}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
