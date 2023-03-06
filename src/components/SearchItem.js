import { Button, Card } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Lock from "../icons/lock";
import { util } from "../public/util";
import "../assets/styles/search-item.css";
import { func } from "prop-types";
import { useSelector } from "react-redux";
import { userController } from "../controllers/userController";
import { userInfo } from "os";
export default function SearchItem({ item }) {
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const userData = useSelector((state) => state);
  const [dayChosen, setDayChosen] = useState(0);
  const [slotIndexChosen, setSlotIndexChosen] = useState(0);
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    let daysOfWeek = util.getDaysOfWeekDates();
    let days = [];
    let keys = Object.keys(daysOfWeek);
    for (let i = 0; i < keys.length; i++) {
      days.push(daysOfWeek[keys[i]]);
    }
    setDaysOfWeek(days);
  }, []);
  useEffect(() => {
    let schedule = item.userSchedule;
    schedule = schedule.filter((s) => s.slotDate === daysOfWeek[dayChosen]);
    schedule.sort(
      (a, b) => new Date(a.slotStartTime) - new Date(b.slotStartTime)
    );
    let indexOfNotLockedSlot = schedule.findIndex(
      (s) => s.isLocked === false && s.isReserved === false
    );
    if (indexOfNotLockedSlot < 0) {
      setSlotIndexChosen(-1);
    } else {
      setSlotIndexChosen(indexOfNotLockedSlot);
    }
    setSlots(schedule);
  }, [dayChosen, daysOfWeek]);
  function reserveAppointment() {
    if (util.isUserAuthorized()) {
      userController
        .registerAppointment({
          body: {
            slotFk: slots[slotIndexChosen].slotId,
            businessAccountFk: item.userDetails.businessAccountId,
            userFk: userData.userInfo.userId,
            serviceFk: slots[slotIndexChosen].serviceId,
          },
        })
        .then(() => {});
    } else {
      alert("login first");
    }
  }
  useEffect(() => {
    let tempSlots = [...slots];
    let indexOfSlot = tempSlots.findIndex(
      (s) => s.slotId === userData.reservedSlots[0]
    );
    if (indexOfSlot >= 0) {
      tempSlots[indexOfSlot].isReserved = true;
      let indexOfNotLockedSlot = tempSlots.findIndex(
        (s) => s.isLocked === false && s.isReserved === false
      );
      if (indexOfNotLockedSlot < 0) {
        setSlotIndexChosen(-1);
      } else {
        setSlotIndexChosen(indexOfNotLockedSlot);
      }
      setSlots(tempSlots);
    }
  }, [userData.reservedSlots]);
  function modifyFavorite() {
    let indexOfFavorite = userData.favoriteDoctors.findIndex(
      (d) => d.businessAccountFk === item.userDetails.businessAccountId
    );
    if (indexOfFavorite >= 0) {
      userController.deleteFavorite({
        favoriteId: userData.favoriteDoctors[indexOfFavorite].favoriteId,
      });
    } else {
      userController.addFavorite({
        body: {
          businessAccountFk: item.userDetails.businessAccountId,
          userFk: userData.userInfo.userId,
        },
      });
    }
  }

  return (
    <Card>
      <div>
        <div>{item.userDetails.firstName}</div>
        <div>{item.userDetails.lastName}</div>
        <div>{item.userDetails.userEmail}</div>
        <div>{item.userDetails.specialityName}</div>
        <div>
          <div>
            Schedule between {moment(daysOfWeek[0]).format("YYYY-MM-DD")} and{" "}
            {moment(daysOfWeek[daysOfWeek.length - 1]).format("YYYY-MM-DD")}
          </div>
          <div className="d-flex flex-wrap">
            {daysOfWeek.map((day, index) => {
              return (
                <div
                  title={moment(day).format("YYYY-MM-DD")}
                  onClick={() => setDayChosen(index)}
                  key={"day" + item.userDetails.businessAccountId + "" + index}
                  style={{
                    cursor: "pointer",
                    border: "1px solid black",
                    background: dayChosen === index ? "blue" : "white",
                  }}
                >
                  {moment(day).format("dd")}
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-wrap mt-3">
            {slots.length === 0
              ? "No slots"
              : slots.map((slot, index) => {
                  return (
                    <div
                      className="d-flex search-item-slot align-items-center"
                      style={{
                        cursor: "pointer",
                        border: "1px solid black",
                        opacity: slot.isLocked || slot.isReserved ? 0.5 : 1,
                        background:
                          slotIndexChosen === index ? "blue" : "white",
                        width: "100px",
                      }}
                      onClick={() => {
                        if (slot.isLocked === false && !slot.isReserved) {
                          setSlotIndexChosen(index);
                        }
                      }}
                      key={
                        "slot" + item.userDetails.businessAccountId + "" + index
                      }
                    >
                      {slot.isLocked && <Lock />}
                      {moment(slot.slotStartTime).format("HH:mm")} -
                      {moment(slot.slotEndTime).format("HH:mm")}
                    </div>
                  );
                })}
          </div>
          <div className="w-100 justify-content-center">
            <Button
              type={slotIndexChosen !== -1 ? "primary" : ""}
              disabled={slotIndexChosen === -1 || userData.userInfo.userId === item.userDetails.userId}
              onClick={() => reserveAppointment()}
            >
              Reserve Appointment
            </Button>
          </div>
          <div className="w-100 justify-content-center">
            <Button
              type={"primary"}

              onClick={() => modifyFavorite()}
            >
              {userData.favoriteDoctors.findIndex(
                (d) =>
                  d.businessAccountFk === item.userDetails.businessAccountId
              ) >= 0
                ? "Remove Favorite"
                : "Add Favorite"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
