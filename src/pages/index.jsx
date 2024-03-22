import { useStoreon } from "storeon/react";
import { routerKey } from "@storeon/router";

import { default as Home } from "./Home";
import { default as Other } from "./Other";

const Page = () => {
  const { [routerKey]: route } = useStoreon(routerKey);

  let Component = null;
  switch (route.match.page) {
    case "home":
      Component = <Home />;
      break;
    case "other":
      Component = <Other />;
      break;
    default:
      Component = <h1>404 Error</h1>;
  }

  return <main>{Component}</main>;
};

export default Page;