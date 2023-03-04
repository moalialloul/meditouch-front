import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Card, Col, Typography, Timeline } from "antd";
import Title from "antd/lib/skeleton/Title";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../assets/styles/schedule.css";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";

export default function LiveClinic() {
  const { Title, Text } = Typography;

  const [appointments, setAppointments] = useState([]);
  const userData = useSelector((state) => state);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(-1);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (userData.businessAccountInfo) {
      businessAccountController
        .getTodaysAppointments({
          businessAccountId: userData.businessAccountInfo.businessAccountId,
        })
        .then((response) => {
          let data = response.data.appointments;
          for (let i = 0; i < data.length; i++) {
            data[i].started = false;
            data[i].ended = false;
            data[i].timeEnded = false;
          }
          setAppointments(data);
        });
    }
  }, [userData.businessAccountInfo]);
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
      setCurrentAppointmentIndex(index);
    } else if (key === "ended") {
      setCurrentAppointmentIndex(-1);
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

  return (
    <Main>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
        <Card bordered={false} className="criclebox h-full">
          <div className="timeline-box">
            <Timeline
              className="timelinelist"
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
                      {moment(t.slotEndTime).diff(t.slotStartTime, "minutes")}{" "}
                      mins
                    </Text>
                    {t.started === true &&
                      currentAppointmentIndex !== -1 &&
                      t.ended === false && (
                        <Text>
                          Time Remaining{" "}
                          {minutesRemaining.toString().padStart(2, "0") +
                            ":" +
                            secondsRemaining.toString().padStart(2, "0")}
                        </Text>
                      )}
                    {t.timeEnded === true && (
                      <Text>Appointment Time is over</Text>
                    )}
                    <Text>
                      <Button
                        onClick={() => modifyAppointment("started", index)}
                        disabled={
                          appointments[index - 1]?.ended === false ||
                          t.started === true
                        }
                        type="primary"
                      >
                        Start
                      </Button>
                      <Button
                        onClick={() => modifyAppointment("ended", index)}
                        disabled={t.started === false || t.ended === true}
                        danger
                      >
                        End
                      </Button>
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Card>
      </Col>
    </Main>
  );
}
