import { GET_USER } from 'redux/constants';

const getUser = result => ({
  type: GET_USER,
  result,
});

export default { getUser };
