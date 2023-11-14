import { useState } from "react";
import { verifyToken } from "../utils/auth";

const Dashboard = ({ result }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/update-info", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h3>Dashborad</h3>
      <p>Your email is {result.email}</p>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lastname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const result = verifyToken(token, secretKey);

  if (!result) {
    return { redirect: { destination: "/signin", permanent: false } };
  }
  return {
    props: { result },
  };
}
