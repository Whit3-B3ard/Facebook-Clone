import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const { firstname, lastname, emailOrPhone, password, birthday, gender } =
      req.body;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstname,
      lastname,
      emailOrPhone,
      password: hashedpassword,
      birthday,
      gender,
    });
    await newUser.save();
    res.send({ success: true, newUser });
    console.log("New user created successfully:", newUser);
  } catch (error) {
    console.error("Error creating the user");
    res.send({ success: false, error: error.message });
  }
};

export const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ emailOrPhone: req.body.emailOrPhone });

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!matchPassword || !user) {
      return res.send({
        success: false,
        message: "Wrong e-mail or phone or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "Authentication successfull!",
      token,
    });

    console.log("User logged in==>", user);
    console.log("Users token==>", token);
  } catch (error) {
    console.error("Error signin in", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const findLoggedUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    res.send({ success: true, user });
  } catch (error) {
    console.error({ success: false, error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ success: true, users });
  } catch (error) {
    console.error("Error fetching the users", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const editUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ success: false, message: "User not found" });
    }

    console.log("Profile picture added successfully:", updatedTodo);
    res.send({
      success: true,
      user: updatedUser,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error adding the image", error.message);
    res.send({ success: false, error: error.message });
  }
};
