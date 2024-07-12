import Cookies from 'js-cookie';
const setCookie = () => {
   
    Cookies.set('myCookieName', 'cookieValue', { expires: 7 });
  };