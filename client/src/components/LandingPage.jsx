import React from "react";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={
          "https://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-png-2000.png"
        }
      />
      <Link to="/home">
        <button className={styles.buttonpushable} role="button">
          <span className={styles.buttonshadow}></span>
          <span className={styles.buttonedge}></span>
          <span className={styles.buttonfront}>GO!</span>
        </button>
      </Link>
    </div>
  );
}
