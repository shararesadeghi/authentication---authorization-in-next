import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const signOutHandler = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <button>
        <Link href="/dashboard">Dashboard</Link>
      </button>
      <button>
        <Link href="/signup">Sign Up</Link>
      </button>
      <button>
        <Link href="/signin">Sign In</Link>
      </button>
      <button onClick={signOutHandler}>Log Out</button>
    </div>
  );
}
