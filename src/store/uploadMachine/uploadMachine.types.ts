import { StateNodeConfig } from "xstate";
import actions from "./actions";

export enum UploadActionsData {
  ADD_FILE = "ADD_FILE",
  UPLOAD_FILES = "UPLOAD_FILES",
  UPDATE_STATUS = "UPDATE_STATUS",
  UPDATE_PROGRESS = "UPDATE_PROGRESS",
  CHECK_PROGRESS = "CHECK_PROGRESS",
  PROCESSING_DONE = "PROCESSING_DONE",
  RETRY_UPLOAD_FILE = "RETRY_UPLOAD_FILE",
  CANCEL_UPLOAD_FILE = "CANCEL_UPLOAD_FILE",
}

export enum Statuses {
  READY = "READY",
  PROCESSING = "PROCESSING",
  ERROR = "ERROR",
}

export type FileType = { uuid: string; file: File };
export type ProgressType = number | "error" | "cancel";

type ActionsName = keyof typeof actions;
export type Action = ReturnType<typeof actions[ActionsName]>;

export interface FilesListContext {
  files: FileType[];
  status: Statuses;
  progress: Record<string, ProgressType>;
  key: string;
  errorFileUuid: string;
  cancelFileUuid: string;
}

export type StateConfig = StateNodeConfig<FilesListContext, any, any>;
