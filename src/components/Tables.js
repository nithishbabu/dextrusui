import React, { useState } from 'react'
import axios from "axios";
import '../css/styles.css'
import Columns from './Columns.js';

export default function Tables(props) {
    const url = "http://localhost:8080/task/" + props.catalog + "/" + props.schema;
    const [tables, setTables] = useState([]);

    if (tables.length === 0) {
        axios.post(url, props.body, { headers: props.headers, cache: false })
            .then(resp => {
                if (resp.data.length !== 0) {
                    const tableNames = resp.data
                        .filter(table => table.table_type === 'BASE TABLE')
                        .map(table => table.table_name);
                    setTables(tableNames);
                }
                else {
                    console.log("no tables")
                    alert("No tables in selected Catalog/Schema")
                }
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const [expandedTable, setExpandedTable] = useState(null);
    const toggleExpand = (table) => {
        setExpandedTable(prevTable => prevTable === table ? null : table);
    }


    return (
        <div >
            {tables.map(table => (
                <div key={table} className='tables-list'>
                    <div style={{ border: "none" }} className='tables-button' onClick={() => toggleExpand(table)}>
                        <i className="bi bi-table" style={{color:"#0d6efd",paddingRight:"5px"}}></i>{table}
                    </div>
                    {
                        expandedTable === table && (
                            <Columns body={props.body} headers={props.headers} url={url} table={table} />
                        )
                    }
                </div>
            ))}
        </div>
    )
}