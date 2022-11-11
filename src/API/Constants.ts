const BASE_URL = "https://made.up"; //Hide in env
const concatUrl = (url: string) => `${BASE_URL}${url}`;
export const UPLOAD_FILE = concatUrl("/upload");
export const FILE_KEY = concatUrl("/fieldKey");
export const CHECK_STATUS = concatUrl("/checkStatus");
export const CANCEL_UPLOAD = concatUrl("/cancelUpload");
