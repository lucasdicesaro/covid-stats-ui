import './App.css';
import { useState, useRef, useEffect } from 'react'
import Axios from 'axios'
import BatchSection from './BatchSection';

const BASE_CONTEXT_URL = 'http://localhost:3000'

function App() {
    const [totalCount, setTotalCount] = useState('')
    const [deceaseCount, setDeceaseCount] = useState('')
    const symptomDateFromRef = useRef()
    const symptomDateToRef = useRef()
    const ageFromRef = useRef()
    const ageToRef = useRef()
    const genreRef = useRef()
    const stateRef = useRef()

    useEffect(() => {
        requestCounts()
    }, [])

    const requestCounts = () => {

        const params = {
            symptomDateFrom: symptomDateFromRef.current.value,
            symptomDateTo: symptomDateToRef.current.value,
            ageFrom: ageFromRef.current.value,
            ageTo: ageToRef.current.value,
            genre: genreRef.current.value,
            state: stateRef.current.value
        }

        Axios.all([
            Axios.get(BASE_CONTEXT_URL + '/covid/total', { params }),
            Axios.get(BASE_CONTEXT_URL + '/covid/deaths', { params })
        ]).then(Axios.spread((...responses) => {

            setTotalCount(responses[0].data)
            setDeceaseCount(responses[1].data)

        })).catch((error) => { console.log(error.message) })

    }

    return (<div className="App">
        <h3 className="">Filtros</h3>
        <div className="filterForm">
            <label>Fecha Desde</label>
            <input ref={symptomDateFromRef} type="text" ></input>

            <label>Fecha Hasta</label>
            <input ref={symptomDateToRef} type="text" ></input>

            <label>Edad Desde</label>
            <input ref={ageFromRef} type="text" ></input>

            <label>Edad Hasta</label>
            <input ref={ageToRef} type="text" ></input>

            <label>Género</label>
            <input ref={genreRef} type="text" ></input>

            <label>Provincia</label>
            <input ref={stateRef} type="text" ></input>

            <button onClick={requestCounts}>Consultar Totales</button>
            <label>Total: </label>{totalCount}
            <label>Fallecidos: </label>{deceaseCount}

            <BatchSection />

        </div>
    </div>);
}

export default App;
