import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Card, Container, TextField, Typography} from '@mui/material';
import appConstants from '../utils/consts';
import {AppContext} from '../index';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {fetchCreateReview, fetchGetReviews} from '../http/fetchMethods';
import {toast} from 'react-toastify';

const Review = () => {
  const {user} = React.useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [reload, setReload] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      reviewsText: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      setReload(true)
      const {message} = await fetchCreateReview(values);
      toast(message);
      setValue('reviewsText', '');
    } catch (e) {
      console.log(e);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await fetchGetReviews();
      setReviews(data);
      setReload(false)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (reload) {
      fetchReviews();
    }
  }, [reload]);

  return (
      <>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {user === appConstants.CLIENT && (
              <form
                  style={{display: 'flex', marginTop: 20, alignItems: 'center'}}
                  onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label={'Написати відгук'}
                    variant="outlined"
                    maxRows={10}
                    multiline
                    fullWidth
                    {...register('reviewsText',
                        {required: 'Повинен бути відгук'})}
                    error={Boolean(errors.reviewsText?.message)}
                    helperText={errors.reviewsText?.message}
                    sx={{width: '700px'}}
                />
                <Box
                    sx={{display: 'flex', alignItems: 'center', marginLeft: 3}}>
                  <Button type="submit" variant="contained">
                    <SendIcon/>
                  </Button>
                </Box>
              </form>
          )}
        </Box>
        <Container sx={{marginTop: 3}}>
          {reviews.map(rev => (
                  <Card sx={{padding: 2, marginTop: 1 }}>
                    <Typography variant="caption">
                      {rev.user.firstName} {rev.user.lastName}
                    </Typography>
                    <Typography variant="h6" component={'div'} sx={{  }}>
                      {rev.text}
                    </Typography>
                  </Card>
              ),
          )}
        </Container>
      </>
  );
};

export default Review;
