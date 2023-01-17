import React, {useEffect, useState} from 'react';
import {TextField, Typography} from '@mui/material';
import appConstants from '../utils/consts';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {
  fetchCreateWorker,
  fetchGetOneWorker,
  fetchUpdateWorker,
} from '../http/fetchMethods';
import {toast} from 'react-toastify';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const create_default_value = {
  login: '',
  password: '',
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
}

const edit_default_value = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
}

const AddWorker = () => {
  const params = useParams();
  const {pathname} = useLocation();
  const {id} = useParams();
  const editMode = pathname.includes('edit_worker');
  const navigate = useNavigate()

  const [defaultValue, setDefaultValue] = useState({});

  useEffect(() => {
    if (editMode) {
      setDefaultValue(edit_default_value)
    }else{
      setDefaultValue(create_default_value)
    }
  }, [editMode])

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    defaultValue,
    mode: 'onChange',
  });

  const fetchOneWorker = async () => {
    const data = await fetchGetOneWorker(params.id);
    setValue('firstName',data.firstName )
    setValue('lastName',data.lastName )
    setValue('phone',data.phone )
    setValue('email',data.email )
  };

  useEffect(() => {
    if (editMode) {
      fetchOneWorker();
    }
  }, []);

  useEffect(() => {
    console.log(defaultValue);
  }, [defaultValue]);

  const onSubmit = async (values) => {
    if (!editMode) {
      try {
        const {message} = await fetchCreateWorker(values);
        toast(message);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        console.log(values);
        const {message} = await fetchUpdateWorker({...values, id});
        toast(message);
        navigate(appConstants.PATH.WORKERS)
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
      <>
        <Typography sx={{textAlign: 'center', marginTop: 2}} variant="h3"
                    component="h3">
          {editMode ? 'Редагувати працівника' : 'Додати працівника'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}
              style={{marginTop: 40, padding: '0 100px'}}>
          {!editMode && (
              <>
                <TextField
                    error={Boolean(errors.login?.message)}
                    helperText={errors.login?.message}
                    {...register('login',
                        {required: 'Вкажіть логін працівника'})}
                    type={'login'}
                    sx={{marginTop: 2}}
                    label="Логін працівника"
                    fullWidth
                />
                <TextField
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password',
                        {required: 'Вкажіть пароль працівника'})}
                    type={'password'}
                    sx={{marginTop: 2}}
                    label="Пароль працівника"
                    fullWidth
                />
              </>
          )}

          <TextField
              error={Boolean(errors.firstName?.message)}
              helperText={errors.firstName?.message}
              {...register('firstName', {required: 'Вкажіть ім\'я працівника'})}
              type={'text'}
              sx={{marginTop: 2}}
              label="Ім'я працівника"
              fullWidth
          />
          <TextField
              error={Boolean(errors.lastName?.message)}
              helperText={errors.lastName?.message}
              {...register('lastName',
                  {required: 'Вкажіть прізвіще працівника'})}
              type={'text'}
              sx={{marginTop: 2}}
              label="Прізвіще працівника"
              fullWidth
          />
          <TextField
              error={Boolean(errors.phone?.message)}
              helperText={errors.phone?.message}
              {...register('phone', {required: 'Вкажіть телефон працівника'})}
              type={'number'}
              sx={{marginTop: 2}}
              label="Номер телефону працівника"
              fullWidth
          />
          <TextField
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', {required: 'Вкажіть пошту працівника'})}
              type={'email'}
              sx={{marginTop: 2}}
              name='email'
              label="E-mail працівника"
              fullWidth
          />
          <Button
              style={{marginTop: 40}}
              type="submit"
              size="large"
              variant="contained"
              fullWidth>
            {editMode ? 'Редагувати дані працівника' : 'Приєднати працівника до колективу'}
          </Button>
        </form>
      </>
  );
};

export default AddWorker;
