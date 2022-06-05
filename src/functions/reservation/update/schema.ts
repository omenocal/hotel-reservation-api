export default {
  type: "object",
  properties: {
    roomId: { type: 'string' },
    clientId: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
  },
} as const;
