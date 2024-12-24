import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menganalisa() {
    const [predictions, setPredictions] = useState([]);
    const [accuracy, setAccuracy] = useState(null); // State untuk menyimpan accuracy

    useEffect(() => {
        // Mengambil data prediksi dari API FastAPI
        axios.get('http://127.0.0.1:8000/predict')
            .then(response => {
                // Menyimpan data prediksi ke state
                setPredictions(response.data.predictions);
            })
            .catch(error => {
                console.error('There was an error fetching the predictions!', error);
            });

        // Mengambil accuracy dari API FastAPI
        axios.get('http://127.0.0.1:8000/accuracy')
            .then(response => {
                // Menyimpan nilai akurasi ke state
                setAccuracy(response.data.accuracy);
            })
            .catch(error => {
                console.error('There was an error fetching the accuracy!', error);
            });
    }, []);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="w-full flex flex-col gap-4 p-10 pb-20 bg-gradient-to-b from-[#078BFF] to-[#CFFFAF]">
                <h1>KANDIDAT UNIVERSITAS TERBAIK</h1>
                <div>
                    {/* Menampilkan nilai accuracy */}
                    {accuracy && (
                        <p>
                            <strong>Akurasi Model:</strong> {accuracy}
                        </p>
                    )}
                    <p><strong>Sumber Dataset:</strong> <a
                        className='hover:text-white underline p-[5px] rounded-xl bg-sky-500'
                        href='https://www.kaggle.com/datasets/bilalabdulmalik/top-300-asian-universities-qs-rankings-2024'
                        rel='noopener noreferrer'
                        target='_blank'>
                        go to the link
                    </a>
                    </p>
                </div>
            </div>

            {/* Menampilkan tabel prediksi */}
            <div>
                <p className="absolute xxs:top-[288px] xs:top-[240px] s:top-[192px] bg-[#FDFFF3] w-fit p-2 px-4 xxs:rounded-tr-lg normal:rounded-t-lg font-bold">Results</p>
                <div className='p-4 bg-[#FDFFF3]'>
                    <table border="1" className="bg-[#FDFFF3] border-solid border-2 rounded-sm border-black">
                        <thead>
                            <tr>
                                <th>University Name</th>
                                <th>Overall Score</th>
                                <th>Predicted Success</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predictions.map((prediction, index) => (
                                <tr key={index}>
                                    <td>{prediction['University Name']}</td>
                                    <td className='text-center'>{prediction['Overall Score']}</td>
                                    <td className='text-center'>{prediction['Predicted Success'] === 1 ? 'Successful' : 'Not Successful'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Menganalisa;
