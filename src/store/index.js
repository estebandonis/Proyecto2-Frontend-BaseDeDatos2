import { storeonDevtools } from "storeon/devtools";
import { createStoreon } from "storeon";
import { persistState } from "@storeon/localstorage";
import { routerNavigate } from "@storeon/router";
import user from './user'
import router from "./router";

const store = createStoreon([
  router,
  user,
  storeonDevtools,

  persistState(['user'])
])

const navigate = (target) => {
  console.log("NAVIGATING TO", target);
  store.dispatch(routerNavigate, target);
};

export { navigate };
export default store;
