import { v4 } from "uuid";
import { FileType } from "store/uploadMachine/uploadMachine.types";

class FileHandler {
  handleGenerateFormData = (file: FileType, key: string) => {
    const formData = new FormData();
    formData.append(key, file.file);
    formData.append(key, file.uuid);
    return formData;
  };

  handleParseFilesForPayload = (files: FileList) => {
    const keys = Object.keys(files);
    return keys.map((key) => ({
      file: files[+key],
      uuid: v4(),
    }));
  };
}

export default new FileHandler();
