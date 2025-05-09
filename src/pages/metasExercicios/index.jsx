import React, { useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

function MetasDiarias() {

      const navigate = useNavigate();
    
      const irParaAgenda = () => {
        navigate('/agenda');
      };
    
      const irParaAlarme = () => {
        navigate('/alarme');
      };    

      const footerItems = [
        { icon: "🏠", path: "/" },
        { icon: "📅", path: "/agenda" },
        { icon: "📋", path: "/alarme" },
        { icon: "🖊️", path: "/metas" },
        { icon: "⚙️", path: "/configuracoes" },
        ];

  const [metas, setMetas] = useState([
    { texto: 'Tenha 08h00 de sono', progresso: 100 },
    { texto: 'Caminhe por 10 minutos', progresso: 30 }
  ]);

  const [exercicios, setExercicios] = useState([
    { texto: 'Caminhar por 10 minutos', feito: true },
    { texto: 'Ficar 1 dia sem fumar cigarro.', feito: true }
  ]);

  const [novaMeta, setNovaMeta] = useState('');
  const [novoExercicio, setNovoExercicio] = useState('');
  const [showMetaPopup, setShowMetaPopup] = useState(false);
  const [showExercicioPopup, setShowExercicioPopup] = useState(false);

  const handleAddMeta = () => {
    if (novaMeta.trim() !== '') {
      setMetas([...metas, { texto: novaMeta, progresso: 0 }]);
      setNovaMeta('');
      setShowMetaPopup(false);
    }
  };

  const handleAddExercicio = () => {
    if (novoExercicio.trim() !== '') {
      setExercicios([...exercicios, { texto: novoExercicio, feito: false }]);
      setNovoExercicio('');
      setShowExercicioPopup(false);
    }
  };

  return (
    <div className="app">
      <div className="page">
        <header className="header">
          <h1>Metas diárias</h1>
          <button className="check-btn">✔️</button>
        </header>

        <div className="metas-list">
          {metas.map((meta, index) => (
            <div className="meta-item" key={index}>
              <div className="meta-text">{meta.texto}</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${meta.progresso}%` }}
                />
              </div>
            </div>
          ))}
          <button onClick={() => setShowMetaPopup(true)} className="add-button">+</button>
        </div>

        {showMetaPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Nova Meta</h2>
              <input
                type="text"
                placeholder="Digite a meta"
                value={novaMeta}
                onChange={e => setNovaMeta(e.target.value)}
              />
              <button onClick={handleAddMeta}>Adicionar</button>
            </div>
          </div>
        )}

        <footer className="footer">
          {['🏠', '📅', '📋', '🖊️', '⚙️'].map((icon, idx) => (
            <button key={idx} className="footer-icon">
              {icon}
            </button>
          ))}
        </footer>
      </div>

      <div className="page">
        <header className="header">
          <h1>Exercícios diários</h1>
          <button className="check-btn">✔️</button>
        </header>

        <div className="exercise-list">
          {exercicios.map((ex, idx) => (
            <label key={idx} className="exercise-item">
              <input type="checkbox" checked={ex.feito} readOnly /> {ex.texto}
            </label>
          ))}
          <button onClick={() => setShowExercicioPopup(true)} className="add-button">+</button>
        </div>

        {showExercicioPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Novo Exercício</h2>
              <input
                type="text"
                placeholder="Digite o exercício"
                value={novoExercicio}
                onChange={e => setNovoExercicio(e.target.value)}
              />
              <button onClick={handleAddExercicio}>Adicionar</button>
            </div>
          </div>
        )}

        <footer className="footer">
            {footerItems.map((item, idx) => (
                <button
                key={idx}
                className="footer-icon"
                onClick={() => navigate(item.path)}
                >
                {item.icon}
                </button>
            ))}
        </footer>

      </div>
    </div>
  );
}

export default MetasDiarias;