import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import ChangeQueue from './pages/ChangeQueue';
import ChangeDetail from './pages/ChangeDetail';
import CabQueue from './pages/CabQueue';
import DocumentCompliance from './pages/DocumentCompliance';

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full bg-neutral-app overflow-hidden font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/changes" element={<ChangeQueue />} />
              <Route path="/changes/:id" element={<ChangeDetail />} />
              <Route path="/cab" element={<CabQueue />} />
              <Route path="/documents" element={<DocumentCompliance />} />
              <Route path="*" element={<div className="p-8 text-center text-neutral-secondary">Page not found or under construction.</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
