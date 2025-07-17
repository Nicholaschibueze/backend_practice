import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const phoneExists = await User.findOne({ phoneNumber });
    if (phoneExists) {
      return res.status(409).json({ message: "Phone number already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 

    res.status(200).json({
      message: "Users retrieved successfully.",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};