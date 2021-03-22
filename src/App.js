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

        const promise1 = Axios.get(BASE_CONTEXT_URL + '/covid/total', { params });
        const promise2 = Axios.get(BASE_CONTEXT_URL + '/covid/deaths', { params });

        Promise.all([promise1, promise2]).then(function(responses) {
            setTotalCount(responses[0].data)
            setDeceaseCount(responses[1].data)
        }).catch((error) => { console.log(error.message) });

    }

    return (<div className="App">
        <div>
            <h1>Covid stats UI</h1>
        </div>
        <div className="filterForm container">
            <div>
                <h2>Filtros</h2>
            </div>
            <div className="component-holder">
                <label>Fecha Desde</label>
                <input ref={symptomDateFromRef} type="text" ></input>
            </div>

            <div className="component-holder">
                <label>Fecha Hasta</label>
                <input ref={symptomDateToRef} type="text" ></input>
            </div>

            <div className="component-holder">
                <label>Edad Desde</label>
                <input ref={ageFromRef} type="text" ></input>
            </div>

            <div className="component-holder">
                <label>Edad Hasta</label>
                <input ref={ageToRef} type="text" ></input>
            </div>

            <div className="component-holder">
                <label>Género</label>
                <input ref={genreRef} type="text" ></input>
            </div>

            <div className="component-holder">
                <label>Provincia</label>
                <input ref={stateRef} type="text" ></input>
            </div>

            <button onClick={requestCounts}>Consultar Totales</button>
            <div className="component-holder">
                <label>Total: </label>{totalCount}
            </div>

            <div className="component-holder">
                <label>Fallecidos: </label>{deceaseCount}
            </div>

            <BatchSection />

        </div>
    </div>);
}

export default App;
