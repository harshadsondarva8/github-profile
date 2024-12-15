import RawUriCollection from '@/configs/RawUriCollection';
import Interpolate from '@/utils/Interpolate';

interface UriFunctions {
  [key: string]: (data?: Record<string, string>) => string;
}

// Create an object with URI-related functions
const Uri: UriFunctions = (() => {
  const ret: UriFunctions = {};

  // Iterate over keys in RawUriCollection
  for (const key in RawUriCollection) {
    if (typeof RawUriCollection[key] === 'string') {
      // Create a function for each URI key
      ret[key] = (data?: Record<string, string>) => {
        if (data) {
          // Interpolate the URI with provided data
          return Interpolate(RawUriCollection[key], data);
        }
        return RawUriCollection[key];
      };
    }
  }
  return ret;
})();

export default Uri;
