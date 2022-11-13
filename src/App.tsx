import React from "react";
import Title from "./components/Title";
import styles from "./App.module.css";
import UploadBlock from "./components/UploadBlock";
import useUpload from "./hooks/useUpload";
import ListContainer from "./components/ListContainer";

export default function App() {
  const {
    files,
    handleAddFiles,
    handleCancel,
    handleUploadFiles,
    handleRetry,
    progress,
    isSomethingAdded,
    status,
  } = useUpload();
  return (
    <div className={styles.app}>
      <Title title={"Mock App"} />
      <UploadBlock
        handleAddFiles={handleAddFiles}
        handleUploadFiles={handleUploadFiles}
        isSomethingAdded={isSomethingAdded}
      />
      <ListContainer
        files={files}
        progress={progress}
        handleCancel={handleCancel}
        handleRetry={handleRetry}
        status={status}
      />
    </div>
  );
}
