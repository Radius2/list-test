import './App.css';
import React, {useState, useEffect} from 'react'
import List from './components/List/List';
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';
import {list} from './data/list.json'

function getArrayData(obj) {
    return Object.keys(obj).map((key, index) => ({...obj[key], key, index}))
}

function filterFunction(soursArr, searchValue) {
    const filter = new RegExp(searchValue, 'gi')
    return soursArr.filter(el => filter.test(el.firstName) || filter.test(el.lastName) || filter.test(el.patronymic))
}

const PAGE_SIZE = 1

function App() {
    const [data, setData] = useState(getArrayData(list))
    const [filteredData, setFilteredData] = useState([...data])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageData, setPageData] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setFilteredData(filterFunction(data, searchInput))
    }, [searchInput])

    useEffect(() => {
        const newTotalPages = Math.ceil(filteredData.length / PAGE_SIZE)
        setTotalPages(newTotalPages)
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages || 1)
    }, [filteredData])

    useEffect(() => {
        setPageData(filteredData.slice((currentPage - 1) * PAGE_SIZE, PAGE_SIZE * currentPage))
    }, [currentPage, filteredData])

    function changeStatus(index, newStatus) {
        setData(prev => {
            const newState = [...prev]
            newState[index].status = newStatus
            return newState
        })
    }

    return (
        <div className='root'>
            <Search value={searchInput} onChange={setSearchInput}/>
            <List data={pageData} onStatusChange={changeStatus} firstIndex={(currentPage - 1) * PAGE_SIZE}/>
            <Pagination totalPages={totalPages} currentPage={currentPage}
                        onPageChange={setCurrentPage}/>
        </div>
    );
}

export default App;
