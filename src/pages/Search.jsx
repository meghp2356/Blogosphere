import React, { useEffect, useState } from "react";
import { Input, PostLayOut } from "../components/index";
import { useSelector } from "react-redux";
import "./pageCss/serach.css";

function Search() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const postList = useSelector((state) => state.post.postData);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(
    function () {
      setPosts(
        postList.filter((post) => {
          return post.title.toUpperCase().includes(search.toUpperCase());
        })
      );
    },
    [search, setSearch]
  );
  return (
    <div>
      <div className="home">
        <h1>SEARCH</h1>
        <h2>Search the post that you wanted.</h2>
      </div>
      <div className="search">
        <Input
          placeHolder="enter the post title"
          type="text"
          onChange={handleSearch}
        />
      </div>
      <div className="postList">
        {posts.map((post, index) => {
          return (
            <PostLayOut image={post.image} title={post.title} key={index}  id={post.$id}  userId={post.userid}/>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
