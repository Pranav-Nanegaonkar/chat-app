import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div>HomePage</div>
      <div>HomePage</div>
      <div>HomePage</div>
      <div>HomePage</div> <div>HomePage</div>
      <div>HomePage</div>
      <div>HomePage</div>
      <div>HomePage</div>
      <div>HomePage</div>
      <div>
        <Link to={"/login"}>loginPage</Link>
      </div>
    </div>
  );
};

export default HomePage;
