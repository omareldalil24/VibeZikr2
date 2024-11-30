import React, { useState, useEffect } from 'react';
import './Talaweeh.css';

const Talaweeh = ({ onBack }) => {
  const [surahs, setSurahs] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    // تحميل أسماء السور
    fetch('https://api.alquran.cloud/v1/surah')
      .then((response) => response.json())
      .then((data) => setSurahs(data.data))
      .catch((error) => console.error('Error loading surahs:', error));

    // تحميل قائمة القراء
    fetch('https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json')
      .then((response) => response.json())
      .then((data) => setReciters(data))
      .catch((error) => console.error('Error loading reciters:', error));
  }, []);

  const handlePlayAudio = (surahNumber) => {
    if (!selectedReciter) {
      alert('من فضلك اختر قارئ أولاً.');
      return;
    }
    const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${surahNumber}.mp3`;
    setAudioSrc(audioUrl);
  };

  return (
    <div className="talaweeh-container">
      <button className="back-button" onClick={onBack} style={{backgroundColor:"#000"}}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <h1 className="title" style={{ color: 'black', marginTop: '80px' }}>تِــلَاوَةُ الْقُــرْآنِ الْكَرِيــمِ</h1>

      <div className="reciter-selection">
        <label htmlFor="reciter-select">اختر القارئ:</label>
        <select
          id="reciter-select"
          value={selectedReciter}
          onChange={(e) => setSelectedReciter(e.target.value)}
        >
          <option value="">اختر القارئ</option>
          {reciters.map((reciter) => (
            <option key={reciter.identifier} value={reciter.identifier}>
              {reciter.name} ({reciter.language})
            </option>
          ))}
        </select>
      </div>

      <div className="surah-list">
        <h2>السور:</h2>
        <ul>
          {surahs.map((surah) => (
            <li key={surah.number}>
              <span>{surah.name} ({surah.englishName})</span>
              <button onClick={() => handlePlayAudio(surah.number)}>تشغيل</button>
            </li>
          ))}
        </ul>
      </div>

      {audioSrc && (
        <div className="audio-player">
          <audio controls src={audioSrc} autoPlay>
            المتصفح لا يدعم تشغيل الصوت
          </audio>
        </div>
      )}
    </div>
  );
};

export default Talaweeh;
