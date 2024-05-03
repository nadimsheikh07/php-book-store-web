import moment from 'moment';

export function fDate(date, newFormat) {
  const formatString = newFormat || 'ddd MMM YYYY';
  return date ? moment(date).format(formatString) : '';
}

export function fDateTime(date, newFormat) {
  const formatString = newFormat || 'ddd MMM YYYY h:mm A';
  return date ? moment(date).format(formatString) : '';
}

export function fTimestamp(date) {
  return date ? moment(date).valueOf() : '';
}

export function fToNow(date) {
  return date ? moment(date).fromNow() : '';
}
