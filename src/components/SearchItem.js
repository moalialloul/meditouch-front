import { Avatar, Button, Card, Col, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Lock from "../icons/lock";
import { util } from "../public/util";
import "../assets/styles/search-item.css";
import { func } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userController } from "../controllers/userController";
import avatar from "../assets/images/avatar.jpg";
import classNames from "classnames";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export default function SearchItem({ item }) {
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const userData = useSelector((state) => state);
  const [dayChosen, setDayChosen] = useState(0);
  const [slotIndexChosen, setSlotIndexChosen] = useState(0);
  const [slots, setSlots] = useState([]);
  const [userProfle, setUserProfile] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData.storage) {
      const getFile = userData.storage.root.children.find(
        (file) => file.name === "profile" + item.userId
      );
      if (getFile) {
        getFile.downloadBuffer((error, data) => {
          if (error) console.error(error);
          setUserProfile(data);
        });
      }
    }
  }, [userData.storage]);
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
    for (let i = 0; i < schedule.length; i++) {
      schedule[i].slotStartTime = moment(
        util.formatTimeByOffset(
          new Date(moment(schedule[i].slotStartTime, "YYYY-MM-DD HH:mm:ss"))
        ),
        "YYYY-MM-DD HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss");
      schedule[i].slotEndTime = moment(
        util.formatTimeByOffset(
          new Date(moment(schedule[i].slotEndTime, "YYYY-MM-DD HH:mm:ss"))
        ),
        "YYYY-MM-DD HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss");
    }
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
        .then((response) => {
          alert(response.data.message);
        });
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
    <Col xs={24} sm={24} md={12} lg={9} xl={10}>
      <Card
        title={
          <div className="d-flex justify-content-between">
            <Avatar.Group>
              <Avatar
                size={50}
                shape="square"
                src={userProfle === "" ? avatar : userProfle}
              />

              <div className="avatar-info">
                <div className="">
                  {item.userDetails.firstName +
                    " " +
                    item.userDetails?.lastName}
                </div>
                <p>{item.userDetails.specialityName}</p>
              </div>
            </Avatar.Group>
            <div
              title={
                userData.favoriteDoctors.findIndex(
                  (d) =>
                    d.businessAccountFk === item.userDetails.businessAccountId
                ) >= 0
                  ? "Remove Favorite"
                  : "Add Favorite"
              }
              onClick={() => modifyFavorite()}
            >
              {userData.favoriteDoctors.findIndex(
                (d) =>
                  d.businessAccountFk === item.userDetails.businessAccountId
              ) >= 0 ? (
                <HeartFilled />
              ) : (
                <HeartOutlined />
              )}
            </div>
          </div>
        }
      >
        <div className="global-search-card-body">
          <div className="global-search-card-titles">
            Service Price : {slots[slotIndexChosen]?.servicePrice}
          </div>
          <div>
            <div className="global-search-card-titles">
              Schedule between {moment(daysOfWeek[0]).format("YYYY-MM-DD")} and{" "}
              {moment(daysOfWeek[daysOfWeek.length - 1]).format("YYYY-MM-DD")}
            </div>
            <Row className="rowgap-vbox mt-3" gutter={[24, 0]}>
              {daysOfWeek.map((day, index) => {
                return (
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    title={moment(day).format("YYYY-MM-DD")}
                    onClick={() => setDayChosen(index)}
                    key={
                      "day" + item.userDetails.businessAccountId + "" + index
                    }
                  >
                    <div
                      className={classNames(
                        "global-search-card-schedule-days",
                        {
                          "global-search-card-selected-schedule-days":
                            dayChosen === index,
                        }
                      )}
                    >
                      {moment(day).format("dd")}
                    </div>
                  </Col>
                );
              })}
            </Row>
            <div className="d-flex flex-wrap mt-3">
              {slots.length === 0
                ? "No slots"
                : slots.map((slot, index) => {
                    return (
                      <div
                        className={classNames(
                          "d-flex search-item-slot align-items-center global-search-card-schedule-slots",
                          {
                            "global-search-card-locked-schedule-slot":
                              slot.isLocked,
                            "global-search-card-reserved-schedule-slot":
                              slot.isReserved,
                            "global-search-card-selected-schedule-slot":
                              slotIndexChosen === index,
                          }
                        )}
                        onClick={() => {
                          if (slot.isLocked === false && !slot.isReserved) {
                            setSlotIndexChosen(index);
                          }
                        }}
                        key={
                          "slot" +
                          item.userDetails.businessAccountId +
                          "" +
                          index
                        }
                      >
                        {slot.isLocked && <Lock />}
                        {moment(slot.slotStartTime).format("HH:mm")} -
                        {moment(slot.slotEndTime).format("HH:mm")}
                      </div>
                    );
                  })}
            </div>
            <div className="w-100 justify-content-center d-flex mt-3">
              <Button
                type={slotIndexChosen !== -1 ? "primary" : ""}
                // disabled={slotIndexChosen === -1 || userData.userInfo.userId === item.userDetails.userId}
                disabled={slotIndexChosen === -1}
                onClick={() => reserveAppointment()}
              >
                Reserve Appointment
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
}
