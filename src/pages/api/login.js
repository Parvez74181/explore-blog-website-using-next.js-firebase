let jwt = require("jsonwebtoken");
import { app } from "../../../utils/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const auth = getAuth(app);

  let { user } = await signInWithEmailAndPassword(auth, email, password);

  let token = jwt.sign({ data: user?.accessToken }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.status(200).json({ token });
}
