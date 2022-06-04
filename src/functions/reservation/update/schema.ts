export default {
  type: "object",
  properties: {
    reservationId: { type: 'string' }
  },
  required: ['reservationId']
} as const;
