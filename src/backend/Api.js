import AsyncStorage from '@react-native-async-storage/async-storage';
import { PATH_URL } from './Config';
import ApiSauce from './ApiSauce';
// import { ApiSauce1 } from './ApiSauce';
import { ApiSauceExternal } from './ApiSauce';
import ApiSauceMu from './ApiSauce';
import store from '../redux/store';

import { Dimensions } from 'react-native';

const request = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauce.post(path, json).then(response => {
      // if (response.status == 401) {
      //   alert('You are login to another Device');

      //   return;
      // }
      //alert(JSON.stringify(json))

      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(response.err);
        reject(response.err);
      }
    });
  });
};
// const request1 = (path, json) => {
//   return new Promise((resolve, reject) => {
//     ApiSauce1.post(path, json).then(response => {
//       if (response.ok) {
//         resolve(response.data);
//       } else {
//         console.log(response.err);
//         reject(response.err);
//       }
//     });
//   });
// };
const requestMultipart = (path, formdata) => {
  return new Promise((resolve, reject) => {
    ApiSauce.setHeader('Authorization', `${store.getState().token}`);
    ApiSauce.setHeader('Accept', 'application/json');
    ApiSauce.setHeader('Content-Type', 'multipart/form-data');

    ApiSauceMu.post(path, formdata, {
      transformRequest: (data, headers) => {
        return formdata; // this is doing the trick
      },
    }).then(response => {
      // if (response.status == 401) {
      //   alert('You are login to another Device');

      //   return;
      // }
      if (response.ok) {
        resolve(response.data);
      } else {
        alert(JSON.stringify(response));
        reject(response.err);
      }
    });
  });
};

const requesth = (path, json) => {
  // console.log('Token', store.getState().token);
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return new Promise((resolve, reject) => {
    ApiSauce.setHeaders(headers);
    ApiSauce.setHeader('Authorization', `Bearer ${store.getState().token}`);
    ApiSauce.post(path, json).then(response => {
      //  alert(JSON.stringify(path))

      // if (response.status == 401){
      //   alert('You are login to another Device')
      //   EventRegister.emit('myCustomEvent3', 'it works!!!')
      //   return
      // }
      if (response.ok) {
        resolve(response.data);
      } else {
        //  alert(JSON.stringify(response))
        console.log(response.data);
        reject(response.err);
      }
    });
  });
};


export const requestGet = (path, json) => {
  // console.log('Token', store.getState().token);
  return new Promise((resolve, reject) => {
    ApiSauce.get(path, json).then(response => {
      if (response.status == 401) {
        alert('You are login to another Device');

        return;
      }
      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(JSON.stringify(response, null, 2));
        resolve({ status: false, data: response.data, error: response?.problem });
      }
    });
  });
};

export const requestGet1 = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauce.setHeader('Authorization', `Bearer ${store.getState().token}`);
    ApiSauce.get(path, json).then(response => {
      // if (response.status == 401){
      //   alert('You are login to another Device')
      //   EventRegister.emit('myCustomEvent3', 'it works!!!')
      //   return
      // }
      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(JSON.stringify(response, null, 2));
        resolve({ status: false, data: response.data, error: response?.problem });
      }
    });
  });
};

const requestExternal = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauceExternal.post(path, json).then(response => {
      if (response.status == 401) {

        return;
      }
      //alert(JSON.stringify(json))
      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(response.err);
        reject(response.err);
      }
    });
  });
};


export const UserSignUp = json => request(PATH_URL.signUp, json);
export const Astrologersignup = json => request(PATH_URL.astrologersignup, json);
export const AstrologerCheckMobile = json => request(PATH_URL.checkmobile, json);
export const Consultant = json => request(PATH_URL.consultant1, json);
export const Skill = json => request(PATH_URL.skill1, json);
export const Specialization = json => request(PATH_URL.specialization, json);
export const Language = json => request(PATH_URL.language, json);
export const Country = json => requestGet(PATH_URL.country1, json);
export const State1 = json => requestGet(PATH_URL.state1, json);
export const City1 = json => requestGet(PATH_URL.city1, json);
export const Packagelist = json => request(PATH_URL.package, json);
export const AstrologerUserApi = json => request(PATH_URL.astrologeruserlogin, json);
export const SkipHome = json => request(PATH_URL.skip, json);
export const Passwordforgot = json => request(PATH_URL.forgot, json);
export const PasswordReset = json => request(PATH_URL.changepassword, json);

//token
export const Homebanner = json => requesth(PATH_URL.homebanner, json);
export const GetProfile = json => requesth(PATH_URL.drawerprofile, json);
export const Astroreport = json => requestGet1(PATH_URL.astroreport, json);
export const ReportDetailApi = json => requesth(PATH_URL.reportdetail, json);
export const UpdateProfile = json => requesth(PATH_URL.updateProfile, json);
export const HeaderPreviewApi = json => requesth(PATH_URL.headerpreview, json);
export const MessageCenterApi = json => requestGet1(PATH_URL.messagecentera, json);
export const HeaderColor = json => requestGet1(PATH_URL.headerColor, json);


// third party api
export const LalkitabForm = json => requestExternal(PATH_URL.lalkitab, json);


// localstorage
export const AsyncStorageSetUser = user =>
  AsyncStorage.setItem('user', JSON.stringify(user));
export const AsyncStorageSettoken = user => AsyncStorage.setItem('token', user);
export const AsyncStorageGetUser = () => AsyncStorage.getItem('user');
export const AsyncStorageGettoken = user => AsyncStorage.getItem('token');
export const AsyncStorageSetLanguage = user =>
  AsyncStorage.setItem('lang', user);
export const AsyncStorageGetLanguage = () => AsyncStorage.getItem('lang');

export const AsyncStorageSetFcmtoken = user =>
  AsyncStorage.setItem('fcmtoken', user);
export const AsyncStorageGetFcmtoken = () => AsyncStorage.getItem('fcmtoken');

export const AsyncStorageClear = () => AsyncStorage.clear();


export const AspectRatio = () =>
  Dimensions.get('window').width / Dimensions.get('window').height;
export const Height = Dimensions.get('window').height;
export const Width = Dimensions.get('window').width;

export const formatAmount = amount =>
  `\u20B9 ${parseInt(amount)
    .toFixed(0)
    .replace(/(\d)(?=(\d\d)+\d$)/g, '$1,')}`;

export const formatNumber = str => str.replace(/,/g, '').replace('\u20B9 ', '');

export const textInPrice = price => `\u20B9 ${price}`;
