import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBlog = new Blog({
      title,
      content,
      author,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully.",
      blog: {
        id: newBlog._id,
        title: newBlog.title,
        content: newBlog.content,
      },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");

    res.status(200).json({
      message: "Blogs retrieved successfully.",
      blogs,
    });
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};