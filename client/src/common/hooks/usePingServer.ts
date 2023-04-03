import { useEffect } from 'react';

const usePingServer = () => {
  useEffect(() => {
    const pingServer = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/ping`);
        const resData = await res.json();
        if (resData?.message && resData.message === 'OK') {
          console.log('Ping OK');
        } else {
          console.log('Ping Error');
        }
      } catch (error) {
        console.error(error);
      }
    };

    pingServer();
  }, []);
};

export { usePingServer };
