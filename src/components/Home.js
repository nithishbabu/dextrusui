import axios from "axios";
import React, { useState } from "react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { useLocation } from "react-router-dom";
import Schemas from "../components/Schemas";
import '../css/styles.css'

const Home = () => {
    const location = useLocation();
    const reqBody = location.state;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'withCredentials': true
    };
    const [catalogs, setCatalogs] = useState([]);
    const [expandedCatalog, setExpandedCatalog] = useState(null);
    const buttonHandle = () =>{
        if (catalogs.length === 0) {
            axios.post("http://localhost:8080/task/catalogs", reqBody, { headers: headers, cache: false })
                .then(resp => {
                    setCatalogs(resp.data)
                    console.log(resp.data)
                }).catch(error => {
                    console.log("catch")
                    console.log(error)
                });
        }
    }
    
    const toggleExpand = (catalog) => {
        setExpandedCatalog(prevTopic => prevTopic === catalog ? null : catalog);
    };
    return (
        <>
            <div className="border">
              
                <div className="left-nav">
                    <div className="catalogs-list" >
                        <div style={{cursor:"pointer"}} onClick={buttonHandle}><i class="bi bi-journal" ></i>Catalogs</div>
                        {catalogs.map(catalog => (
                            <div key={catalog}>
                                <div className="catalog-button" onClick={() => toggleExpand(catalog)}>
                                <i class="bi bi-database" style={{color:"#0d6efd"}}></i>{catalog}
                                </div>
                                {expandedCatalog === catalog && (
                                    <Schemas body={reqBody} schemas={catalog} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
}
export default Home;













