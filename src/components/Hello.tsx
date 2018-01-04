import * as React from 'react'
import './Hello.css'

export interface Props {
    name: string
    enthusiasmLevel?: number
    onIncrement?: () => void
    onDecrement?: () => void
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement } : Props) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D')
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + GetExclamationMarks(enthusiasmLevel)}
            </div>
            <div>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        </div>
    )
}

export default Hello

// helper functions

function GetExclamationMarks(numberOfChars: number) {
    return Array(numberOfChars + 1).join('!')
}