import { StateConfig, UploadActionsData } from "../uploadMachine.types";
import fileHandler from "Services/FileHandler";
import api from "API/API";

const uploadFiles: StateConfig = {
  invoke: {
    id: "uploadFiles",
    src: (ctx) => (cb) => {
      const files = ctx.files;
      files.forEach((file) => {
        const formData = fileHandler.handleGenerateFormData(file, ctx.key);
        if (!ctx.progress[file.uuid] || ctx.progress[file.uuid] === "error") {
          api.uploadFiles(formData);
        }
      });
      return cb(UploadActionsData.CHECK_PROGRESS);
    },
  },
  on: {
    [UploadActionsData.CHECK_PROGRESS]: "checkProgress",
  },
};

export default uploadFiles;
