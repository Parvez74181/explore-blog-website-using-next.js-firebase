let jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { accessToken } = req.body;

  try {
    jwt.verify(accessToken, process.env.JWT_SECRET);
    res.status(200).json({ decoded: true });
  } catch (error) {
    res.status(404).json({ decoded: false });
  }
}
