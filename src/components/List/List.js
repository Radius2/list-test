import React from 'react'
import {status} from '../../data/status.json';
import './List.css'

function Row({index, person, onStatusChange}) {
    return (
        <li className='row'>
            <span>{index + 1}.</span>
            <span>{`${person.lastName} ${person.firstName} ${person.patronymic}`}</span>
            <select value={person.status} onChange={(e) => onStatusChange(e.target.value)}>
                {status.map(el => <option key={el.code} value={el.code}>{el.statusText}</option>)}
            </select>
        </li>
    )
}

export default function List({data, onStatusChange, firstIndex}) {
    return (
        <ul className='list'>
            {data?.length ?
                data.map((person, index) => (
                    <Row key={person.key}
                         index={index + firstIndex}
                         person={person}
                         onStatusChange={(val) => onStatusChange(person.index, val)}/>
                ))
                : <p align='center'>Упс... Данные не найдены</p>
            }
        </ul>
    )
}