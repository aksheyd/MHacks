// ResponseInterface.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './response.css'; // Import CSS file for styling

const ResponseInterface = (props) => {
    console.log(props);
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await axios.get('http://127.0.0.1:5000/generate', { withCredentials: true }); // Fetch response data from the backend API
        //         console.log(response.data);
        //         setResponseData(response.data);
        //         setLoading(false);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //         setLoading(false);
        //     }
        // };

        // fetchData();

        return () => {
            // Cleanup function
        };
    }, []);

    return (
        <div className="response-interface-container">
            <h2>Response Interface</h2>
            {props.generationInProgress ? (
                <div className="loader"></div> // Display loading spinner
            ) : (
                <div>
                    {/* <p>Response from the backend API:</p> */}
                    <p>{props.generationData.message}</p>
                </div>
            )}
        </div>
    );
};

export default ResponseInterface;
