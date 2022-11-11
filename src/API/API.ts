import { APIInterface } from "./API.types";
import fetchRequest from "./helpers/fetchRequest";
import {
  FILE_KEY,
  UPLOAD_FILE,
  CHECK_STATUS,
  CANCEL_UPLOAD,
} from "./Constants";

class API implements APIInterface {
  getEventUuid = async () => {
    const response = await fetchRequest(FILE_KEY);
    return response.key;
  };

  uploadFiles = async (formData: FormData) => {
    await fetchRequest(UPLOAD_FILE, {
      method: "POST",
      body: formData,
    });
  };

  getUploadStatus = async (
    key: string
  ): Promise<Record<string, number | "error">> => {
    return await fetchRequest(`${CHECK_STATUS}?key=${key}`);
  };

  cancelUploadFile = async (query: string) => {
    return await fetchRequest(`${CANCEL_UPLOAD}${query}`);
  };
}

export default new API();
