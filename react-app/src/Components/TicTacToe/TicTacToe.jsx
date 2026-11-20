import { useState } from "react";
import './TicTacToe.css'

export default function TicTacToe() {


    // Победные комбинации
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]


    // История ходов
    const [history, setHistory] = useState([
        [
            {id: 0, value: null}, {id: 1, value: null}, {id: 2, value: null},
            {id: 3, value: null}, {id: 4, value: null}, {id: 5, value: null},
            {id: 6, value: null}, {id: 7, value: null}, {id: 8, value: null}
        ]
    ])


    // Номер хода
    const [currentMove, setCurrentMove] = useState(0)

    // Поле по индексу
    const currentBoard = history[currentMove]

    // Текущий ход (чет - крестик, нечет - нолик)
    const currentStep = currentMove % 2 === 0



    // Определяем победителя
    const currentWinCombo = winCombinations.find(combo => { // [0, 1, 2]

            const value1 = currentBoard[combo[0]].value
            const value2 = currentBoard[combo[1]].value
            const value3 = currentBoard[combo[2]].value

            return value1 !== null && value1 === value2 && value2 === value3
        })

    const winner = currentWinCombo !== undefined

    

    function step(fieldID) {

        
        // Проверяем не закончена ли игра 
        if (winner) {
            return
        }



        // Делаем новый ход
        const newBoard = currentBoard.map(board => {
            if (board.id === fieldID && board.value === null) {

                return {...board, value: currentStep}
            }
            else return board
        })


        // Добавляем новое поле
        const sliceHistory = history.slice(0, currentMove + 1)
        const newHistory = [...sliceHistory, newBoard]

        setHistory(newHistory)
        setCurrentMove(newHistory.length - 1)
    }




    // Функция для сброса игры 
    function throwOffGame() {

        setCurrentMove(0)

    }


    // Функция для возврата на нужный ход
    function changeStep(numberStep) {

        setCurrentMove(numberStep)
    }


    return (
        <div className="tic-tac-toe">

            <h4 className="tic-tac-toe__title">
                {winner === true ? `Winner: ${currentStep === true ? ' O' : ' X'}` : (

                    `Next player: ${currentStep === true ? ' X' : ' O'}`
                )}
                  
                
                </h4>


            <div className="tic-tac-toe__container">


                <div className="tic-tac-toe__field">

                    {currentBoard.map(field => (

                        <div
                        key={field.id}
                        onClick={() => step(field.id)}
                        className='tic-tac-toe__item'
                        >
                            {field.value === true ? 'X' : field.value === false ? 'O' : ''}
                        </div>
                    ))}

                </div>

                <div className="tic-tac-toe__buttons">

                    <ol className="tic-tac-toe__ul">

                    <li>
                        <button 
                        onClick={throwOffGame}
                        className="tic-tac-toe__button">Go to game start</button>
                    </li>

                    {history.map((board, index) => (
                        <li
                        key={index}>

                        <button
                        onClick={() => changeStep(index)}
                        className="tic-tac-toe__button">Go to move #{index}</button>  

                        </li>
                    ))}



                    </ol>

                </div>


            </div>

        </div>
    )
}