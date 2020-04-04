import { flow, get, replace } from 'lodash/fp';
import brn from 'brn';

export const isServer = !process.browser;

export const createErrorSelector = (action) =>
  flow(
    brn(action.errorSelector, action.errorSelector, action.dataSelector),
    get('error')
  );

export const doFunctionWithEnter = (event, func) =>
  typeof event === 'object' &&
  event.key === 'Enter' &&
  typeof func === 'function' &&
  func();

export const parseBoolean = (val) =>
  !val || val === 'false' || val === 'null' || val === 'undefined'
    ? false
    : true;

export const getObjectValuesFormWithEvent = (arrName = [], event) => {
  return arrName.reduce((object, name) => {
    object[name] = get(`target.${name}.value`)(event);
    return object;
  }, {});
};

export const parseTextToFloat = flow(replace(/,/g, ''), parseFloat);

export const formatDisplayNumber = (number) => {
  if (typeof number === 'string') {
    number = parseTextToFloat(number);
  }

  if (typeof number !== 'number') {
    return '';
  }

  const strNumberArr = number.toString().split('');
  const dotIndex = strNumberArr.indexOf('.');
  const endIndex = dotIndex >= 0 ? dotIndex : strNumberArr.length;

  //magic number: 3 | magic index : dotIndex, array.length
  for (let i = endIndex - 3; i > 0; i -= 3) {
    strNumberArr.splice(i, 0, ',');
  }

  return strNumberArr.join('');
};

export const getShortString = (title = '', character = 20) =>
  title.length > 20 ? `${title.substring(0, character)}...` : title;

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export const isImage = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return true;
    default:
      return false;
  }
};

export function toDataURL(file, callback) {
  var reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
