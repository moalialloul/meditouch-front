import { Avatar, Badge, Button, Card, Col, Empty, Modal, Row } from "antd";
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
import {
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function SearchItem({ item }) {
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [slotLocked, setSlotLocked] = useState(-1);
  const [isSlotReserved, setIsSlotReserved] = useState(false);
  const [loadingIsReservedSlot, setLoadingIsReservedSlot] = useState(false);
  const [reservedModal, setReservedModal] = useState(false);
  const userData = useSelector((state) => state);
  const [dayChosen, setDayChosen] = useState(0);
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [appointmentModal, setAppointmentModal] = useState(false);
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
      if (
        moment(schedule[i].slotStartTime).isSameOrBefore(moment(new Date()))
      ) {
        schedule[i].disabled = true;
      } else {
        schedule[i].disabled = false;
      }
    }
    setDoctorSchedule(schedule);
  }, [item]);
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
    let schedule = [...doctorSchedule];

    schedule = schedule.filter((s) => s.slotDate === daysOfWeek[dayChosen]);
    schedule.sort(
      (a, b) => new Date(a.slotStartTime) - new Date(b.slotStartTime)
    );
    let indexOfNotLockedSlot = schedule.findIndex(
      (s) =>
        s.isLocked === false && s.isReserved === false && s.disabled === false
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
          setAppointmentModal(false);
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
  const handleOk = (e) => {
    setReservedModal(false);
    setSlotLocked(-1);
  };
  const handleCancel = (e) => {
    setReservedModal(false);
    setSlotLocked(-1);
  };
  useEffect(() => {
    if (slotLocked !== -1) {
      setLoadingIsReservedSlot(true);
      let slot = slots[slotLocked];
      userController
        .isSlotReservedByUser({
          userId: userData.userInfo.userId,
          slotFk: slot.slotId,
        })
        .then((response) => {
          setIsSlotReserved(response.data.responseCode === 200 ? true : false);
        })
        .then(() => {
          setLoadingIsReservedSlot(false);
        });
    }
  }, [slotLocked]);
  function reserveSlot() {
    userController
      .addReservationSlot({
        body: {
          userFk: userData.userInfo.userId,
          slotFk: slots[slotLocked].slotId,
        },
      })
      .then(() => {
        setReservedModal(false);
        setSlotLocked(-1);
      });
  }
  function removeReservationSlot() {
    userController
      .deleteReservationSlotBySlot({
        userFk: userData.userInfo.userId,
        slotFk: slots[slotLocked].slotId,
      })
      .then(() => {
        setReservedModal(false);
        setSlotLocked(-1);
      });
  }
  const modal = (
    <Modal
      open={reservedModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        disabled: true,
        hidden: true,
      }}
      cancelButtonProps={{
        disabled: true,
        hidden: true,
      }}
    >
      <div className="d-flex justify-content-center w-100">
        {loadingIsReservedSlot
          ? "loading..."
          : isSlotReserved
          ? "You already reserved this slot"
          : "This slot is taken. You can reserve it if the patient cancels the appointment. A notification will be sent to you when it is free"}
      </div>
      {!loadingIsReservedSlot &&
        (!isSlotReserved ? (
          <div className="d-flex justify-content-center w-100">
            <Button type="primary" onClick={() => reserveSlot()}>
              Agree
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-center w-100">
            <Button type="primary" onClick={() => removeReservationSlot()}>
              Remove Reservation
            </Button>
          </div>
        ))}
    </Modal>
  );
  const appointmentModalUi = (
    <Modal
      open={appointmentModal}
      onOk={() => {
        if (userData.userMedicalInfo.height !== 0) {
          reserveAppointment();
        } else {
          setAppointmentModal(false);
        }
      }}
      onCancel={() => setAppointmentModal(false)}
      okButtonProps={{
        disabled: false,
        hidden: false,
      }}
      cancelButtonProps={{
        disabled: true,
        hidden: true,
      }}
    >
      {userData.userMedicalInfo.height !== 0 ? (
        <div>
          Are you sure you want to reserve this appointment?
          <div>
            Doctor Name:{" "}
            {item.userDetails.firstName + " " + item.userDetails?.lastName}
          </div>
          <div>Speciality Name: {item.userDetails.specialityName}</div>
          <div>
            Service Name and Price:{" "}
            {slots[slotIndexChosen]?.serviceName +
              " for" +
              slots[slotIndexChosen]?.servicePrice +
              " " +
              slots[slotIndexChosen]?.currencyUnit}
          </div>
          <div>Appointment Time: {slots[slotIndexChosen]?.slotStartTime}</div>
        </div>
      ) : (
        <div>
          Please complete your{" "}
          <Link to="/patient-details" className="text-dark font-bold ">
            medical information
          </Link>{" "}
          to be able to reserve an appointment
        </div>
      )}
    </Modal>
  );
  return (
    <Col xs={24} sm={24} md={12} lg={9} xl={10}>
      {modal}
      {appointmentModalUi}
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
            {util.isUserAuthorized() && (
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
            )}
          </div>
        }
      >
        <div className="global-search-card-body">
          <div className="global-search-card-titles">
            {slotIndexChosen !== -1 && (
              <div>
                <div>
                  {" Service Name : " + slots[slotIndexChosen]?.serviceName}
                </div>
                <div>
                  {" Service Price : " +
                    slots[slotIndexChosen]?.servicePrice +
                    " " +
                    slots[slotIndexChosen]?.currencyUnit}
                </div>
              </div>
            )}
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
            <div
              className={classNames(
                "d-flex justify-content-center flex-wrap mt-3 global-search-card-schedule-all-slots",
                {}
              )}
            >
              {slots.length === 0 ? (
                <Empty description="No Slots" />
              ) : (
                slots.map((slot, index) => {
                  return (
                    <div
                      className={classNames(
                        "d-flex search-item-slot align-items-center global-search-card-schedule-slots",
                        {
                          "global-search-card-disabled-schedule-slot":
                            slot.disabled,
                          "global-search-card-locked-schedule-slot":
                            slot.isLocked && !slot.disabled,

                          "global-search-card-reserved-schedule-slot":
                            slot.isReserved && !slot.disabled,
                          "global-search-card-can-reserve-schedule-slot":
                            slot.isLocked === false &&
                            slot.isReserved === true &&
                            !slot.disabled,
                          "global-search-card-selected-schedule-slot":
                            slotIndexChosen === index,
                        }
                      )}
                      onClick={() => {
                        if (
                          slot.isLocked === false &&
                          slot.isReserved &&
                          !slot.disabled
                        ) {
                          setSlotLocked(index);
                          setReservedModal(true);
                        }
                        if (
                          slot.isLocked === false &&
                          !slot.isReserved &&
                          !slot.disabled
                        ) {
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
                })
              )}
            </div>
            {slots.length !== 0 && (
              <div className="d-flex align-items-center">
                <Badge status="default" />
                Reserved slots
                <div
                  style={{ cursor: "pointer" }}
                  title="Click on this slot to reserve it for futture cancelation"
                  className="mx-1"
                >
                  <ExclamationCircleOutlined />
                </div>
              </div>
            )}
            <div className="w-100 justify-content-center d-flex mt-3">
              <Button
                type={slotIndexChosen !== -1 ? "primary" : ""}
                // disabled={slotIndexChosen === -1 || userData.userInfo.userId === item.userDetails.userId}
                disabled={
                  slotIndexChosen === -1 ||
                  userData.userInfo?.userRole !== "PATIENT"
                }
                onClick={() => setAppointmentModal(true)}
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
