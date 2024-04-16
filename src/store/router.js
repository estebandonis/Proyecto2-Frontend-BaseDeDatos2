import { createRouter } from "@storeon/router";

export default createRouter([
  ["/", () => ({ page: "home" })],
  ["/main", () => ({ page: "main" })],
  ["/addSequel", () => ({ page: "addSequel" })],
  ["/login", () => ({ page: "login" })],
  ["/actor", () => ({ page: "actor" })],
  ["/users", () => ({ page: "users" })],
]);
