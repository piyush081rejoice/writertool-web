import moment from "moment";
import { ApiPut } from "./API/ApiData";
import { setPromoteImageAction } from "../redux/actions";

export function formatDate(ci) {
  return moment(ci.value).local().format("DD MMM YYYY");
}

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDate = (date) => {
  let d = new Date(date);
  if (d.getDate() < 10 && d.getMonth() < 10) {
    return d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate();
  } else {
    if (d.getDate() < 10) {
      // console.log('date ::', d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate())
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate();
    } else if (d.getMonth() < 10) {
      return d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();
    }
  }
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  // return "2020-11-11"
};

export const getDateMonth = (date) => {
  let d = new Date(date);
  return monthNames[d.getMonth()];
};

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export const getDateDay = (date) => {
  let d = new Date(date);
  return weekday[d.getDay()];
};

export const getBase64 = async (file) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

