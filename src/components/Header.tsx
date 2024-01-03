import { NavBar } from "./Header/NavBar";
import imageToAdd from "../assets/MMITM.jpg";

export const Header = () => {
  return <div>
    <h1>Meet Me in the Middle</h1>
    <img className="headerIMG"src={imageToAdd}></img>
    <NavBar />
  </div>
 
};

