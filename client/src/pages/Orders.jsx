import React, {useEffect, useState} from 'react';
import {fetchGetOrders} from '../http/fetchMethods';
import {
  Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toUTCDate} from '../utils/dateConverter';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([])

  const fetchAllOrders = async () => {
    const data = await fetchGetOrders()
    setAllOrders(data)
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Призвіще</TableCell>
              <TableCell align="center">Ім'я</TableCell>
              <TableCell align="center">Номер телефону</TableCell>
              <TableCell align="center">Ел. пошта</TableCell>
              <TableCell align="center">Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map((row) => (
                <TableRow
                    key={row.id}
                >
                  <TableCell align="center">{row.user.firstName}</TableCell>
                  <TableCell align="center">{row.user.lastName}</TableCell>
                  <TableCell align="center">{row.user.phone}</TableCell>
                  <TableCell align="center">{row.user.email}</TableCell>
                  <TableCell align="center">{toUTCDate(row.date)}</TableCell>

                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default Orders;
