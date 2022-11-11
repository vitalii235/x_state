import { StateConfig, UploadActionsData } from "../uploadMachine.types";
import api from "API/API";
import fileHandler from "Services/FileHandler";

const retryUploadFile: StateConfig = {
  invoke: {
    id: "retryUploadFile",
    src: (ctx) => (cb) => {
      const file = ctx.files.find((f) => f.uuid === ctx.errorFileUuid)!;
      const formData = fileHandler.handleGenerateFormData(file, ctx.key);
      api.uploadFiles(formData);
      return cb(UploadActionsData.CHECK_PROGRESS);
    },
  },
  on: {
    [UploadActionsData.CHECK_PROGRESS]: "checkProgress",
  },
};

export default retryUploadFile;
