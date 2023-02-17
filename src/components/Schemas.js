import React from 'react'
import axios from "axios";
import { useState } from "react";
import '../css/styles.css'
import Tables from '../components/Tables';
import Views from '../components/Views';



export default function Schemas(props) {
    
    const [schemas, setSchemas] = useState([]);
    const reqBody = props.body;
    const selectedCatalog = props.schemas;

    if (schemas.length === 0) {
        const url = "http://localhost:8080/task/" +selectedCatalog;
        axios.post(url, reqBody, { cache: false })
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
        <>
            <div className="schemas-list" >
                {schemas.map(schema => (
                    <div key={schema}>
                        <div className="schema-button" onClick={() => toggleExpand(schema)}>
                        <i class="bi bi-database-fill-up"></i>  {schema}
                        </div>
                        {expandedSchema === schema && (
                            <div className='tables-views-buttons'>
                                <div onClick={() => handleTablesButton()}>Tables</div>
                                {
                                    showTables && <Tables body={reqBody}  catalog={selectedCatalog} schema={schema} />
                                }
                                <div onClick={() => handleViewsButton()}>Views</div>
                                {
                                    showViews && <Views body={reqBody}  catalog={selectedCatalog} schema={schema} />
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}