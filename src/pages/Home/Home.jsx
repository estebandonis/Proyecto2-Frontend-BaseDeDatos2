import { navigate } from "@store";
import stiles from "./Home.module.css";
import { useEffect } from "react";

import { useApi } from "@hooks";
import axios from "axios";

const Home = () => {

  const { apiUrl } = useApi();

  const getData = async () => {
    await axios
      .get(`${apiUrl}/info`)
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
        <h1>Home</h1>

        <button onClick={() => navigate("/other")}>Go to Other</button>
      </div>
    </div>
  );
};

export default Home;
