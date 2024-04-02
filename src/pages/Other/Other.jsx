import { navigate } from "@store";
import stiles from "./Other.module.css";

import { useApi } from "@hooks";
import axios from "axios";
import { useEffect } from "react";

const Other = () => {

  const { apiUrl } = useApi();

  const getData = async () => {
    await axios
      .get(`${apiUrl}/actores/info`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Other</h1>

        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    </div>
  );
};

export default Other;
