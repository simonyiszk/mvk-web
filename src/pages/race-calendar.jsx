import moment from 'moment';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const RaceCalendar = () => <BigCalendar events={[]} />;

export default RaceCalendar;
