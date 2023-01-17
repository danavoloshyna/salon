import axios from './axios';

export const fetchRegister = async (values) => {
  try {
    return await axios.post('/auth/registration', values)
  } catch (error) {
    console.log(error);
  }
}

export const fetchAuthenticate = async (values) => {
  try {
    const {data} = await axios.post('/auth/authenticate', values)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchCreateWorker = async (values) => {
  try {
    const {data} = await axios.post('/admin/worker', values)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchUpdateWorker = async (values) => {
  try {
    const {data} = await axios.patch('/admin/worker', values)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchGetWorkers = async (values) => {
  try {
    const {data} = await axios.get('/admin/worker')
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchGetOneWorker = async (id) => {
  try {
    const {data} = await axios.get(`/admin/worker/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchDeleteWorkers = async (id) => {
  try {
    const {data} = await axios.delete(`/admin/worker/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchGetOrders = async (value) => {
  try {
    const {data} = await axios.get(`/orders/`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchCreateOrders = async (values) => {
  try {
    const {data} = await axios.post(`/orders/`, values)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchCreateReview = async (values) => {
  try {
    const {data} = await axios.post(`/review/`, values)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchGetReviews = async () => {
  try {
    const {data} = await axios.get(`/review/`)
    return data
  } catch (error) {
    console.log(error);
  }
}
