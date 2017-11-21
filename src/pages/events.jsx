import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const EventsPage = () => {
  const title = 'Eseménynaptár';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage />

      <ArticleContainer title={title}>
        <Paper
          {...css({
            height: '60vh',
          })}
        >
          <BigCalendar
            culture="hu"
            events={[
              {
                title: 'III. MVK Versenycsapat Konferencia',
                start: new Date('2017-11-15T14:00'),
                end: new Date('2017-11-15T18:00'),
              },
            ]}
          />
        </Paper>
      </ArticleContainer>
    </div>
  );
};

export default EventsPage;
