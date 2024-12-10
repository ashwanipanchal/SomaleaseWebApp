
export const BASE_URL = 'http://zedcredit.zedfinance.com/Kundali/api/';
export const BASE_URL_EXTERNAL = 'https://api.astrovedicapi.com/api/v1/';


export const GOOGLE_MAPS_APIKEY = 'AIzaSyA_23OZbQeEKQeLfMBTJ6xd3-hCa33tK4A';

export const PATH_URL = {

  signUp: 'astrologer/authUser',
  checkmobile: 'astrologer/check-mobile',
  package: 'packages',
  astrologersignup: 'astrologer/signup',
  homebanner: 'home-banner',
  consultant1: 'consultant',
  skill1: 'skill',
  specialization: 'main_specialization',
  language: 'languages',
  country1: 'country',
  state1: 'state',
  city1: 'city',
  drawerprofile: 'astrologer/home',
  astroreport: 'astro-report',
  reportdetail: 'astro-report-detail',
  updateProfile: 'astrologer-user/edit-profile',
  astrologeruserlogin: 'astrologer-user/login',
  skip: 'guest-user',
  forgot: 'forget-password',
  changepassword: 'password-change',
  headerpreview: 'header-preview',
  messagecentera: 'meessage-center',
  headerColor: "header-color",







  //third party  api end point 
  lalkitab: 'Lalkitab/Chart/Lagan',

};

export const ApiSauceJson = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
export const ApiSauceJsonExternal = {
  baseURL: BASE_URL_EXTERNAL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const ApiSauceMultipart = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
export const latitudeDelta = 0.0922;
