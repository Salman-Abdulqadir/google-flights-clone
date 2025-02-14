import React from 'react';
import { 
  Box, 
  Paper, 
  IconButton,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const SearchBox = ({ children, onSwap }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default SearchBox; 