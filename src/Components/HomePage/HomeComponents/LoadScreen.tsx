import React from 'react';
import './home.css';
import { Grid } from '@mui/material';

const LoadScreen: React.FC = () => {
  return (
    <Grid item xs={12} mt={25}>
      <div className="circle-loader"></div>
    </Grid>
  );
};

export default LoadScreen;
