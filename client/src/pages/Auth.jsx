import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import appConstants from '../utils/consts';
import {TextField, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {fetchAuthenticate, fetchRegister} from '../http/fetchMethods';
import {decodeToken} from 'react-jwt';
import {AppContext} from '../index';
import {toast} from 'react-toastify';

const defaultValuesRegistration = Object.freeze({
  login: '',
  password: '',
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
});

const defaultValuesLogin = Object.freeze({
  login: '',
  password: '',
});

const Auth = () => {
  const {pathname} = useLocation();
  const {changeUser} = React.useContext(AppContext);
  const navigate = useNavigate()
  const [defaultValues, setDefaultValues] = useState({})

  useEffect(() => {
    pathname === appConstants.PATH.REGISTRATION
        ? setDefaultValues(defaultValuesRegistration)
        : setDefaultValues(defaultValuesLogin);
  }, [appConstants.PATH.REGISTRATION])

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    if (pathname === appConstants.PATH.REGISTRATION) {
      const {data} = await fetchRegister(values);
      toast(data.message);
      navigate(appConstants.PATH.LOGIN)
    } else {
      const {token} = await fetchAuthenticate(values)
      if (token) {
        window.localStorage.setItem('token', token)
        const {role} = await decodeToken(token)
        changeUser(role)
        navigate(appConstants.PATH.MAIN_PAGE)
      }
    }
  };

  return (
      <>
        <Typography sx={{textAlign: 'center', marginTop: 2}} variant="h3" component="h3">
          {pathname === appConstants.PATH.REGISTRATION ? 'Реєстрація': 'Увійти'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}
              style={{marginTop: 40, padding: '0 100px'}}>
          <TextField
              error={Boolean(errors.login?.message)}
              helperText={errors.login?.message}
              {...register('login', {required: 'Вкажіть логін'})}
              type={'login'}
              sx={{marginTop: 2}}
              label="Login"
              fullWidth
          />
          <TextField
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', {required: 'Вкажіть пароль'})}
              type={'password'}
              sx={{marginTop: 2}}
              label="Password"
              fullWidth
          />
          {pathname === appConstants.PATH.REGISTRATION && (
              <>
                <TextField
                    error={Boolean(errors.firstName?.message)}
                    helperText={errors.firstName?.message}
                    {...register('firstName', {required: 'Вкажіть ваше ім\'я'})}
                    type={'text'}
                    sx={{marginTop: 2}}
                    label="Ваше ім'я"
                    fullWidth
                />
                <TextField
                    error={Boolean(errors.lastName?.message)}
                    helperText={errors.lastName?.message}
                    {...register('lastName',
                        {required: 'Вкажіть ваше прізвіще'})}
                    type={'text'}
                    sx={{marginTop: 2}}
                    label="Ваше прізвіще"
                    fullWidth
                />
                <TextField
                    error={Boolean(errors.phone?.message)}
                    helperText={errors.phone?.message}
                    {...register('phone', {required: 'Вкажіть телефон'})}
                    type={'number'}
                    sx={{marginTop: 2}}
                    label="Номер телефону"
                    fullWidth
                />
                <TextField
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Вкажіть пошту'})}
                    type={'email'}
                    sx={{marginTop: 2}}
                    label="E-mail"
                    fullWidth
                />
              </>
          )}
          <Button
              style={{marginTop: 40}}
              type="submit"
              size="large"
              variant="contained"
              fullWidth>
            {pathname === appConstants.PATH.REGISTRATION ?
                'Зареєструватись' :
                'Увійти'}
          </Button>
        </form>
      </>
  );
};

export default Auth;
