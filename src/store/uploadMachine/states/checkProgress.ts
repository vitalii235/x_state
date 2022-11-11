import {
  StateConfig,
  Statuses,
  UploadActionsData,
} from "../uploadMachine.types";
import { assign } from "xstate";
import api from "API/API";

const checkProgress: StateConfig = {
  exit: assign({
    errorFileUuid: (_) => "",
  }),
  on: {
    "": {
      target: "upload",
      cond: (ctx) => ctx.status !== Statuses.PROCESSING,
    },
    [UploadActionsData.UPDATE_PROGRESS]: {
      actions: assign({
        progress: (ctx, { payload }) => payload,
      }),
    },
    [UploadActionsData.PROCESSING_DONE]: {
      target: "upload",
      actions: assign({
        status: (_) => Statuses.READY,
      }),
    },
    [UploadActionsData.CANCEL_UPLOAD_FILE]: {
      target: "cancelingUpload",
      actions: assign({
        cancelFileUuid: (_, { uuid }) => uuid,
      }),
    },
  },
  invoke: {
    id: "checkProgress",
    src: (ctx) => (cb) => {
      const interval = setInterval(async () => {
        const response: Record<string, number | "error" | "cancel"> =
          await api.getUploadStatus(ctx.key);
        cb({
          payload: { ...ctx.progress, ...response },
          type: UploadActionsData.UPDATE_PROGRESS,
        });
        const keys = Object.keys(response);
        const unDoneStatuses = keys.filter(
          (status) =>
            response[status] !== "error" &&
            response[status] < 100 &&
            response[status] !== "cancel"
        );
        if (!unDoneStatuses.length) {
          cb(UploadActionsData.PROCESSING_DONE);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },
  },
};

export default checkProgress;
