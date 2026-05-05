import Box from '@mui/material/Box';
import { Outlet } from 'react-router'; // 👈 импортируй Outlet
import MenuContent from '../components/dashboard/sidemenu/MenuContent';
import Header from '../components/dashboard/header/Header';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Сайдбар */}
      <Box sx={{ width: 250, borderRight: '1px solid #ddd' }}>
        <MenuContent />
      </Box>
      
      {/* Контент - сюда будут рендериться вложенные роуты */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Outlet /> {/* 👈 Вот это самое важное! */}
      </Box>
    </Box>
  );
}