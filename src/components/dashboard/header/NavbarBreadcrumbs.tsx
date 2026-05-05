import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link } from 'react-router';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Если путь начинается с 'dashboard', убираем его из массива, чтобы не дублировать
  const displayPathnames = pathnames[0] === 'dashboard' ? pathnames.slice(1) : pathnames;

  const formatBreadcrumb = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {/* Dashboard всегда первый и всегда ссылка */}
      <Typography 
        component={Link} 
        to="/dashboard" 
        variant="body1"
        sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}
      >
        Dashboard
      </Typography>
      
      {displayPathnames.map((value, index) => {
        const last = index === displayPathnames.length - 1;
        const to = `/dashboard/${displayPathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {formatBreadcrumb(value)}
          </Typography>
        ) : (
          <Typography
            key={to}
            component={Link}
            to={to}
            variant="body1"
            sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}
          >
            {formatBreadcrumb(value)}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
}