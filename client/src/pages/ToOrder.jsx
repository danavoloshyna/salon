import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Box, MenuItem, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {fetchCreateOrders, fetchGetWorkers} from '../http/fetchMethods';
import {toast} from 'react-toastify';

const ToOrder = () => {
  const [value, onChange] = useState(new Date());
  const [chosenWorker, setChosenWorker] = useState('')

  const [workers, setWorkers] = useState([])

  const fetchWorkers = async () => {
    const data = await fetchGetWorkers()
    setWorkers(data)
  }

  const onClickToOrder = async (values) => {
    try{
      const {message} = await fetchCreateOrders(values)
      toast(message)
    }catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchWorkers()
  }, []);

  return (
      <div>
        <Typography sx={{textAlign: 'center', marginTop: 2}} variant="h4"
                    component="h4">
          Записатись на стрижку
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            workerId: chosenWorker,
            date: value
          }
          onClickToOrder(formData)
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 5,
          }}>
            <Calendar onChange={onChange} value={value}/>
            <Box sx={{marginLeft: 10, display: 'flex', flexDirection: 'column'}}>
              <TextField
                  id="outlined-select-currency"
                  select
                  label="Натисніть"
                  defaultValue=""
                  helperText="Оберіть перукаря"
                  sx={{width: '300px'}}

              >
                {workers.map((option) => (
                    <MenuItem onClick={() => setChosenWorker(option.id)} key={option.firstName} sx={{color: '#000'}} value={`${option.firstName} ${option.lastName}`}>
                      {`${option.firstName} ${option.lastName}`}
                    </MenuItem>
                ))}
              </TextField>
              <Typography variant='p' sx={{ marginTop: 10, fontSize: '18px'  }}>
                Зробіть запис та наш менеджер з вами зв'яжеться
              </Typography>
            </Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 6}}>
            <Button
                color="primary"
                variant="contained"
                type="submit" size="large"
            >
              Записатись!
            </Button>
          </Box>
        </form>
      </div>
  );
};

export default ToOrder;
