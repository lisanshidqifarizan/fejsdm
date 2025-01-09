import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menganalisa() {
    const [predictions, setPredictions] = useState([]);
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        // Mengambil data dari API FastAPI
        axios.get('http://127.0.0.1:8000/predict')
            .then(response => {
                // Menyimpan data prediksi ke state
                setPredictions(response.data.predictions);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });

        axios.get('http://127.0.0.1:8000/accuracy')
            .then(response => {
                setAccuracy(response.data.accuracy)
            })
    }, []);

    return (
        <div>
            <div className='p-8 bg-gradient-to-b from-[#078BFF] to-[#CFFFAF]'>
                <p className='text-[2rem] font-bold'>KANDIDAT UNIVERSITY TERBAIK</p>
                <div className='py-8'>
                    <p>Akurasi Model: {accuracy}%</p>
                    <p>
                        Sumber Dataset: <a
                            href="https://www.kaggle.com/datasets/bilalabdulmalik/top-300-asian-universities-qs-rankings-2024"
                            className="bg-blue-500 text-white underline rounded px-2"
                        >
                            kaggle.com <span class="material-symbols-outlined">
                                open_in_new
                            </span>
                        </a>
                    </p>
                </div>
            </div>
            <div className='flex w-full p-4 bg-gray-200 justify-center'>
                <div className=' items-center'>
                    <thead>
                        <tr>
                            <th className='border-t-2 border-x-2 border-black'>University Name</th>
                            <th className='border-t-2 border-black px-4'>Score</th>
                            <th className='border-t-2 border-x-2 border-black'>Succeed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((prediction, index) => (
                            <tr key={index}>
                                <td className='border-t-2 border-x-2 border-black px-4'>{prediction['University Name']}</td>
                                <td className='border-t-2 border-black text-center'>{prediction['Overall Score']}</td>
                                <td className='border-t-2 border-x-2 border-black px-4 text-center'>{prediction['Predicted Success'] === 1 ? 'Successful' : 'Not Successful'}</td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </div>
        </div>
    );
}

export default Menganalisa;