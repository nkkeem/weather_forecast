import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Weather from "./Weather";

function App() {
    const [hello2, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/wf')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="App">
            <Weather/>
        </div>
    );
}

export default App;