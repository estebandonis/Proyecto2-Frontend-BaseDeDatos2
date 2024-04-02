import { navigate } from "@store";
import stiles from "./Home.module.css";
import { useEffect } from "react";

import { useApi } from "@hooks";
import axios from "axios";

const Home = () => {

  const { apiUrl } = useApi();

  // const getData = async () => {
  //   await axios
  //     .get(`${apiUrl}/`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //       console.log("An error occurred while retrieving data", error);
  //     });
  // };

  // const sendData = async () => {
  //   await axios
  //     .post(`${apiUrl}/send`, {
  //       name: "John Doe",
  //       email: "",
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //       console.log("An error occurred while sending data", error);
  //     });
  // };

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Home</h1>

        <button onClick={() => navigate("/other")}>Go to Other</button>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    </div>
  );
};

export default Home;
