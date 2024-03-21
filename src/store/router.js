import { createRouter } from "@storeon/router";

export default createRouter([
  ["/", () => ({ page: "home" })],
  ["/other", () => ({ page: "other" })],
]);
