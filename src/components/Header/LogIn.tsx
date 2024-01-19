import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { logInAccount } from "../../utils/api-ma";
import { Link, useNavigate } from "react-router-dom";

export const LogIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await logInAccount(email, password, setIsError);
      setUser(loggedInUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left max-w-xl p-5">
            <h1 className="text-5xl font-bold">Simplify your meetups</h1>
            <p className="py-6">
              Log in or sign up to to effortlessly find convenient meeting
              points, explore suitable venues, and create personalised invites
              with travel times for your friends. Simplify your planning process
              and make every meetup a breeze!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered w-full max-w-xs mb-5"
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
                  className="input input-bordered w-full max-w-xs mb-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt">
                    <Link to="/sign-up">
                      Don't have an account? Sign up here.
                    </Link>
                  </span>
                </div>

                <div className="label"></div>
              </label>

              <button className="btn btn-primary mb-2">Log in</button>
              {isError ? (
                <p className="text-error">Incorrect email or password</p>
              ) : (
                " "
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
