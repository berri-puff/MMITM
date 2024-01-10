import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { checkUsernameExists, createAccount } from "../utils/api-ma";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { IconH3 } from "@tabler/icons-preact";
import { set } from "firebase/database";

export const CreateAccount: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = await checkUsernameExists(username);
    if (exists === false) {
      createAccount(name, username, avatarUrl, email, password, setUserCreated);
      navigate("/Log_in");
    } else {
      setUserExists(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Avatar URL</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </label>
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
        <button className="btn btn-primary">Create Account</button>
        {userExists ? (
          <h3 className="text-error">Username already exists</h3>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

// princesspeach@mushroomkingdom.com - ilovemari0
// leon.rookie@zombiehunter.com - zombieslayer4lyf
// potatoloversam@theshire.com - p0tat03s
