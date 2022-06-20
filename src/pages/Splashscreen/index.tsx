import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Splashscreen = () => {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <button className="primary" onClick={handleOnClick}>
        Get Started
      </button>
    </div>
  );
};

export default Splashscreen;
