import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://your-vercel-domain.vercel.app/api";

function Menganalisa() {
    const [predictions, setPredictions] = useState([]);
    const [accuracy, setAccuracy] = useState(null);

    useEffect(() => {
        // Fetch predictions
        axios
            .get(`${API_BASE_URL}/predict`)
            .then((response) => setPredictions(response.data))
            .catch((error) => console.error("Error fetching predictions:", error));

        // Fetch accuracy
        axios
            .get(`${API_BASE_URL}/accuracy`)
            .then((response) => setAccuracy(response.data.accuracy))
            .catch((error) => console.error("Error fetching accuracy:", error));
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