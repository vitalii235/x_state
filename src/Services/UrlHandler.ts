class UrlHandler {
  queryForCanceling = (uuid: string, key: string) => `?uuid=${uuid}&key=${key}`;
}

export default new UrlHandler();
