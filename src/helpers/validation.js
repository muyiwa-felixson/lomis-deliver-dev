const roundHelper = {
  isValidURL: (str) => {
    const a = document.createElement('a');
    a.href = str;
    const patt = new RegExp('/spreadsheets/d/');
    return (a.host && patt.test(a.pathname));
  },

  checkModalDate: (sd, ed) => {
    const startDate = new Date(sd);
    const endDate = new Date(ed);

    return Date.parse(endDate) > Date.parse(startDate);
  },
};

export default roundHelper;
