import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
let jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { email, password } = req.body;

  let { user } = await signInWithEmailAndPassword(auth, email, password);

  let token = jwt.sign({ data: user.accessToken }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });

  res.status(200).json({ token });
}
