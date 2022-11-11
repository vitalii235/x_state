import React, { FC } from "react";
import styles from "App.module.css";
import Card from "../Card";
import {
  FileType,
  ProgressType,
  Statuses,
} from "store/uploadMachine/uploadMachine.types";

type Props = {
  files: FileType[];
  progress: Record<string, ProgressType>;
  handleCancel: (uuid: string) => void;
  handleRetry: (uuid: string) => void;
  status: Statuses;
};
const ListContainer: FC<Props> = ({
  files,
  progress,
  handleCancel,
  handleRetry,
  status,
}) => {
  return (
    <div className={styles.filesContainer}>
      {files.map((file) => (
        <Card
          key={file.uuid}
          name={file.file.name}
          progress={progress[file.uuid]}
          handleCancel={handleCancel}
          handleRetry={handleRetry}
          uuid={file.uuid}
          status={status}
        />
      ))}
    </div>
  );
};

export default ListContainer;
