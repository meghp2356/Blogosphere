import React from "react";
import { Editor, Input } from "../index";
import { useForm } from "react-hook-form";
import service from "../../services/services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../app/PostSlice";
import "./Post.css";

function PostFrom({ post }) {
  const { control, watch, handleSubmit, register, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const PostList = useSelector((state) => state.post.postData);
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    

    if (post) {
      const fImage = data.image[0];

      if (fImage) {
        const response = await service.createFile(fImage);
        data.image = response.$id;
        await service.updatePost(data.slug, { ...data });
      } else
        await service.updatePost(data.slug, { ...data, image: post.image });
      navigate("/");
    } else {
      const fImage = data.image[0];
      const responed = fImage ? await service.createFile(fImage) : null;

      if (responed) {
        const userPost = await service.createPost({
          ...data,
          image: responed.$id,
          userid: user.$id,
        });

        if (userPost) {
          dispatch(setPost([...PostList, userPost]));
          navigate("/userPost");
        }
      }
    }
  };

  const slugTransfrom = React.useCallback((title) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransfrom(value.title));
      }
    });
    return () => {
      subcription.unsubscribe();
    };
  }, [watch, slugTransfrom, setValue, onSubmit]);

  return (
    <>
      <div className="home">
        <h1>{post ? "UPDATE" : "CREATE"}</h1>
        <h2>Start your blogosphere journey today.</h2>
      </div>
      <div className="post">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="slug">
            <label htmlFor="title">Title :</label>
            <Input
              type="text"
              placeHolder="enter Your Title "
              {...register("title")}
            />
            <label htmlFor="slug">Slug :</label>

            <Input
              type="text"
              placeHolder="enter Your Slug "
              {...register("slug")}
              onInput={(e) => {
                setValue("slug", slugTransfrom(e.value));
              }}
            />
          </div>

          <Editor
            control={control}
            name={"content"}
            defaultValue={getValues("content")}
          />

          {post && (
            <>
              <h1>feauture Image</h1>
              <img
                src={service.filePreview(post.image)}
                alt=""
                width={"200px"}
                style={{
                  borderRadius: "5px",
                  margin: "8px",
                }}
              />
            </>
          )}

          <div className="fimage">
            <label htmlFor="Image">Image :</label>
            <Input
              type="file"
              placeHolder="enter your file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image")}
            />
            <select name="" id="" {...register("status")}>
              <option value="active">public</option>
              <option value="inactive">Private</option>
            </select>
          </div>
          <button type="submit">{post ? "UPDATE" : "SUBMIT"}</button>
        </form>
      </div>
    </>
  );
}

export default PostFrom;
