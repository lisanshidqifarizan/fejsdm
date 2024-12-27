import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://bepydm-production.up.railway.app/";

function Menganalisa() {
    const [predictions, setPredictions] = useState([]);
    const [accuracy, setAccuracy] = useState(null);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/predict`);
                setPredictions(response.data);
            } catch (error) {
                console.error("Error fetching predictions:", error);
            }
        };

        const fetchAccuracy = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/accuracy`);
                setAccuracy(response.data.accuracy);
            } catch (error) {
                console.error("Error fetching accuracy:", error);
            }
        };

        fetchPredictions();
        fetchAccuracy();
    }, []);

    return (
        <div className="App">
            <h1>University Success Predictor</h1>
            {accuracy && <p>Model Accuracy: {accuracy}</p>}

            <table border="1">
                <thead>
                    <tr>
                        <th>University Name</th>
                        <th>Overall Score</th>
                        <th>Predicted Success</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((pred, index) => (
                        <tr key={index}>
                            <td>{pred["University Name"]}</td>
                            <td>{pred["Overall Score"]}</td>
                            <td>{pred["Predicted Success"] === 1 ? "Successful" : "Not Successful"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Menganalisa;