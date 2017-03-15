export default (state = {}, action) => {
  switch (action.type) {
    case 'GETUSER':
      return Object.assign({}, ...state, action.result);
    default:
      return state;
  }
};
