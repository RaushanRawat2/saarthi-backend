import { format, parseISO, isAfter, isBefore } from 'date-fns';

export const formatDate = (dateString, formatStr = 'PPP') => {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return 'Invalid Date';
  }
};

export const formatTime = (timeString) => {
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  } catch {
    return timeString;
  }
};

export const isEventUpcoming = (eventDate, eventTime) => {
  try {
    const [hours, minutes] = eventTime.split(':');
    const eventDateTime = new Date(eventDate);
    eventDateTime.setHours(parseInt(hours), parseInt(minutes));
    return isAfter(eventDateTime, new Date());
  } catch {
    return false;
  }
};