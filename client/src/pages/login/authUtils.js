import API from '../../API';

export const handleSubmit = (username, password) => {
  return API.post(`${process.env.REACT_APP_API_URL}/login`, {
    username: username,
    password: password,
  })
    .then((response) => {
      const token = response.headers.authorization;
      const Memberid = response.headers.authorization.Memberid;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (Memberid) {
        localStorage.setItem('Memberid', Memberid);
      }

      localStorage.setItem('username', username);

      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

/** 수정전 코드
 * // authUtils.js

import API from '../../API';

export const handleSubmit = async (username, password) => {
  try {
    const response = await API.post(`${process.env.REACT_APP_API_URL}/login`, {
      username: username,
      password: password,
    });

    const token = response.headers.authorization;
    const Memberid = response.headers.Memberid;

    if (token) {
      localStorage.setItem('token', token);
    }
    if (Memberid) {
      localStorage.setItem('Memberid', Memberid);
    }

    localStorage.setItem('username', username);

    return response.data;
  } catch (error) {
    throw error;
  }
};

authUtils.js
 */
