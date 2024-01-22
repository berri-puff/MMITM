import { useState } from "react";
import { checkUsernameExists, createAccount } from "../utils/api-ma";
import { useNavigate } from "react-router-dom";

export const CreateAccount: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e : any) => {
      e.preventDefault();
    if (name && username && email && password && !userExists) {
      const exists = await checkUsernameExists(username);
      if (exists === false) {
        createAccount(
          name,
          username,
          avatarUrl,
          email,
          password,
          setUserCreated
        );
        navigate("/log-in");
      } else {
        setUserExists(true);
      }
    }
  };

  const handleBlur = async () => {
    const exists = await checkUsernameExists(username);
    if (exists) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  };

  return (
    <>
      <>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left max-w-xl p-5">
              <h1 className="text-5xl font-bold">Simplify your meetups</h1>
              <p className="py-6">
                Log in or sign up to to effortlessly find convenient meeting
                points, explore suitable venues, and create personalised invites
                with travel times for your friends. Simplify your planning
                process and make every meetup a breeze!
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit} className="card-body">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="You name"
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
                    placeholder="Your username"
                    className="input input-bordered w-full max-w-xs"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={handleBlur}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Avatar URL</span>
                  </div>
                  <input
                    type="text"
                    placeholder="http//www.example.com"
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
                    placeholder="Your email"
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
                    placeholder="Your password"
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
            </div>
          </div>
        </div>
      </>
    </>
  );
};

// princesspeach@mushroomkingdom.com - ilovemari0
// leon.rookie@zombiehunter.com - zombieslayer4lyf
// potatoloversam@theshire.com - p0t4t03s
