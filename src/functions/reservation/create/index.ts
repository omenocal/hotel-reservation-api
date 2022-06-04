import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  name: `hotel-reservation-api-${process.env.NODE_ENV}-createReservation`,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'reservation',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
