import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function CustomDatePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Button
          variant="outlined"
          size="small"
          startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
          onClick={handleClick}
          sx={{ minWidth: 'fit-content', height: '40px' }}
        >
          {value ? value.format('MMM DD, YYYY') : 'Select date'}
        </Button>
        
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              handleClose();
            }}
          />
        </Popover>
      </div>
    </LocalizationProvider>
  );
}