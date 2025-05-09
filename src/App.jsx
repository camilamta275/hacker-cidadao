import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarApp from './pages/agendaConsultas';
import AlarmeApp from './pages/alarmeMedicamentos';
import MetasDiarias from './pages/metasExercicios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<CalendarApp />} />
         <Route path="/agenda" element={<CalendarApp />} />
         <Route path="/alarme" element={<AlarmeApp />} />
         <Route path="/metas" element={<MetasDiarias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
