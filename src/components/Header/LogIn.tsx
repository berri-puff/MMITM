import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import { useEffect, useState } from "react";

export const LogIn: React.FC = ()=>{
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setUsers(data);
        } catch (err: any) {
          console.log(err);
        }
      };
      
    useEffect(() => {
        getUsers();
    }, []);
    console.log('hello' )
    return (
        <ul>
            <li>user 1 login</li>
            <li>user 2 login</li>
        </ul>
    )
}
