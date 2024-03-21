import { navigate } from "@store";
import stiles from "./Other.module.css";

const Other = () => {
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
