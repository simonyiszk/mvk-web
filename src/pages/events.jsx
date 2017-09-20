import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

BigCalendar.momentLocalizer(moment);

const Events = () => {
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
                start: new Date(2017, 10, 9, 14),
                end: new Date(2017, 10, 9, 18),
              },
            ]}
          />
        </Paper>
      </ArticleContainer>
    </div>
  );
};

export default Events;
