import React, { useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

function AlarmeApp() {

    const navigate = useNavigate();
  
    const irParaAgenda = () => {
      navigate('/agenda');
    };
  
    const irParaMetas = () => {
      navigate('/metas');
    };  

      const footerItems = [
  { icon: "🏠", path: "/" },
  { icon: "📅", path: "/agenda" },
  { icon: "📋", path: "/alarme" },
  { icon: "🖊️", path: "/metas" },
  { icon: "⚙️", path: "/configuracoes" },
];

  const [medications, setMedications] = useState([
    { name: 'Atenodol', time: '06h00 da Manhã', dosage: '2 Comprimidos 50mg', routine: 'Todos os dias', active: true },
    { name: 'Glifage', time: '10h00 da Manhã', dosage: '', routine: '', active: true },
    { name: 'Metformina', time: '13h00 da Tarde', dosage: '', routine: '', active: true },
  ]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const [newMed, setNewMed] = useState({ name: '', dosage: '', days: [], time: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleToggle = index => {
    const updated = [...medications];
    updated[index].active = !updated[index].active;
    setMedications(updated);
  };

  const handleDayToggle = (day) => {
    setNewMed(prev => {
      const updatedDays = prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day];
      return { ...prev, days: updatedDays };
    });
  };

  const handleAddMedication = () => {
    if (newMed.name && newMed.dosage && newMed.days.length > 0 && newMed.time) {
      const routine = `Dias: ${newMed.days.join(', ')}`;
      const time = newMed.time;
      setMedications([...medications, { ...newMed, routine, time, active: true }]);
      setNewMed({ name: '', dosage: '', days: [], time: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Alarme Medicamentos</h1>
      </header>
      <div className="med-list">
          {medications.map((med, index) => (
  <div key={index} className="med-item">
    <div
      className="med-title"
      onClick={() =>
        setExpandedIndex(expandedIndex === index ? null : index)
      }
      style={{ cursor: 'pointer' }}
    >
      {med.name} - {med.time}
    </div>
    <label className="switch">
      <input
        type="checkbox"
        checked={med.active}
        onChange={() => handleToggle(index)}
      />
      <span className="slider" />
    </label>
    {expandedIndex === index && med.dosage && (
      <div className="med-details">
        <p><strong>{med.name}</strong></p>
        <p>{med.routine}</p>
        <p>{med.dosage}</p>
      </div>
    )}
  </div>
))}
      </div>
      <div className="add-button-container">
        <button className="add-button" onClick={() => setShowAddForm(true)}>+</button>
      </div>
      {showAddForm && (
        <div className="add-med fade-in">
          <h2>Adicionar Novo</h2>
          <input type="text" placeholder="Nome do remédio" value={newMed.name} onChange={e => setNewMed({ ...newMed, name: e.target.value })} />
          <input type="text" placeholder="Dosagem" value={newMed.dosage} onChange={e => setNewMed({ ...newMed, dosage: e.target.value })} />
          <div className="days-selector">
            {daysOfWeek.map(day => (
              <button
                type="button"
                key={day}
                className={`day-button ${newMed.days.includes(day) ? 'selected' : ''}`}
                onClick={() => handleDayToggle(day)}
              >
                {day}
              </button>
            ))}
          </div>
          <input type="time" value={newMed.time} onChange={e => setNewMed({ ...newMed, time: e.target.value })} />
          <button onClick={handleAddMedication}>Adicionar</button>
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
  );
}

export default AlarmeApp;
