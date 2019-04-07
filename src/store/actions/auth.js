import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSucess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

// a sync code

// export const auth = (email, password) => {
//   return dispatch => {
//     dispatch(authStart());
//     const authData = {
//       email: email,
//       password: password,
//       returnSecureToken: true
//     };
//     axios
//       .post(
//         "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyCGWszuKAFC_ak3WJpzSrr2QR8biH59Eig",
//         authData
//       )
//       .then(response => {
//         console.log(response);
//         dispatch(authSucess(response.data));
//       })
//       .catch(err => {
//         dispatch(authFail(err));
//       });
//   };
// };

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCGWszuKAFC_ak3WJpzSrr2QR8biH59Eig",
        authData
      )
      .then(response => {
        console.log(response);
        dispatch(authSucess(response.data));
      })
      .catch(err => {
        console.log(authData);
        dispatch(authFail(err));
      });
  };
};
