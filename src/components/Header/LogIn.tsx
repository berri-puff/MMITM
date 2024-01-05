import { collection, getDocs } from "firebase/firestore";

import db from "../../lib/fireBaseConfig";
import { useEffect, useState } from "react";
import { UserCard } from "../UserCard";

export const LogIn: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setUsers(data);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>Loading!</div>;
  }

  return (
    <div>
      <h2>Log in </h2>
      <h3>select a user from the list below</h3>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
