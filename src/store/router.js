import { createRouter } from "@storeon/router";

export default createRouter([
  ["/", () => ({ page: "home" })],
  ["/main", () => ({ page: "main" })],
  ["/login", () => ({ page: "login" })],
]);
