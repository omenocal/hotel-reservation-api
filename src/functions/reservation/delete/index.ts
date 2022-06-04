import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  name: `hotel-reservation-api-${process.env.NODE_ENV}-deleteReservation`,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
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
