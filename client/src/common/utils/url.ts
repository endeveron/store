export const addServerUrl = (path: string): string => {
  return `${process.env.REACT_APP_SERVER_URL}/${path}`;
};
