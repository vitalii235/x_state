import { StateConfig, UploadActionsData } from "../uploadMachine.types";
import api from "API/API";
import { assign } from "xstate";
import urlHandler from "Services/UrlHandler";

const cancelingUpload: StateConfig = {
  exit: assign({
    progress: ({ cancelFileUuid, progress }, uuid) => {
      const copy = { ...progress };
      if (cancelFileUuid === uuid) {
        copy[cancelFileUuid] = "cancel";
      }
      return copy;
    },
    cancelFileUuid: (_) => "",
  }),
  invoke: {
    id: "cancelingUpload",
    src: (ctx) => (cb) => {
      cb(UploadActionsData.CHECK_PROGRESS);
      const query = urlHandler.queryForCanceling(ctx.cancelFileUuid, ctx.key);
      return api.cancelUploadFile(query);
    },
  },
  on: {
    [UploadActionsData.CHECK_PROGRESS]: "checkProgress",
  },
};

export default cancelingUpload;
