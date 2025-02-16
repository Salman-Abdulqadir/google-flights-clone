import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  useTheme,
} from "@mui/material";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import WeekendIcon from "@mui/icons-material/Weekend";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const cabinClasses = [
  {
    value: "economy",
    label: "Economy",
    shortLabel: "Economy",
    icon: <AirlineSeatReclineNormalIcon />,
  },
  {
    value: "premium_economy",
    label: "Premium",
    shortLabel: "Premium",
    icon: <WorkspacePremiumIcon />,
  },
  {
    value: "business",
    label: "Business",
    shortLabel: "Business",
    icon: <WeekendIcon />,
  },
  {
    value: "first",
    label: "First Class",
    shortLabel: "First",
    icon: <AirlineSeatFlatIcon />,
  },
];

const CabinClassSelector = ({ value, onChange }) => {
  const theme = useTheme();

  return (
    <FormControl size="small">
      <InputLabel
        id="cabin-class-label"
        sx={{
          color: theme.palette.primary.contrastText,
          "&.Mui-focused": {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        Cabin Class
      </InputLabel>
      <Select
        labelId="cabin-class-label"
        id="cabin-class-select"
        value={value}
        label="Cabin Class"
        onChange={onChange}
        sx={{
          minWidth: "140px",
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
      >
        {cabinClasses.map((cabinClass) => (
          <MenuItem key={cabinClass.value} value={cabinClass.value}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {cabinClass.icon}
              {cabinClass.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CabinClassSelector;
