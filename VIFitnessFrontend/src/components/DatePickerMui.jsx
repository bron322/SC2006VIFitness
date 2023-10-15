import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const DatePickerMui = () => {
  const [value,setValue] = useState(null)
  return (
    <Box sx={{ ...style, width: 100, height:50}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Select Date"
        value={value}
        onChange={(newValue)=> setValue(newValue)}
        renderInput={(props)=> <TextField{...props} />}

        />
      </LocalizationProvider>
    </Box>
  );
}

export default DatePickerMui;