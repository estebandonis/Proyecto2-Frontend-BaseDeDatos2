import { navigate } from "@store";
import stiles from "./Home.module.css";

const Home = () => {
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
