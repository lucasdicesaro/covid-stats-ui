import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

const BASE_CONTEXT_URL = 'http://localhost:3000'

export default function BatchSection() {
    const [batchStatus, setBatchStatus] = useState({executionDate: '', lastEventId: '', deltaSize: 0})

    const requestBatchStatus = () => {

        Axios.get(BASE_CONTEXT_URL + '/covid/update')
            .then((response) => { setBatchStatus(response.data) })
            .catch((error) => { console.log(error.message) })
    }

    const requestBatchUpdate = () => {

        Axios.post(BASE_CONTEXT_URL + '/covid/update')
            .then((response) => { console.log(response.data) })
            .catch((error) => { console.log(error.message) })
    }


    return (
        <div>
            <label>Última actualización: </label>{batchStatus.executionDate}<br />
            <label>Cantidad de novedades: </label>{batchStatus.deltaSize}<br />
            <button onClick={requestBatchStatus}>Consultar última actualización</button>        
            <button onClick={requestBatchUpdate}>Ejecutar actualización</button>        
        </div>
    )
}
