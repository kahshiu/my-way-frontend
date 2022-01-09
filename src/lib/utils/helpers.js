import { v4 } from "uuid";

export const genUUID = (prefix) => {
  return `${prefix}-${v4()}`
}
