import { useEffect } from "react"
import './Modal.css'


export default function Modal({isOpen, onClose, title, children}) {


    // Закрытие модалки при нажатии Escape
    useEffect(() => {
        if (!isOpen) return 

        function handleKeyDown(e) {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])


    if (isOpen === false) {
        return null
    }



    return (
        <div 
        onClick={onClose}
        className="modal">

            <div 
            onClick={(e) => e.stopPropagation()}
            className="modal__container">

                <div
                onClick={onClose} 
                className="modal__close"></div>

                <h2>{title}</h2>

                <div className="modal__text">
                    {children}
                </div>

            </div>

        </div>
    )
}