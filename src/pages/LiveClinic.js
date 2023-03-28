import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Card, Col, Typography, Timeline, Modal } from "antd";
import Title from "antd/lib/skeleton/Title";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../assets/styles/schedule.css";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { userController } from "../controllers/userController";
import { util } from "../public/util";

export default function LiveClinic() {
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const userData = useSelector((state) => state);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(-1);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [message, setMessage] = useState("Work in progress...");
  const [medicalInfoModal, setMedicalInfoModal] = useState(false);
  const [viewMedicalInfoIndex, setViewMedicalInfoIndex] = useState(-1);
  useEffect(() => {
    if (!userData.loadingApp) {
      let tempCurrentAppointmentIndex = -1;

      businessAccountController
        .getTodaysAppointments({
          businessAccountId: userData.businessAccountInfo.businessAccountId,
        })
        .then((response) => {
          let data = response.data.appointments;
          for (let i = 0; i < data.length; i++) {
            data[i].appointmentActualStartTime =
              data[i].appointmentActualStartTime !== -1
                ? moment(
                    util.formatTimeByOffset(
                      new Date(
                        moment(
                          data[i].appointmentActualStartTime,
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      )
                    ),
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("YYYY-MM-DD HH:mm:ss")
                : -1;
            data[i].appointmentActualEndTime =
              data[i].appointmentActualEndTime !== -1
                ? moment(
                    util.formatTimeByOffset(
                      new Date(
                        moment(
                          data[i].appointmentActualEndTime,
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      )
                    ),
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("YYYY-MM-DD HH:mm:ss")
                : -1;
            data[i].started =
              data[i].appointmentActualStartTime !== -1 ? true : false;
            data[i].ended =
              data[i].appointmentActualEndTime !== -1 ? true : false;
            data[i].timeEnded = false;
            if (
              data[i].appointmentActualStartTime !== -1 &&
              data[i].appointmentActualEndTime === -1
            ) {
              tempCurrentAppointmentIndex = i;
            }
          }
          if (
            data.filter(
              (ap) =>
                ap.appointmentActualEndTime !== -1 &&
                ap.appointmentActualStartTime !== -1
            ).length === data.length
          ) {
            setMessage("You're done for today");
          }
          setAppointments(data);
        })
        .then(() => {
          setCurrentAppointmentIndex(tempCurrentAppointmentIndex);

          setLoading(false);
        });
    }
  }, [userData.loadingApp]);
  function modifyAppointment(key, index) {
    let tempAppointments = [...appointments];
    tempAppointments[index][key] = true;
    setAppointments(tempAppointments);
    setMinutesRemaining(
      moment(tempAppointments[index].slotEndTime).diff(
        tempAppointments[index].slotStartTime,
        "minutes"
      ) - 1
    );
    setSecondsRemaining(59);
    if (key === "started") {
      tempAppointments[index]["appointmentActualStartTime"] = util
        .convertTZ(
          moment(moment(new Date())).format("YYYY/MM/DD HH:mm:ss").toString(),
          "Europe/Paris"
        )
        .format("YYYY-MM-DDTHH:mm:ss")
        .toString();

      userController
        .updateAppointment({
          body: {
            appointmentActualStartTime:
              tempAppointments[index]["appointmentActualStartTime"],
            appointmentActualEndTime: null,
            appointmentStatus: "ACCEPTED",
            isApproved: 1,
            isCancelled: 0,
            userFk: tempAppointments[index].userFk,
            appointmentId: tempAppointments[index].appointmentId,
          },
        })
        .then(() => {
          setCurrentAppointmentIndex(index);
        });
    } else if (key === "ended") {
      if (index === appointments.length - 1) {
        setMessage("You're done for today");
      }
      tempAppointments[index]["appointmentActualEndTime"] = util
        .convertTZ(
          moment(moment(new Date())).format("YYYY/MM/DD HH:mm:ss").toString(),
          "Europe/Paris"
        )
        .format("YYYY-MM-DDTHH:mm:ss")
        .toString();
      userController
        .updateAppointment({
          body: {
            appointmentActualStartTime: moment(
              tempAppointments[index]["appointmentActualStartTime"]
            ).format("YYYY-MM-DDTHH:mm:ss"),
            appointmentActualEndTime:
              tempAppointments[index]["appointmentActualEndTime"],
            appointmentStatus: "ACCEPTED",
            isApproved: 1,
            userFk:
              index === appointments.length - 1
                ? -1
                : tempAppointments[index + 1].userFk,
            isCancelled: 0,
            appointmentId: tempAppointments[index].appointmentId,
          },
        })
        .then(() => {
          setCurrentAppointmentIndex(-1);
        });
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentAppointmentIndex === -1) {
        clearInterval(intervalId);
      } else {
        if (secondsRemaining === 0) {
          if (minutesRemaining === 0) {
            modifyAppointment("timeEnded", currentAppointmentIndex);
            setCurrentAppointmentIndex(-1);
            clearInterval(intervalId);
          } else {
            setMinutesRemaining((prevMinutes) => prevMinutes - 1);
            setSecondsRemaining(59);
          }
        } else {
          setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentAppointmentIndex, minutesRemaining, secondsRemaining]);
  function modifyAppointmentPrescription(t, index) {
    if (t.prescriptionId === -1) {
      businessAccountController
        .addAppointmentPrescription({
          body: {
            appointmentFk: t.appointmentId,
            prescriptionDescription: "test",
          },
        })
        .then((response) => {
          let prescriptionId = response.data.result.prescriptionId;
          let tempAppointments = [...appointments];
          tempAppointments[index].prescriptionId = prescriptionId;
          setAppointments(tempAppointments);
        });
    } else {
      businessAccountController.updateAppointmentPrescription({
        body: {
          prescriptionId: t.prescriptionId,
          prescriptionDescription: "test2",
          appointmentFk: t.appointmentId,
        },
      });
    }
  }
  const handleOk = (e) => {
    setMedicalInfoModal(false);
  };
  const handleCancel = (e) => {
    setMedicalInfoModal(false);
  };
  const modal = (
    <Modal
      open={medicalInfoModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        disabled: false,
        hidden: false,
      }}
      cancelButtonProps={{
        disabled: true,
        hidden: true,
      }}
    >
      <div >Height : {appointments[viewMedicalInfoIndex]?.height + " cm"}</div>
      <div className="mt-2">Weight : {appointments[viewMedicalInfoIndex]?.weight + " Kg"}</div>
      <div className="mt-2">Diseases : {appointments[viewMedicalInfoIndex]?.diseasesDescription}</div>
      <div className="mt-2">Vacination : {appointments[viewMedicalInfoIndex]?.vaccinationDescription}</div>

    </Modal>
  );

  return (
    <Main>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
        {modal}
        <Card bordered={false} className="criclebox h-full">
          <div className="timeline-box">
            {loading ? (
              "Loading..."
            ) : !loading && appointments.length === 0 ? (
              "no appointments"
            ) : (
              <div className="d-flex flex-column">
                {message}
                <Timeline
                  className="timelinelist mt-3"
                  //   reverse={reverse}
                >
                  {appointments.map((t, index) => (
                    <Timeline.Item key={index}>
                      <Title level={5}>
                        {"Appointment with " + t.firstName + " " + t.lastName}
                      </Title>
                      <div className="d-flex flex-column">
                        <Text>{t.slotStartTime}</Text>
                        <Text>
                          Appointment Duration:{" "}
                          {moment(t.slotEndTime).diff(
                            t.slotStartTime,
                            "minutes"
                          )}{" "}
                          mins
                        </Text>
                        {t.started === true &&
                          currentAppointmentIndex !== -1 &&
                          t.ended === false && (
                            <Text>
                              {t.appointmentActualStartTime !== -1 &&
                                t.appointmentActualEndTime === -1 &&
                                "Actual Start Time " +
                                  moment(t.appointmentActualStartTime).format(
                                    "HH:mm:ss"
                                  )}
                            </Text>
                          )}

                        <Text>
                          <Button
                            onClick={() => modifyAppointment("started", index)}
                            disabled={
                              index === 0
                                ? t.started === true
                                : t.started === true ||
                                  appointments[index - 1].ended === false
                            }
                            type="primary"
                            className="me-3 mt-2"
                          >
                            Start
                          </Button>
                          <Button
                            onClick={() => modifyAppointment("ended", index)}
                            disabled={
                              t.started === false ||
                              t.appointmentActualEndTime !== -1
                            }
                            danger
                            className="me-3 mt-2"
                          >
                            End
                          </Button>
                          <Button
                            onClick={() => {
                              setViewMedicalInfoIndex(index);
                              setMedicalInfoModal(true);
                            }}
                            type="primary"
                            className="me-3 mt-2"
                          >
                            Medical Info
                          </Button>
                          {t.started === true && t.ended === true && (
                            <Button
                              onClick={() =>
                                modifyAppointmentPrescription(t, index)
                              }
                              type="primary"
                            >
                              {t.prescriptionId === -1
                                ? " Add Appointment Prescription"
                                : " Edit Appointment Prescription"}
                            </Button>
                          )}
                        </Text>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            )}
          </div>
        </Card>
      </Col>
    </Main>
  );
}
