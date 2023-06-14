import jwt from "jsonwebtoken";
import { signOut, getAuth } from "firebase/auth";
import { app } from "../../../utils/firebaseConfig";

export default async function handler(req, res) {
  const { accessToken } = req.body;
  const auth = getAuth(app);

  try {
    jwt.verify(accessToken, process.env.JWT_SECRET);
    res.status(200).json({ decoded: true });
  } catch (error) {
    // Verify if the user is already signed in
    const user = auth.currentUser;
    if (user) await signOut(auth); // User is signed in, sign them out
    console.log("signOut");

    res.status(404).json({ decoded: false });
  }
}
