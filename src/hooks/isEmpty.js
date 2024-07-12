export function isEmpty(value) {
  return value == null || value == undefined || value == 0 || (typeof value === "string" && !value?.trim()) || (Array?.isArray(value) && !value?.length);
}
