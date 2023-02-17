import React from 'react'
import axios from "axios";
import { useState } from "react";
import '../css/schemas.css'
import Tables from './Tables';
import Views from './Views';

export default function Schemas(props) {
    debugger;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'withCredentials': true
    };
    const [schemas, setSchemas] = useState([]);
    const reqBody = props.body;
    const selectedCatalog = props.schemas;

    if (schemas.length === 0) {
        const url = "http://localhost:8080/dextrus/" + selectedCatalog;
        axios.post(url, reqBody, { headers: headers, cache: false })
            .then(resp => {
                setSchemas(resp.data)
                console.log(resp.data)
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const [expandedSchema, setExpandedSchema] = useState(null);
    const toggleExpand = (schema) => {
        setExpandedSchema(prevTopic => prevTopic === schema ? null : schema);
    };

    const [showTables, setShowTables] = useState(false);

    const handleTablesButton = () => {
        setShowTables(!showTables);
    };
    const [showViews, setShowViews] = useState(false);

    const handleViewsButton = () => {
        setShowViews(!showViews);
    };

    return (
        <div className="schemas-list" >
            {schemas.map(schema => (
                <div key={schema}>
                    <button className="schema-button" onClick={() => toggleExpand(schema)}>
                        {schema}
                    </button>
                    {expandedSchema === schema && (
                        <div className='tables-views-buttons'>
                            <button onClick={() => handleTablesButton()}>Tables</button>
                            {
                                showTables && <Tables body={reqBody} headers={headers} catalog={selectedCatalog} schema={schema} />
                            }
                            <button onClick={() => handleViewsButton()}>Views</button>
                            {
                                showViews && <Views body={reqBody} headers={headers} catalog={selectedCatalog} schema={schema} />
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}