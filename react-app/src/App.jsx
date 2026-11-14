import { useState } from 'react'
import './App.css'
import ToDo from './Components/ToDo/ToDo.jsx'
import Modal from './Components/Modal/Modal.jsx'
import UserList from './Components/UserList/UserList.jsx'

function App() {

  // Состояние для модального окна
  const [isOpen, setIsOpen] = useState(false)

  // Функция для закрытия модального окна 
  function handleClose() {
    setIsOpen(false)
  }



  return (
    <>
    <ToDo/>


    <button
    onClick={() => setIsOpen(true)}
    >Открыть модальное окно</button>
    <Modal
    isOpen={isOpen}
    onClose={handleClose}
    title="Заголовок статьи"
    >
      <div>Статья: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ut amet! Nulla!</div>
    </Modal>
      
    <UserList/>
    </>
  )
}

export default App
