// src/Surah.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Surah.css';

const Surah = ({ surah, onBack }) => {
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVerses = async () => {
            try {
                if (surah.number === 1) {
                    // نصوص سورة الفاتحة يدويًا
                    const manualVerses = [
                        { number: 1, text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ' },
                        { number: 2, text: 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَـٰلَمِینَ' },
                        { number: 3, text: 'ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ' },
                        { number: 4, text: 'مَـٰلِكِ یَوۡمِ ٱلدِّینِ' },
                        { number: 5, text: 'إِیَّاكَ نَعۡبُدُ وَإِیَّاكَ نَسۡتَعِینُ' },
                        { number: 6, text: 'ٱهۡدِنَا ٱلصِّرَ ٰ⁠طَ ٱلۡمُسۡتَقِیمَ' },
                        { number: 7, text: 'صِرَ ٰ⁠طَ ٱلَّذِینَ أَنۡعَمۡتَ عَلَیۡهِمۡ غَیۡرِ ٱلۡمَغۡضُوبِ عَلَیۡهِمۡ وَلَا ٱلضَّاۤلِّینَ' },
                    ];
                    setVerses(manualVerses);
                } else {
                    const response = await axios.get(`http://api.alquran.cloud/v1/surah/${surah.number}`);
                    const fetchedVerses = response.data.data.ayahs.map((verse) => {
                        return {
                            ...verse,
                            text: verse.text.replace(/^بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ\s*/, '')
                        };
                    });
                    setVerses(fetchedVerses);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching verses: ", error);
                setLoading(false);
            }
        };

        fetchVerses();
    }, [surah.number]);


    return (
        <div className="surah-container">
            <button className="back-button" onClick={onBack}><i className="fa-solid fa-arrow-right"></i></button>
            <h2>{surah.name}</h2>
            <p className="bismillah-text">بِسۡـــمِ ٱللَّـــهِ ٱلرَّحۡمَـٰـــــنِ ٱلرَّحِیـــــمِ</p>
            {loading ? (
                <p>جاري تحميل الآيات...</p>
            ) : (
                <div className="verses-container">
                    <p className="verses-text">
                        {verses.map((verse, index) => (
                            <span key={verse.number}>
                                {verse.text} <span className="verse-number">({index + 1})</span>{" "}
                            </span>
                        ))}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Surah;
