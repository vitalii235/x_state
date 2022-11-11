import api from "API/API";
import { assign } from "xstate";
import { StateConfig } from "../uploadMachine.types";

const gettingKey: StateConfig = {
  invoke: {
    id: "gettingKey",
    src: (_) => api.getEventUuid(),
    onDone: {
      target: "uploadFiles",
      actions: assign({
        key: (_, { data }) => data,
      }),
    },
  },
};

export default gettingKey;
