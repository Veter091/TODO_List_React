import { useState } from "react";
import './UserList.css'


export default function UserList() {

    const initialUser = [ 
        { id: 1, name: 'Creola Katherine Johnson', profession: 'Mathematician' },
        { id: 2, name: 'Mario José Molina-Pasquel Henríquez', profession: 'Chemist'},
        { id: 3, name: 'Mohammad Abdus Salam', profession: 'Physicist'}, 
        { id: 4, name: 'Percy Lavon Julian', profession: 'Chemist' }, 
        { id: 5, name: 'Katherine Johnson', profession: 'Programmer' }, 
        { id: 6, name: 'Jane Johnson', profession: 'Astronaut' }, 
        { id: 7, name: 'Cael Thas', profession: 'Manager' }, 
    ]

    const [userfilter, setUserFilter] = useState(false)

    const showUserUser = userfilter
    ? initialUser.filter(u => u.profession === 'Chemist')
    : initialUser


    return (

        <div className="user-list">

            <div className="user-list__container">

                <div className="user-list__ul">

                    {showUserUser.map(u => (
                        <li
                        key={u.id}
                        className="user-list__li"
                        >
                        {u.name}
                        </li>
                    ))}

                </div>


                <div className="user-list__buttons">
                    <button
                    onClick={() => setUserFilter(true)}
                    >Показать только химиков</button>
                    <button
                    onClick={() => setUserFilter(false)}
                    >Сбросить фильтр</button>
                </div>

            </div>
        </div>
    )
}