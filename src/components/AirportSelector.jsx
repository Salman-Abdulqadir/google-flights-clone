import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useDebounce from "../utils/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { SkyScrapperApi } from "../apis/skyScrapperApi";
import Loader from "./Loader";

const AirportSelector = ({ value, onChange, label }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);

  const { data, isLoading } = useQuery({
    queryKey: ["airports", debouncedSearch?.trim()],
    queryFn: () => SkyScrapperApi.searchAirports(debouncedSearch),
    enabled: !!debouncedSearch && debouncedSearch.length > 2,
    staleTime: 600000,
  });

  const airports = !isLoading && data && Array.isArray(data) ? data : [];

  return (
    <Autocomplete
      options={!value ? airports : [value]}
      getOptionLabel={(option) => {
        const label = option?.presentation?.suggestionTitle || "";
        return label;
      }}
      value={value}
      inputValue={searchText}
      onInputChange={(_, newValue) => {
        setSearchText(newValue);
      }}
      onChange={onChange}
      filterOptions={(options) => options}
      openOnFocus
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      renderOption={(props, option) => {
        const optionLabel = option?.presentation?.suggestionTitle || "";
        return (
          <li {...props} key={option.skyId}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                py: 1,
              }}
            >
              <AirplanemodeActiveIcon color="primary" sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">{optionLabel}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon
                    color="action"
                    sx={{ fontSize: 16, mr: 0.5 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {option?.presentation?.title},{" "}
                    {option?.presentation?.subtitle}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </li>
        );
      }}
      sx={{ width: "100%" }}
      loading={isLoading}
      loadingText={<Loader skeleton enableText text="Loading options..." />}
      noOptionsText={
        searchText.length < 3
          ? "Please type at least 3 characters to search"
          : "No options available"
      }
    />
  );
};

export default AirportSelector;
