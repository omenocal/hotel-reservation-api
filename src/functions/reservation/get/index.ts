import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  name: `hotel-reservation-api-${process.env.NODE_ENV}-getReservation`,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'reservation/{reservationId}',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
