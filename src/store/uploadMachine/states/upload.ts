import {
  StateConfig,
  Statuses,
  UploadActionsData,
} from "../uploadMachine.types";
import { assign } from "xstate";

const upload: StateConfig = {
  on: {
    [UploadActionsData.ADD_FILE]: {
      cond: "enableAddFiles",
      actions: assign({
        files: ({ files }, file) => [...files, ...file.payload],
      }),
    },
    [UploadActionsData.UPLOAD_FILES]: {
      target: "gettingKey",
      cond: "enableUpload",
      actions: assign({
        status: (_) => Statuses.PROCESSING,
      }),
    },
    [UploadActionsData.RETRY_UPLOAD_FILE]: {
      target: "retryUploadFile",
      cond: "enableRetry",
      actions: assign({
        status: (_) => Statuses.PROCESSING,
        errorFileUuid: (_, { uuid }) => uuid,
      }),
    },
  },
};

export default upload;
