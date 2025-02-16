import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useHomeContext } from "../contexts/HomeContext";
import { HomeContextActions } from "../contexts/HomeContext/actions";

function DateRangePicker() {
  const theme = useTheme();
  const { state, dispatch } = useHomeContext();

  const datePickerStyles = {
    width: "100%",
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.contrastText,
      "&.Mui-focused": {
        color: theme.palette.primary.contrastText,
      },
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.primary.contrastText,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.contrastText,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.contrastText,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.contrastText,
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.contrastText,
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.contrastText,
    },
  };

  return (
    <Box width="100%">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          display="flex"
          flexDirection={{ md: "row", sm: "column", xs: "column" }}
          alignItems="center"
          justifyContent="center"
          gap={2}
          width={"100%"}
        >
          <DatePicker
            label="Departure Date"
            value={state.flightStartDate}
            onChange={(newValue) =>
              dispatch(HomeContextActions.setFlightStartDate(newValue))
            }
            maxDate={state.flightReturnDate || undefined}
            minDate={dayjs()}
            format="MM/DD/YYYY"
            sx={datePickerStyles}
          />

          <DatePicker
            label="Return Date"
            value={state.flightReturnDate}
            onChange={(newValue) =>
              dispatch(HomeContextActions.setFlightReturnDate(newValue))
            }
            minDate={state.flightStartDate || undefined}
            format="MM/DD/YYYY"
            sx={datePickerStyles}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

export default DateRangePicker;
