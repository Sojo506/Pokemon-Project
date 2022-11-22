import React from "react";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <h1>pokemon</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}
