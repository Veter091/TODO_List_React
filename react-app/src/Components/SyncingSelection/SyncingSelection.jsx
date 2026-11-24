import { useState } from 'react'
import './SyncingSelection.css'

export default function MainComponent() {

    const [color, setColor] = useState('')

    function changeColor(selectColor) {
        setColor(selectColor)
    }


    return (
        <>
        <ColorSelector value={color} onChangeColor={changeColor}/>

        <PreviewBox colorBox={color}/>
        </>
    )
}


function ColorSelector({value, onChangeColor}) {

    return (
            <select
            value={value}
            onChange={(e) => onChangeColor(e.target.value)}
            className='main-select'>
                <option value="">Выберете цвет...</option>
                <option value="yellow">yellow</option>
                <option value="green">green</option>
                <option value="blue">blue</option>
                <option value="black">black</option>
            </select>
    )
}



function PreviewBox({colorBox}) {


    return (
            <div className={`block-color ${colorBox}`}></div>
    )
}
