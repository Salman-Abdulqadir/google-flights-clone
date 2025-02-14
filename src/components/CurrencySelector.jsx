import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import * as countryFlagIcons from 'country-flag-icons/react/3x2';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'US' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'EU' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'JP' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'GB' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'CN' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'AU' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'CA' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', country: 'CH' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'HK' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'SG' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'SE' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'KR' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'IN' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'BR' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'RU' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'ZA' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'MX' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'AE' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'TH' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'TR' },
];

const CurrencySelector = ({ value, onChange }) => {
  const getFlag = (countryCode) => {
    const Flag = countryFlagIcons[countryCode];
    return Flag ? <Flag style={{ width: '20px', height: '15px' }} /> : null;
  };

  const selectedCurrency = currencies.find(c => c.code === value);

  return (
    <FormControl size="small">
      <InputLabel id="currency-select-label">Currency</InputLabel>
      <Select
        labelId="currency-select-label"
        id="currency-select"
        value={value}
        label="Currency"
        onChange={onChange}
        sx={{ 
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }
        }}
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {selectedCurrency && getFlag(selectedCurrency.country)}
            <span>{selectedCurrency?.code}</span>
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 48 * 5.5, // Show 5.5 items (to hint there's more)
              '& .MuiMenuItem-root': {
                py: 1 // Add some padding to menu items
              }
            }
          }
        }}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency.code} value={currency.code}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              width: '100%'
            }}>
              {getFlag(currency.country)}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="body2">
                  {currency.code} - {currency.symbol}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                >
                  {currency.name}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector; 