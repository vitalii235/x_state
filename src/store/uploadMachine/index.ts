import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { Action, FilesListContext, Statuses } from "./uploadMachine.types";
import upload from "./states/upload";
import gettingKey from "./states/gettingKey";
import cancelingUpload from "./states/cancelingUpload";
import retryUploadFile from "./states/retryUploadFile";
import uploadFiles from "./states/uploadFiles";
import checkProgress from "./states/checkProgress";

const uploadMachine = createMachine<FilesListContext, Action>(
  {
    id: "uploader",
    initial: "upload",
    context: {
      files: [],
      key: "",
      errorFileUuid: "",
      status: Statuses.READY,
      progress: {},
      cancelFileUuid: "",
    },
    states: {
      upload,
      gettingKey,
      cancelingUpload,
      retryUploadFile,
      uploadFiles,
      checkProgress,
    },
  },
  {
    guards: {
      enableAddFiles: ({ status }) => status === Statuses.READY,
      enableUpload: ({ status, files }) =>
        status === Statuses.READY && !!files.length,
    },
  }
);

const useUploadStore = () => useMachine(uploadMachine);

export default useUploadStore;
