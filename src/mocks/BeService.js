import { ACTIVE_CONNECTIONS, DB } from "./handlers";
import { v4 } from "uuid";

class BEService {
  SIZE_PER_SECOND = 10_000;
  specialCharactersRule = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

  formDataData = (body) => {
    const key = Object.keys(body)?.[0];
    const value = body[key]?.[0];
    const uuid = body[key]?.[1] || "";

    return {
      key,
      value,
      uuid,
    };
  };

  handleUploadFile = (file, key, uuid) => {
    const interval = setInterval(() => {
      const data = { ...(DB[key] || {}) };
      const uploadedPercents = data[uuid] === "error" ? 0 : data[uuid] || 0;
      data[uuid] = uploadedPercents + (this.SIZE_PER_SECOND / file.size) * 100;
      DB[key] = { ...data };
      if (data[uuid] >= 100 || data[uuid] === "error") {
        clearInterval(interval);
        delete ACTIVE_CONNECTIONS[uuid];
      }
    }, 700);
    ACTIVE_CONNECTIONS[uuid] = interval;
  };

  generateUuid = () => v4();

  generateObjectFromQuery = (query) => {
    const splitQueryByParams = query.split("&");
    return splitQueryByParams.reduce((acc, value) => {
      const keyValuePair = value.split("=");
      if (keyValuePair.length > 1) {
        //remove special characters from first query key
        const key = this.specialCharactersRule.test(keyValuePair[0][0])
          ? keyValuePair[0].substring(1)
          : keyValuePair[0];

        const queryValue = keyValuePair[1];
        if (queryValue.includes(",")) {
          acc[key] = queryValue.split(",");
        } else {
          acc[key] = queryValue;
        }
      }
      return acc;
    }, {});
  };
}

export default new BEService();
