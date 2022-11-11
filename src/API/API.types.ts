export interface APIInterface {
  getEventUuid: () => Promise<{ key: string }>;
  uploadFiles: (formData: FormData) => Promise<void>;
  getUploadStatus: (key: string) => Promise<Record<string, number | "error">>;
  cancelUploadFile: (query: string) => Promise<void>;
}
