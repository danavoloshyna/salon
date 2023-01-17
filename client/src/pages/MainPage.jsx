import React from 'react';
import {Box, Typography} from '@mui/material';
import {AppContext} from '../index';
import appConstants from '../utils/consts';

const MainPage = () => {
  const {user} = React.useContext(AppContext);

  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant='h2' sx={{marginY: 3}}>
          {user === appConstants.ADMIN && 'Панель адміністратора'}
          {user === appConstants.WORKER && 'Панель працівника'}
          {user === appConstants.NONE && 'Наша перукарня'}
          {user === appConstants.CLIENT && 'Наша перукарня'}
        </Typography>
        <img src="https://s3.eu-central-1.amazonaws.com/listmusor/production/52238/gallery/big/592286523cd48.jpg?1316609607" alt=""/>
      </Box>
  );
};

export default MainPage;
