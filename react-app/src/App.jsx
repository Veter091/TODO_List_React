import { useState } from "react";
import "./App.css";
import ToDo from "./Components/ToDo/ToDo.jsx";
import Modal from "./Components/Modal/Modal.jsx";
import UserList from "./Components/UserList/UserList.jsx";
import MemoryGame from "./Components/MemoryGame/MemoryGame.jsx";
import TicTacToe from "./Components/TicTacToe/TicTacToe.jsx";
import MainComponent from "./Components/SyncingSelection/SyncingSelection.jsx";

function App() {
  // Состояние для модального окна
  const [isOpen, setIsOpen] = useState(false);

  // Функция для закрытия модального окна
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <ToDo />

      <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>
      <Modal isOpen={isOpen} onClose={handleClose} title="Заголовок статьи">
        <div>
          Статья: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
          ut amet! Nulla!
        </div>
      </Modal>

      <UserList />

      <MemoryGame
        images={[
          "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
          "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
          "https://images.unsplash.com/photo-1520763185298-1b434c919102",
          "https://images.unsplash.com/photo-1442458017215-285b83f65851",
          "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
          "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
        ]}
      />

      <TicTacToe />

      <MainComponent/>
    </>
  );
}

export default App;
