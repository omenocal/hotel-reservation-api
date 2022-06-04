export default {
  type: "object",
  properties: {
    reservationId: { type: 'string' },
    clientId: { type: 'string' },
    roomId: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    createdAt: { type: 'string' },
  },
} as const;
