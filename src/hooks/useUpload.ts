import useUploadStore from "../store/uploadMachine";
import React, { ChangeEvent } from "react";
import actions from "../store/uploadMachine/actions";
import fileHandler from "../Services/FileHandler";

const useUpload = () => {
  const [store, dispatch] = useUploadStore();
  const files = store.context.files;
  const progress = store.context.progress;
  const status = store.context.status;
  const isSomethingAdded = !!files.length;

  const handleRetry = React.useCallback(
    (uuid: string) => {
      dispatch(actions.retryUploadFile(uuid));
    },
    [dispatch]
  );

  const handleCancel = React.useCallback(
    (uuid: string) => {
      dispatch(actions.cancelUploadFile(uuid));
    },
    [dispatch]
  );

  const handleAddFiles = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const filesWithUuid = fileHandler.handleParseFilesForPayload(files!);
      dispatch(actions.addFile(filesWithUuid));
    },
    [dispatch]
  );

  const handleUploadFiles = React.useCallback(() => {
    dispatch(actions.uploadFiles());
  }, [dispatch]);

  return {
    files,
    progress,
    handleRetry,
    handleCancel,
    handleAddFiles,
    handleUploadFiles,
    isSomethingAdded,
    status,
  };
};

export default useUpload;
