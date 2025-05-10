import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function PaginaInicio() {
    
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

  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const alertas = [false, true, false, true, false, false, false];

  const handleClick = (index) => {
    if (alertas[index]) {
      navigate('/agenda');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Bom dia, Rosa !</h1>
      </header>

      <section className="reminder-box">
        <div className="reminder-text">
          <p>Seu próximo remédio será em 20 minutos</p>
        </div>
        <img src="src\assets\image_remedio.png" alt="Remédio" className="remedio-img" />
      </section>

      <section className="semana-box">
        <div className="linha-semana">
          {diasSemana.map((dia, index) => (
            <div key={index} className="dia-container">
              <span className="dia-label">{dia}</span>
              <span
                className={`dia-alerta ${alertas[index] ? 'alerta' : ''}`}
                onClick={() => handleClick(index)}
              >
                {alertas[index] ? '!' : ''}
              </span>
            </div>
          ))}
        </div>
      </section>

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

export default PaginaInicio;
