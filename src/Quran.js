import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Surah from './Surah';
import './Quran.css';

const Quran = ({ onBack }) => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('http://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const handleSurahClick = (surah) => {
    setSelectedSurah(surah);
  };

  return (
    <div className="quran-container">
      <button className="back-button" onClick={onBack} style={{ backgroundColor: "#000" }}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      {loading ? (
        <p>جاري تحميل السور...</p>
      ) : selectedSurah ? (
        <Surah surah={selectedSurah} onBack={() => setSelectedSurah(null)} />
      ) : (
        <div className="surah-list">
          <h2 style={{ color: 'black', marginTop: '80px' }}>سُـــورُ الْقُـــرْآنِ الْكَرِيـــمِ</h2>
          <div className="surah-boxes">
            {surahs.map((surah) => (
              <div key={surah.id} className="surah-box" onClick={() => handleSurahClick(surah)}>
                {surah.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quran;
