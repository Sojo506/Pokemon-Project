import React from "react";
import styles from "../styles/Loading.module.css";
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.progressContainer}>
        <div className={styles.waviy}>
          <span>l</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <div className={styles.progress}>
          <div
            className={styles.progressBar}
            style={{
              width: "100%",
            }}
          >
            <div className={styles.progressValue}>100%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
