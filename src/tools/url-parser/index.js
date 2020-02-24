export const getHostApiURL = (env) => {
  switch (env) {
    case 'dev':
    case 'develop':
    case 'stage':
    case 'production':
    default:
      return 'https://www.androvideo.com/api';
  }
};
export const getHostURL = (env) => {
  switch (env) {
    case 'dev':
    case 'develop':
    case 'stage':
    case 'production':
    default:
      return 'https://www.androvideo.com/';
  }
};
