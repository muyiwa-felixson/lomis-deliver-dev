const roundHelper = {
  isValidURL: (str) => {
    const a = document.createElement('a');
    a.href = str;
    const patt = new RegExp('/spreadsheets/d/');
    return (a.host && patt.test(a.pathname));
  },
};

export default roundHelper;
