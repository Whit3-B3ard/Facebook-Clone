import Post from "../models/postSchema.js";

/*  const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("author", user._id);
    formdata.append("postImage", image); */

export const createPost = async (req, res) => {
  if (req.file) req.body.image = req.file.filename;
  console.log(req.body)
  try {
   

    const newPost = new Post(req.body);
    await newPost.save();
    // await newPost.populate("author");
    res.json(newPost);
    console.log("Post created successfully:", newPost);
  } catch (error) {
    console.error("Error creating the post", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");

    res.send({ success: true, posts });
  } catch (error) {
    console.error("Error fetching the posts", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const findPost = await Post.findById(postId);
  fs.unlinkSync(findPost.image);
  await Post.findByIdAndDelete(postId);
  res.json({ message: "Post deleted successfully!" });
};

export const editPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: req.body },
      { new: true }
    ).populate("author");

    if (!updatedPost) {
      return res.send({ success: false, message: "Post not found" });
    }

    console.log("Post updated successfully:", updatedPost);
    res.send({
      success: true,
      post: updatedPost,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updating the post", error.message);
    res.send({ success: false, error: error.message });
  }
};