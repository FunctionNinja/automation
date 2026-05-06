import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { NavLink } from 'react-router';
import { useProfile } from '../../../services/hooks/useProfile';
import Loading from '../../Loading';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/dashboard' },
  { text: 'Monitoring', icon: <AnalyticsRoundedIcon />, path: '/dashboard/monitoring' },
  { text: 'Employees', icon: <PeopleRoundedIcon />, path: '/dashboard/employees' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: '/dashboard/tasks' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/dashboard/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/dashboard/feedback' },
];

export default function MenuContent() {
  const { data: profile, isLoading } = useProfile();
  const isAdmin = profile?.role === 'admin';


if(isLoading) {
  return <Loading/>;
}



  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <NavLink
              to={item.path}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              end={item.path === '/dashboard'}
            >
              {({ isActive }) => (
                <ListItemButton selected={isActive}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <NavLink
              to={item.path}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              {({ isActive }) => (
                <ListItemButton selected={isActive}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
      {isAdmin && (
        <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavLink
            to="/dashboard/admin"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            {({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary="Admin's page" />
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      </List>
      )}



      
    </Stack>
  );
}