import axios from 'axios';
import auth from '../auth';
export const upvote = async (postId) => {
  axios.post(`/api/posts/${postId}/upvote`)
    .then(resp => resp.data);
};

export const getAllActs = async () => {
  const resp = await axios.get('/api/acts', {
    headers: {
      'Authorization': auth.getToken()
    }
  })
  return resp.data;
};

export const getPrivacy = async () => {
  const resp = await axios.get('/api/privacy', {
    headers: {
      'Authorization': auth.getToken()
    }
  })
  return resp.data;
};

export const getPost = async (postId) => {
  const resp = await axios.get(`/api/acts/${postId}`, {
    headers: {
      'Authorization': auth.getToken()
    }
  })
  return resp.data;
};

export const addAct = async (act) => {
  const resp = await axios.post('/api/acts', {
    title: act.title,
    url: act.url,
    catogery: act.catogery,
    privacy: act.privacy

  }, {
      headers: {
        'Authorization': auth.getToken()
      }
    });
  return resp.data;
};

export const addPrivacy = async (lab, stmt) => {
  const resp = await axios.post('/api/privacy', {
    label: lab,
    statement: stmt
    

  }, {
      headers: {
        'Authorization': auth.getToken()
      }
    });
  return resp.data;
};

export const updateAct = async (act) => {
  const resp = await axios.post(`/api/acts/${act._id}`, {
    title: act.title,
    url: act.url,
    catogery: act.catogery,
    privacy: act.privacy

  }, {
      headers: {
        'Authorization': auth.getToken()
      }
    });
  return resp.data;
};

export const deleteAct = async (actid) => {
  const resp = await axios.delete(`/api/acts/${actid}`,  {
      headers: {
        'Authorization': auth.getToken()
      }
    });
  return resp.data;
};

export const login = async (username, password) => {
  const resp = await axios.post('/api/users', {
    username: username,
    password: password
  });
  return resp.data;
};

export const signup = async (username, password) => {
  const resp = await axios.post('/api/users?action=register', {
    username: username,
    password: password
  });
  return resp.data;
};