import './App.css';
import { useState, useRef, useEffect } from 'react'
import Axios from 'axios'

const BASE_CONTEXT_URL = 'http://localhost:3000'

function App() {
    const [totalCount, setTotalCount] = useState('')
    const [deceaseCount, setDeceaseCount] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const ageFromRef = useRef()
    const ageToRef = useRef()

    useEffect(() => {
        requestCounts()
    }, [])

    const requestCounts = () => {

        const params = {
            ageFrom: ageFromRef.current.value,
            ageTo: ageToRef.current.value
        }

        Axios.all([
            Axios.get(BASE_CONTEXT_URL + '/covid/total', { params }),
            Axios.get(BASE_CONTEXT_URL + '/covid/deaths', { params })
        ]).then(Axios.spread((...responses) => {

            setTotalCount(responses[0].data)
            setDeceaseCount(responses[1].data)

        })).catch((error) => { setErrorMessage(error.message) })

    }

    return (<div className="App">
        <h3 className="">Filtros</h3>
        <div className="filterForm">
            <label>Edad Desde</label>
            <input ref={ageFromRef} type="text" ></input>

            <label>Edad Hasta</label>
            <input ref={ageToRef} type="text" ></input>

            <button onClick={requestCounts}>Consultar Totales</button>
            <label>Total</label>{totalCount}
            <label>Fallecidos</label>{deceaseCount}
            <br />{errorMessage}
        </div>
    </div>);
}

export default App;
