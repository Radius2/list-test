import React from 'react'
import './Search.css'

export default function Search({value, onChange}) {
    return (
        <>
            <div className='search-container'>
                <p>Поиск:</p>
                <input value={value} onChange={e => onChange(e.target.value)}/>
            </div>
            <hr className='solid'/>
        </>
    )
}