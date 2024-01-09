import { collection, getDocs } from "firebase/firestore";
import db from "../../lib/fireBaseConfig";
import { useEffect, useState, useContext } from "react";
import { UserCard } from "../UserCard";
import { UserContext } from "../../contexts/UserContext";
import { logInAccount } from "../../utils/api-ma";
import { useNavigate } from "react-router-dom";

export const LogIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await logInAccount(email, password);
      setUser(loggedInUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="label"></div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="label"></div>
        </label>
        <button className="btn btn-primary">Primary</button>
      </form>
    </>
  );
};
