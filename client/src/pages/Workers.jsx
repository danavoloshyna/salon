import React, {useEffect, useState} from 'react';
import {fetchDeleteWorkers, fetchGetWorkers} from '../http/fetchMethods';
import {
  Paper, Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Workers = () => {

  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  const getWorkers = async () => {
    try {
      const data = await fetchGetWorkers();
      setWorkers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDeleteWorker = async (id) => {
    try {
      const {message} = await fetchDeleteWorkers(id);
      const updatedWorkers = [...workers].filter(worker => worker.id !== id);
      setWorkers(updatedWorkers);
      toast(message);
    } catch (e) {
      console.log(e);
    }

  };

  const onClickEditWorker = (id) => {
    navigate(`/edit_worker/${id}`);
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Ім'я</TableCell>
                <TableCell align="center">Призвіще</TableCell>
                <TableCell align="center">Номер телефону</TableCell>
                <TableCell align="center">Ел. пошта</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map((row) => (
                  <TableRow
                      key={row.id}
                  >
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="error"
                              sx={{marginRight: 1}}
                              onClick={() => onClickDeleteWorker(row.id)}>
                        <DeleteIcon/>
                      </Button>
                      <Button variant="outlined" color="warning"
                              onClick={() => onClickEditWorker(row.id)}>
                        <EditIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default Workers;
