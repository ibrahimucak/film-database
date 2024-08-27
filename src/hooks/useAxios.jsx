import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const METHODS = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};

export default function useAxios({
  initialData,
  baseURL = 'https://nextgen-project.onrender.com/api/s11d3',
}) {
  const [data, setData] = useState(initialData);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    // headers: {'authentication': 'foobar'}
  });

  const sendRequest = ({
    url,
    method,
    data = null,
    redirect = null,
    callbackSuccess = null,
    callbackError = null,
  }) => {
    setLoading(true);
    console.log(
      'sendRequest starts: ',
      'url: ',
      url,
      'method:  ',
      method,
      'data: ',
      data,
      'sendRequest: ',
      loading
    );
    instance[method](url, data === null ? null : data)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
        setError(null);
        callbackSuccess && callbackSuccess();
        redirect && history.push(redirect);
        console.log('sendRequest response: ', response, 'loadding: ', loading);
      })
      .catch(function (error) {
        console.log('sendRequest error: ', error);
        callbackError && callbackError();
        setError(error.message);
        setLoading(false);
      });
  };

  return { data, sendRequest, setData, error, loading, METHODS };
}
