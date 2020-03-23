import { identity, pickBy } from 'lodash/fp';
import { getToken } from './token-libs';

export const formatObj = pickBy(identity);

export default (options = {}) =>
  Object.assign(
    {},
    {
      Authorization: `bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    formatObj(options)
  );
