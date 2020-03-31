export const isServer = !process.browser;

export const getResetter = api =>
  typeof api === 'object' && api.resetter(['data', 'error']);
