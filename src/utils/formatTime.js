import moment, { format, getTime, formatDistanceToNow } from 'moment';

// ----------------------------------------------------------------------


const formatDate = (date, formatString) => {
  if (date) {
    return moment(date).format(formatString);
  } else {
    return '';
  }
};

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? formatDate(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? formatDate(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
    : '';
}
