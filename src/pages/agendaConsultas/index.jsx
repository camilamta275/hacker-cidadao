import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const CalendarApp = () => {
  
  const navigate = useNavigate();

  const irParaAlarme = () => {
    navigate('/alarme');
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


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(4);
  const [selectedYear, setSelectedYear] = useState(2025);

  const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

   const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
    };


  const events = {
    "2025-05-01": {
      title: "Consulta realizada",
      time: "09:30h",
      doctor: "Dr. Augusto Silva",
      status: "realizada",
    },
    "2025-05-13": {
      title: "Consulta Perdida",
      time: "09:30h",
      doctor: "Dra. Juliana Andrade",
      status: "perdida",
    },
    "2025-05-23": {
      title: "Próxima Consulta",
      time: "15:30h",
      doctor: "Dr. Marcelo Aragão",
      status: "proxima",
    },
  };

  const renderEventDetails = () => {
    if (!selectedDate || !events[selectedDate]) return null;

    const event = events[selectedDate];
    return (
      <div className={`event-box ${event.status}`}>
        <p className="title">{event.title}</p>
        <p>Horário: {event.time}</p>
        <p>Profissional: {event.doctor}</p>
        {event.status === "realizada" && (
          <button className="mark-next"> Agendamento do Conecta Recife</button>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Dias vazios no início do mês
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (

<div className="calendar-grid">
  <div className="weekdays">
    {["D", "S", "T", "Q", "Q", "S", "S"].map((d, idx) => (
      <div key={idx} className="day-label">{d}</div>
    ))}
  </div>

  <div className="days">
    {days.map((day, index) => {
      const dateStr =
        day !== null
          ? `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          : null;

      const isHighlighted = day !== null && events[dateStr];

      return (
        <div
          key={index}
          onClick={() => day && setSelectedDate(dateStr)}
          className={`day-cell ${day === null ? "empty" : ""} ${
            isHighlighted ? "highlighted" : ""
          }`}
        >
          {day || ""}
        </div>
      );
    })}
  </div>
</div>

  );
};


  return (
    <div className="app-container">
      <header className="header">
        <h1>Agenda Médica</h1>
        <button className="calendar-btn">📅</button>
      </header>

      <div className="selectors">
  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
  >
    {months.map((month, idx) => (
      <option key={idx} value={idx}>
        {month}
      </option>
    ))}
  </select>

  <select
    value={selectedYear}
    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
  >
    {[2024, 2025, 2026].map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
</div>


      {renderCalendar()}

      {renderEventDetails()}

      
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
};

export default CalendarApp;