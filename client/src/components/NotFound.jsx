import React from 'react'
import styles from '../styles/NotFound.module.css';
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <img className={styles.image} src="https://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Ghost-PNG-Transparent-Image.png" alt="ghost" />
      <h1 className={styles.message}><span>404</span>Not Found</h1>
      <Link to="/home">
        <button className={styles.buttonpushable} role="button">
          <span className={styles.buttonshadow}></span>
          <span className={styles.buttonedge}></span>
          <span className={styles.buttonfront}>GET BACK!</span>
        </button>
      </Link>
    </div>
  )
}
