import React from "react";
import { verifyToken } from "../utils/auth";

const Dashboard = () => {
  return <div>Dashborad</div>;
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
