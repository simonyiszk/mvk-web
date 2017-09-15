import moment from 'moment';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

BigCalendar.momentLocalizer(moment);

const RaceCalendar = () => {
  const title = 'Versenynaptár';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage />

      <ArticleContainer title={title}>
        <BigCalendar events={[]} />
      </ArticleContainer>
    </div>
  );
};

export default RaceCalendar;
