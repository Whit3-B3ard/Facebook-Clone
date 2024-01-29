import User from "../models/userSchem.jsx";
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
      return req.send({
        success: false,
        message: "Wrong e-mail or phone or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_ENV_KEY, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "Authentication successfull!",
      token,
    });

    console.log("User logged in==>", user);
  } catch (error) {
    console.error("Error signin in", error.message);
    res.send({ success: false, error: error.message });
  }
};
