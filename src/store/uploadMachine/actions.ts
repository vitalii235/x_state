import { FileType, UploadActionsData } from "./uploadMachine.types";

class UploadActions {
  addFile = (files: FileType[]) => ({
    type: UploadActionsData.ADD_FILE,
    payload: files,
  });

  uploadFiles = () => ({
    type: UploadActionsData.UPLOAD_FILES,
  });

  updateProgress = (payload: number) => ({
    type: UploadActionsData.UPDATE_PROGRESS,
    payload,
  });

  retryUploadFile = (uuid: string) => ({
    type: UploadActionsData.RETRY_UPLOAD_FILE,
    uuid,
  });

  cancelUploadFile = (uuid: string) => ({
    type: UploadActionsData.CANCEL_UPLOAD_FILE,
    uuid,
  });
}

export default new UploadActions();
