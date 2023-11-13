import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";
import User from "./../../../models/User";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connection to DB" });
  }

  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User does'nt exist!" });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return res.status(422).json({
      status: "failed",
      message: "Username or password is not corecct!",
    });
  }

  const token = sign({ email }, secretKey, { expiresIn: expiration });

  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: expiration,
    path: "/",
  });
  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({
      status: "success",
      message: "Logged in!",
      data: { email: user.email },
    });
}

export default handler;
