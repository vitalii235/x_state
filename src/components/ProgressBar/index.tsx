import React, { FC } from "react";
import styles from "./progressBar.module.css";
import { ProgressType } from "store/uploadMachine/uploadMachine.types";

type Props = {
  progress: ProgressType;
};
const ProgressBar: FC<Props> = ({ progress }) => {
  if (!progress) return null;
  if (progress === "error") {
    return <span>Please retry</span>;
  }
  if (typeof progress === "number") {
    return (
      <div className={styles.container}>
        <div className={styles.progressContainer}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }
  return null;
};

export default ProgressBar;
