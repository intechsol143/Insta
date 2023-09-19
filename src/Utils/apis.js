import axios from 'axios';

const API = axios.create({
  baseURL: 'https://intechsol.co/insta-downloader',
});



const updateFcm = async payload => {
    const requrest = `/api/update-fcm`;
    try {
      const response = await API.post(requrest,payload.userdata, {
        headers: {
  
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${payload.usertkn}`,
        },
      });
      const { data, status } = response;
      return status === 200 || status === 201 ? data : null;
    } catch (err) {
      throw err;
    }
  };

  const sendFeedback = async payload => {
    const requrest = `/api/feedback`;
    try {
      const response = await API.post(requrest,payload, {
        headers: {
  
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        //   Authorization: `Bearer ${payload.userToken}`,
        },
      });
      const { data, status } = response;
      return status === 200 || status === 201 ? data : null;
    } catch (err) {
      throw err;
    }
  };

  const senddeviceId = async payload => {
    console.log("check Payload",payload)
    const requrest = `/api/login`;
    try {
      const response = await API.post(requrest,payload, {
        headers: {
  
          // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${payload.userToken}`,
        },
      });
      const { data, status } = response;
      return status === 200 || status === 201 ? data : null;
    } catch (err) {
      throw err;
    }
  };

  const instaDwonloader = async payload => {
    const requrest = `/api/insta-download`;
    try {
      const response = await API.post(requrest,payload, {
        headers: {
  
          // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${payload.userToken}`,
        },
      });
      const { data, status } = response;
      return status === 200 || status === 201 ? data : null;
    } catch (err) {
      throw err;
    }
  };

  const rateApi = async payload => {
    const requrest = `/api/app-settings/rate`;
    try {
      const response = await API.get(requrest,payload, {
        headers: {
  
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${payload.userToken}`,
        },
      });
      const { data, status } = response;
      return status === 200 || status === 201 ? data : null;
    } catch (err) {
      throw err;
    }
  };

  const shareApi = async payload => {
    const requrest = `/api/app-settings/share`;
    try {
      const response = await API.get(requrest,payload, {
        headers: {
  
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${payload.userToken}`,
        },
      });
      const { data, status } = response;
      return status === 200 || status === 201 ? data : null;
    } catch (err) {
      throw err;
    }
  };
  export { 
    updateFcm,
    sendFeedback,
    senddeviceId,
    instaDwonloader,
    rateApi,
    shareApi
  }