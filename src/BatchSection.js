import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

const BASE_CONTEXT_URL = 'http://localhost:3000'

export default function BatchSection() {
    const [batchStatus, setBatchStatus] = useState({ executionDate: '', lastEventId: '', deltaSize: 0 })

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
            <div className="component-holder">
                <label>Última actualización: </label>{batchStatus.executionDate}<br />
            </div>
            <div className="component-holder">
                <label>Cantidad de novedades: </label>{batchStatus.deltaSize}<br />
            </div>
            <div className="component-holder">
                <label>
                    <button onClick={requestBatchStatus}>Consultar última actualización</button>
                </label>
                <button onClick={requestBatchUpdate}>Ejecutar actualización</button>
            </div>
        </div>
    )
}
