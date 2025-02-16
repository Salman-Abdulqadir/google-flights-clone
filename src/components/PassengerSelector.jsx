import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const PassengerSelector = ({ value, onChange }) => {
  const theme = useTheme();

  const getTotalPassengers = () => {
    return Object.values(value).reduce((sum, count) => sum + count, 0);
  };

  const getPassengerLabel = () => {
    return getTotalPassengers();
  };

  return (
    <FormControl size="small">
      <InputLabel
        id="passenger-select-label"
        sx={{
          color: theme.palette.primary.contrastText,
          "&.Mui-focused": {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        Passengers
      </InputLabel>
      <Select
        labelId="passenger-select-label"
        value="select"
        label="Passengers"
        sx={{
          width: "100px",
          color: theme.palette.primary.contrastText,
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.contrastText,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.contrastText,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.contrastText,
          },
          ".MuiSvgIcon-root": {
            color: theme.palette.primary.contrastText,
          },
        }}
        renderValue={() => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.primary.contrastText,
            }}
          >
            <PersonIcon sx={{ ml: -0.5 }} />
            <span>{getPassengerLabel()}</span>
          </Box>
        )}
      >
        <MenuItem value="select" sx={{ display: "none" }} />

        <Box sx={{ p: 2, width: 250 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {getPassengerLabel()}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <PassengerTypeRow
              label="Adults"
              subLabel="Age 13+"
              value={value.adults}
              onChange={(newValue) => onChange({ ...value, adults: newValue })}
              min={1}
              max={9}
            />
            <PassengerTypeRow
              label="Children"
              subLabel="Age 2-12"
              value={value.children}
              onChange={(newValue) =>
                onChange({ ...value, children: newValue })
              }
              min={0}
              max={8}
            />
            <PassengerTypeRow
              label="Infants"
              subLabel="Under 2"
              value={value.infants}
              onChange={(newValue) => onChange({ ...value, infants: newValue })}
              min={0}
              max={4}
            />
          </Box>
        </Box>
      </Select>
    </FormControl>
  );
};

const PassengerTypeRow = ({ label, subLabel, value, onChange, min, max }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid",
      borderColor: "divider",
      pb: 1,
    }}
  >
    <Box>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="caption" color="text.secondary">
        {subLabel}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        variant="body2"
        component="button"
        onClick={() => value > min && onChange(value - 1)}
        sx={{
          width: 24,
          height: 24,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: value > min ? "pointer" : "not-allowed",
          opacity: value > min ? 1 : 0.5,
          backgroundColor: "transparent",
          "&:hover": value > min && {
            backgroundColor: "action.hover",
          },
        }}
      >
        -
      </Typography>
      <Typography variant="body2" sx={{ minWidth: 20, textAlign: "center" }}>
        {value}
      </Typography>
      <Typography
        variant="body2"
        component="button"
        onClick={() => value < max && onChange(value + 1)}
        sx={{
          width: 24,
          height: 24,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: value < max ? "pointer" : "not-allowed",
          opacity: value < max ? 1 : 0.5,
          backgroundColor: "transparent",
          "&:hover": value < max && {
            backgroundColor: "action.hover",
          },
        }}
      >
        +
      </Typography>
    </Box>
  </Box>
);

export default PassengerSelector;
