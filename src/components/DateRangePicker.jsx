import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useHomeContext } from "../contexts/HomeContext";
import { HomeContextActions } from "../contexts/HomeContext/actions";

function DateRangePicker() {
  const { state, dispatch } = useHomeContext();
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
            label="Departure"
            value={state.flightStartDate}
            onChange={(newValue) =>
              dispatch(HomeContextActions.setFlightStartDate(newValue))
            }
            maxDate={state.flightReturnDate || undefined}
            minDate={dayjs()}
            format="MM/DD/YYYY"
            sx={{ width: "100%" }}
          />

          <DatePicker
            label="Return Date"
            value={state.flightReturnDate}
            onChange={(newValue) =>
              dispatch(HomeContextActions.setFlightReturnDate(newValue))
            }
            minDate={state.flightStartDate || undefined}
            format="MM/DD/YYYY"
            sx={{ width: "100%" }}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

export default DateRangePicker;
