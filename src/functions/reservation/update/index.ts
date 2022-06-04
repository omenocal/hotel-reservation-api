import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  name: `hotel-reservation-api-${process.env.NODE_ENV}-updateReservation`,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'patch',
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
