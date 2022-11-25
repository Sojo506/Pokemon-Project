import React from "react";
import styles from "../styles/Card.module.css";

export default function Card({ image, name, types }) {
  
  return (
    <div className={styles.card}>
      <img 
        src={image} 
        alt={name} 
        className={styles.image}
      />
      <h3>{name}</h3>
      <p className={styles.types}>
        {
          types && types.map(t => {
            return (
              <p key={t}>
                {t}
              </p>
            )
          })
        }
      </p>
    </div>
  );
}
