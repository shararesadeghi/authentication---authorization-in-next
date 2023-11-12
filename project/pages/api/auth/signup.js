import { hashPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .staus(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .staus(422)
      .json({ status: "failed", message: "User existed already" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);
  res.staus(201).json({ status: "success", message: "User created" });
}
export default handler;
