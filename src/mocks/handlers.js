import { rest } from "msw";
import beService from "./BeService";
export const DB = {};
export const ACTIVE_CONNECTIONS = {};

export const handlers = [
  rest.post("https://made.up/upload", (req, res, ctx) => {
    const { key, value, uuid } = beService.formDataData(req.body);
    if (Math.random() > 0.75) {
      const data = { ...(DB[key] || {}) };
      data[uuid] = "error";
      DB[key] = { ...data };
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: `Error`,
        })
      );
    }
    beService.handleUploadFile(value, key, uuid);
    return res(ctx.status(201));
  }),

  rest.get("https://made.up/checkStatus", (req, res, ctx) => {
    const searchParams = req.url.search;
    const key = beService.generateObjectFromQuery(searchParams)?.key || "";
    return res(ctx.status(201), ctx.json(DB[key] || []));
  }),

  rest.get("https://made.up/cancelUpload", (req, res, ctx) => {
    const searchParams = req.url.search;
    const { uuid = "", key = "" } =
      beService.generateObjectFromQuery(searchParams);
    const copy = { ...DB[key] };
    copy[uuid] = "cancel";
    DB[key] = copy;
    clearInterval(ACTIVE_CONNECTIONS?.[uuid] || "");
    delete ACTIVE_CONNECTIONS[uuid];
    return res(ctx.status(201));
  }),

  rest.get("https://made.up/fieldKey", (req, res, ctx) => {
    const key = beService.generateUuid();
    DB[key] = {};
    return res(
      ctx.status(201),
      ctx.json({
        key,
      })
    );
  }),
];
