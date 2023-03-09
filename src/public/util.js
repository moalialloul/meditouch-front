import { EncryptStorage } from "encrypt-storage";
import momentTz from "moment-timezone";
import moment from "moment/moment";

const encryptStorage1 = new EncryptStorage("secret-key", {
  prefix: "@instance1",
});
function getDaysOfWeekDates() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const dates = {};

  // Calculate the date for Monday of the current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + 1);
  dates[days[1]] = monday.toISOString().split("T")[0];

  // Calculate the dates for Tuesday through Sunday of the current week
  for (let i = 2; i <= 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - currentDay + i);
    dates[days[i - 1]] = day.toISOString().split("T")[0];
  }
  // Calculate the dates for Sunday of the current week
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDay + 8);
  dates[days[0]] = sunday.toISOString().split("T")[0];

  return dates;
}

function isUserAuthorized() {
  let user = encryptStorage1.getItem("meditouch_user");
  if (user) {
    return true;
  }
  return false;
}
function getUser() {
  let user = encryptStorage1.getItem("meditouch_user");
  return user;
}
const convertTZ = (date, tzString) => {
  if (date !== null && date.toString() !== "Invalid date") {
    let m = momentTz(date, "YYYY/MM/DD HH:mm:ss");
    m.tz(tzString);
    return m;
  }
  return null;
};
const formatTimeByOffset = (dateString) => {
  let localTime = momentTz.tz(new Date(), momentTz.tz.guess());
  var serverTime = localTime.clone().tz("Europe/Paris");
  serverTime = serverTime.format("YYYY/MM/DD HH:mm:ss").toString();

  localTime.tz(momentTz.tz.guess());
  localTime = localTime.format("YYYY/MM/DD HH:mm:ss").toString();

  var duration = moment.duration(moment(localTime).diff(moment(serverTime)));

  var dateLocal = moment(dateString);
  dateLocal.add(duration.asMilliseconds(), "milliseconds");
  var newDate = new Date(dateLocal);
  return newDate;
};
export const util = {
  formatTimeByOffset,
  convertTZ,
  getUser,
  isUserAuthorized,
  getDaysOfWeekDates,
};
