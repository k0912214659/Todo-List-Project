export const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
export const getIsUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUUid = uuidRegex.test(uuid);
  return isUUid;
};
