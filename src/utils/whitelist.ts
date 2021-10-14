const whitelist: Map<string, any> = new Map(); // TODO: IMPORTANT replace with this.state.whitelist;
/// TODO: IMPORTANT must be lowerCased
whitelist.set('0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de'.toLowerCase(), [
  {
    ticketId: 1,
    batch: 0,
    sig: '0x1234567890abcdef',
  },
  {
    ticketId: 2,
    batch: 1,
    sig: '0x2234567890abcdef',
  },
]);

export default whitelist;
