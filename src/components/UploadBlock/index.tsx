import React, { ChangeEvent, FC } from "react";
import styles from "./uploadBlock.module.css";
import Button from "../Button";

type Props = {
  handleAddFiles: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUploadFiles: () => void;
  isSomethingAdded: boolean;
};

const UploadBlock: FC<Props> = ({
  handleAddFiles,
  handleUploadFiles,
  isSomethingAdded,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Click here to add files
        <input
          className={styles.input}
          type="file"
          multiple
          onChange={handleAddFiles}
        />
      </label>
      <Button
        title={"Upload"}
        styleType={"cancel"}
        onClick={handleUploadFiles}
        disabled={!isSomethingAdded}
      />
    </div>
  );
};

export default UploadBlock;
