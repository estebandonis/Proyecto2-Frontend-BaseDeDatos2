import { useStoreon } from "storeon/react";
import { routerKey } from "@storeon/router";

import { default as Home } from "./Home";
import { default as Main } from "./Main";
import { default as AddSequel } from "./AddSequel";
import { default as Login } from "./Login";
import { default as Actores } from "./Actores";

const Page = () => {
  const { [routerKey]: route } = useStoreon(routerKey);

  let Component = null;
  switch (route.match.page) {
    case "home":
      Component = <Home />;
      break;
    case "main":
      Component = <Main />;
      break;
    case "login":
      Component = <Login />;
      break;
    case "actor":
      Component = <Actores />;
      break;
    case "addSequel":
      Component = <AddSequel />;
      break;
    default:
      Component = <h1>404 Error</h1>;
  }

  return <main>{Component}</main>;
};

export default Page;
