import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const UserCard = ({user}: any) => {
    const { setUser }: any = useContext(UserContext)

    const handleAvatarClick = (username: any) => {
        setUser(username)
    }

    return <div>
        <button onClick={() => { handleAvatarClick(user.username) }}>{user.username}</button>
    </div>
}