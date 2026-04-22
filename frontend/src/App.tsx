import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import AdminLogin from './pages/admin/Login';
// import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;