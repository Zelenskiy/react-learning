import { Route, Routes } from 'react-router';
import MainPage from './MainPage';
import NoFound from './components/nofound/nofound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/*" element={<NoFound />} />
    </Routes>
  );
}

export default AppRoutes;
