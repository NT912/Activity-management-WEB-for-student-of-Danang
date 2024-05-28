const datetimeUtils = module.exports;

datetimeUtils.formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

datetimeUtils.formatStartDatetime = (date) => {
  return `${date} 00:00:00`;
}

datetimeUtils.formatEndDatetime = (date) => {
  return `${date} 23:59:59`;
}
