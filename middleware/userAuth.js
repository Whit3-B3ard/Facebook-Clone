import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorisation || req.headers.Authorisation;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default auth;
