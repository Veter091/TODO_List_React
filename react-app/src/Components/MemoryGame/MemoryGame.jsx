import { useState } from "react";
import './MemoryGame.css'

export default function MemoryGame({images}) {


    // Перемешиваем массив карт один раз при рендере
    const [cards, setCards] = useState(() => {
        // Дублируем карточки
        const fullImages = [...images, ...images]
        // Рандомим карточки
        const initialCards = fullImages.sort(() => Math.random() - 0.5)
        return initialCards.map((item, index) => (
            {
                id: index, 
                url: item,
                flipped: false,
            }))

    })

    const [firstCard, setFirstCard] = useState(null)
    const [lockedCard, setLockedCard] = useState(false)

    function openCard(cardUD) {

        if (lockedCard === true) {
            return 
        }

        // Находим карточку
        const currentCard = cards.find(card => card.id === cardUD)

        // Выходим, если она уже открыта 
        if (currentCard.flipped === true) return

        // Открываем карточку
        setCards(cards.map(card => {
            if (card.id === cardUD) {
                return {...card, flipped: true,}
            }
            else return card
        }))


        // Если первая карточка
        if (firstCard === null) {
            setFirstCard(currentCard)
        }
        else {

            // Если две одинаковые
            if (currentCard.url === firstCard.url) {
                setFirstCard(null)
            }

            // Если не совпали
            else {
                setLockedCard(true)

                setTimeout(() => {
                    setCards(prevCards => prevCards.map(card => {
                        if (card.id === currentCard.id || card.id === firstCard.id) {
                            return {...card, flipped: false}
                        }
                        else return card
                    }))

                    setFirstCard(null)
                    setLockedCard(false)
                }, 1000)
            }
        }

    }



    return (
        <div className="memory-game">

            <div className="memory-game__container">

                <div className="memory-game__title">Memory Game</div>

                <div className="memory-game__body">

                    {cards.map(card => (
                        <div
                        onClick={() => {
                            openCard(card.id)
                        }}
                        key={card.id}
                        className="memory-game__item">
                            <img
                            src={card.flipped === true
                                ? card.url
                                : null
                            }
                            className="memory-game__pic"
                            />
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}