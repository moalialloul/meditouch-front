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
  sunday.setDate(today.getDate() - currentDay + 7);
  dates[days[0]] = sunday.toISOString().split("T")[0];

  return dates;
}
export const util = {
    getDaysOfWeekDates
}