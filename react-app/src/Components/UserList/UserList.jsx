import { useState } from "react";
import { useId } from "react";
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


    const [user, setUser] = useState(initialUser)

    // Нужно ли фильтровать массив 
    const [userfilter, setUserFilter] = useState(false)
    // Переключение класса для кастомного select
    const [active, setActive] = useState(false)
    // Вариант выбора select
    const [selectValue, setSelectValue] = useState(null)

    // Переменные для инпутов
    const [nameValue, setNameValue] = useState('')
    const [professionValue, setProfessionValue] = useState('')
    const [nameError, setNameError] = useState('')
    const [professionError, setProfessionError] = useState('')


    // Переменная для сортировки
    const [sortValue, setSortValue] = useState('')

    const id = useId()


    const showUser = userfilter
    ? user.filter(u => u.profession === selectValue)
    : user


    // Функция для создания нового пользователя
    function createUser(e) {
        e.preventDefault()
        setNameError('')
        setProfessionError('')


        // Проверка на корректную валидацию
        if (nameValue.trim() === '') {
            setNameError('Имя не может быть пустым')
            return
        }
        if (professionValue.trim() === '') {
            setProfessionError('Профессия не может быть пустой')
            return 
        }

        if (/[!@#$%^&*()]/.test(nameValue)) {
            setNameError('Имя не должно содержать символы - !@#$%^&*()')
            return 
        }
        if (/[!@#$%^&*()]/.test(professionValue)) {
            setProfessionError('Профессия не должна содержать символы - !@#$%^&*()')
            return 
        }

        if (!(/^[a-zA-Z\s]+$/.test(nameValue))) {
            setNameError('Только латиница')
            return 
        }
        if (!(/^[a-zA-Z\s]+$/.test(professionValue))) {
            setProfessionError('Только латиница')
            return 
        }

        if (nameValue.length < 2 || nameValue.length > 40) {
            setNameError('Имя должно быть не меньше 2х и не больше 40 символов')
            return 
        }
        if (professionValue.length < 5 || professionValue.length > 100) {
            setProfessionError('Профессия должна быть не меньше 5 и не больше 100 символов')
            return 
        }



        // Добавление нового пользователя
        setUser([
            ...user,
            {id: Date.now(), name: nameValue, profession: professionValue,}
        ]
        )

        // Сброс значений в инпутах
        setNameValue('')
        setProfessionValue('')

    }


    function sortUser() {

        setUser([...user].sort((a, b) => a[sortValue].localeCompare(b[sortValue])))
        

    }


    return (

        <div className="user-list">

            <div className="user-list__container">

                <div className="user-list__ul">

                    {showUser.map(u => (
                        <li
                        key={u.id}
                        className="user-list__li"
                        >
                        {u.name}
                        </li>
                    ))}

                </div>


                <div className="user-list__buttons">
                    <div className="user-list__select">

                        <div
                        onClick={() => setActive(!active)}
                        data-value={selectValue}
                        className="user-list__current"> {selectValue === null ? 'Показать только...' : selectValue} </div>

                        <div
                        className={`user-list__items ${active ? 'active' : ''}`}>
                        {[...new Set(user.map(u => u.profession))].map(profession => (

                            <div
                            key={profession}
                            onClick={() => {
                                setSelectValue(profession)
                                setUserFilter(true)
                                setActive(false)
                            }}
                            className="user-list__item">{profession}</div>
                        ))}
                        </div>

                    </div>


                    <button
                    onClick={() => {
                        setUserFilter(false)
                        setSelectValue(null)
                    }}
                    >Сбросить фильтр</button>

                    <div className="user-list__sort">
                        <select
                        onChange={(e) => setSortValue(e.target.value)}
                        className="user-list__select">
                            <option
                            value={''}
                            >Сортировать по ...</option>

                            {Object.keys(user[0]).filter(key => key !== 'id').map(k => ( 

                                <option
                                key={k}
                                value={k}
                                >
                                {k}
                                </option>
                                
                            ))}

                        </select>
                        <button
                        onClick={sortUser}
                        >Сортировать</button>

                    </div>
                </div>

                <div className="user-list__create">

                    <form
                    onSubmit={(e) => createUser(e)}>
                    <label htmlFor={`name-${id}`}>Имя:</label>
                    <input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    id={`name-${id}`} type="text" />
                    {nameError === '' ? '' : <span>{nameError}</span>}

                    <label htmlFor={`prof-${id}`}>Профессия:</label>
                    <input 
                    value={professionValue}
                    onChange={(e) => setProfessionValue(e.target.value)}
                    id={`prof-${id}`} type="text" />
                    {professionError === '' ? '' : <span>{professionError}</span>}

                    <button
                    className="user-list__button">Создать</button>
                    </form>
                </div>

            </div>
        </div>
    )
}