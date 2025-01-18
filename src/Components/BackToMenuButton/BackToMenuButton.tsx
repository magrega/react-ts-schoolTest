import { Link } from "react-router-dom";

const BackToMenuButton = () => {
  const clearLocalStorage = () => localStorage.clear();

  return (
    <Link to={`/`}>
      <button onClick={clearLocalStorage}>Back to Menu</button>
    </Link>
  );
};

export default BackToMenuButton;
