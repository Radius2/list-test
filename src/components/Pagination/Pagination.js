import React from 'react'
import './Pagination.css'

function PageButton({title, onClick, active}) {
    return <button className={`button-size button ${active ? 'active' : ''}`} onClick={onClick}>{title}</button>
}

function Gap() {
    return <span className='button-size'>...</span>
}

const setButton = [1, 2, 3, 4, 5, 6, 7]

function GetButton({positionOfButton, currentPage, totalPages, onClickHandler}) {
    if (totalPages <= 7) return <PageButton active={positionOfButton === currentPage} title={positionOfButton}
                                            onClick={() => onClickHandler(positionOfButton)}/>

    if (currentPage < 5 && positionOfButton <= 5) {
        return <PageButton active={positionOfButton === currentPage}
                           title={positionOfButton}
                           onClick={() => onClickHandler(positionOfButton)}/>
    }

    if (currentPage > (totalPages - 4) && positionOfButton > 2) {
        return <PageButton active={totalPages - 7 + positionOfButton === currentPage}
                           title={totalPages - 7 + positionOfButton}
                           onClick={() => onClickHandler(totalPages - 7 + positionOfButton)}/>
    }

    if (positionOfButton === 1) return <PageButton title={1} onClick={() => onClickHandler(1)}/>
    if (positionOfButton === 2) return <Gap/>
    if (positionOfButton === 3) return <PageButton title={currentPage - 1}
                                                   onClick={() => onClickHandler(currentPage - 1)}/>
    if (positionOfButton === 4) return <PageButton active title={currentPage}
                                                   onClick={() => onClickHandler(currentPage)}/>
    if (positionOfButton === 5) return <PageButton title={currentPage + 1}
                                                   onClick={() => onClickHandler(currentPage + 1)}/>
    if (positionOfButton === 6) return <Gap/>
    if (positionOfButton === 7) return <PageButton title={totalPages} onClick={() => onClickHandler(totalPages)}/>
}

export default function Pagination({currentPage, totalPages, onPageChange}) {
    return (
        <div className='pagination_container'>
            {setButton.map(position => (position <= totalPages &&
                <GetButton key={position}
                           onClickHandler={onPageChange}
                           currentPage={currentPage}
                           totalPages={totalPages}
                           positionOfButton={position}/>))}
        </div>)
}