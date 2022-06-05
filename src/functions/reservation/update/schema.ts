export default {
  type: "object",
  properties: {
    reservationId: { type: 'string' },
    roomId: { type: 'string' },
    clientId: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
  },
  required: ['reservationId']
} as const;
