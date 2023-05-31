import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback]) (Asynchronous)
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as HttpOnly cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
