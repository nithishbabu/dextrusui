import '../css/login.css';
import React,{ useState } from 'react';
import { ToastContainer ,toast} from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function Login(){

    const navigate = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'withCredentials': true
    };

    const [data, setData] = useState({
        username: '',
        password: '',
        url: ''
    });
    const databody = JSON.stringify(data);

    const handleChange = event => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => 
    {
        event.preventDefault();
       

        axios.post('http://localhost:8080/task/connect', databody,{ headers: headers, cache: false })
            .then(response => {
                console.log(response.data);
                navigate("/home", { state: data })
            })
            .catch(error => {
                toast.error("Error: Connection to Server!", {
                    position: toast.POSITION.TOP_CENTER
                })
                console.error(error);
            });
    };
    return(
        <div>
        <form className="main-cntr" onSubmit={handleSubmit}>   
        <div className="sub-cntr">
            <div className="top">
                
                <input type="text" placeholder="Enter UserName" name="username" className="input-type" onChange={handleChange}/>
                <input type="password" placeholder="Enter password" name="password" className="input-type" onChange={handleChange}/>
            </div>
            <div className="middle">
                <input type="text" placeholder=" Enter Server Name" name="url" className="middle-input" onChange={handleChange}/>
            </div>
            <div className="bottom">
                <button type="submit" className="submit-btn">Login</button>
            </div>
        </div>
    </form>
    <ToastContainer/>
    </div>
    )
}export default Login;