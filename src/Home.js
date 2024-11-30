import React from 'react';
import './Home.css';

const Home = ({ goToQuran, goToAdhkar, goToTalaweeh, goToLive }) => {
  return (
    <div className="home-container">
      {/* إضافة الشعار */}
      <img 
        src="/images/logo.png" 
        alt="Logo" 
        className="home-logo"
      />
      <h1 className="home-title">مرحبًا بكم في VibeZikr</h1>
      <nav className="home-nav">
        <ul>
          <li onClick={goToQuran} className="nav-item">
            <img src="/images/moshaf.svg" alt="Quran" className="nav-icon" />
            القـــــرءان الكريــــــم
          </li>
          <li onClick={goToAdhkar} className="nav-item">
            <img src="/images/Azkar.svg" alt="Azkar" className="nav-icon" />
            الأذكــــــــــــــــــــــــــــار
          </li>
          <li onClick={goToTalaweeh} className="nav-item">
            <img src="/images/sound.svg" alt="Talaweeh" className="nav-icon" />
            تلاوة القرءان الكريم
          </li>
          <li onClick={goToLive} className="nav-item">
            <img src="/images/live.svg" alt="Live" className="nav-icon" />
            البـــــــث المبــــاشـــــر 
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
