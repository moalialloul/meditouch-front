import { Row, Col, Card, Button, Select, Tag } from "antd";

import "../assets/styles/appointments.css";

import avatar from "../assets/images/avatar.jpg";
import Main from "../components/layout/Main";
import { useEffect, useState } from "react";
import { businessAccountController } from "../controllers/businessAccountController";
import { useDispatch, useSelector } from "react-redux";
import { userController } from "../controllers/userController";
import Calendar from "../icons/calendar";
import Dollor from "../icons/dollor";
import { useNavigate } from "react-router-dom";
import { util } from "../public/util";
import moment from "moment";

function Appointments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [filters, setFilters] = useState({
    appointmentStatus: "",
    appointmentType: "ALL",
    isCancelled: -1,
  });
  function acceptAppointment(i) {
    let newData = [...upcomingAppointments];
    userController
      .updateAppointment({
        body: {
          appointmentActualStartTime: new Date(
            newData[i].appointmentActualStartTime
          ),
          appointmentActualEndTime: new Date(
            newData[i].appointmentActualEndTime
          ),
          appointmentStatus: "ACCEPTED",
          isApproved: 1,
          isCancelled: 0,
          appointmentId: newData[i].appointmentId,
        },
      })
      .then(() => {
        newData[i].appointmentStatus = "ACCEPTED";
        newData[i].isApproved = 1;
        newData[i].isCancelled = 0;
        setUpcomingAppointments(newData);
      });
  }
  function rejectAppointment(i) {
    let newData = [...upcomingAppointments];
    userController
      .updateAppointment({
        body: {
          appointmentActualStartTime: newData[i].appointmentActualStartTime,
          appointmentActualEndTime: newData[i].appointmentActualEndTime,
          appointmentStatus: "REJECTED",
          isApproved: 1,
          isCancelled: 0,
          appointmentId: newData[i].appointmentId,
        },
      })
      .then(() => {
        newData[i].appointmentStatus = "REJECTED";
        newData[i].isApproved = 0;
        newData[i].isCancelled = 0;
        setUpcomingAppointments(newData);
      });
  }
  useEffect(() => {
    if (userData.userInfo) {
      if (userData.businessAccountInfo) {
        setLoading(true);
        businessAccountController
          .getAppointments({
            userType: userData.userInfo.userRole,
            id:
              userData.userInfo.userRole === "PATIENT"
                ? userData.userInfo.userId
                : userData.businessAccountInfo.businessAccountId,
            pageNumber: pageNumber,
            recordsByPage: 2,
            body: filters,
          })
          .then((response) => {
            let appointmentsData = response.data.appointments;
            for(let i = 0 ; i < appointmentsData.length ; i++){
              appointmentsData[i].appointmentActualStartTime = moment(
                util.formatTimeByOffset(new Date(moment(appointmentsData[i].appointmentActualStartTime, "YYYY-MM-DD HH:mm:ss"))),
                "YYYY-MM-DD HH:mm:ss"
              ).format("YYYY-MM-DD HH:mm:ss");
              appointmentsData[i].appointmentActualEndTime = moment(
                util.formatTimeByOffset(new Date(moment(appointmentsData[i].appointmentActualEndTime, "YYYY-MM-DD HH:mm:ss"))),
                "YYYY-MM-DD HH:mm:ss"
              ).format("YYYY-MM-DD HH:mm:ss")
            }
            setUpcomingAppointments((app) => [...app, ...appointmentsData]);

            setTotalNumberOfPages(response.data.totalNumberOfPages);
          })
          .then(() => {
            setLoading(false);
          });
      }
    }
  }, [userData.businessAccountInfo, userData.userInfo, pageNumber, filters]);
  useEffect(() => {
    let allMyAppointments = [...upcomingAppointments];
    dispatch({
      type: "SET_MY_APPOINTMENTS",
      myAppointments: allMyAppointments,
    });
  }, [upcomingAppointments]);
  const [options, setOptions] = useState([
    { id: 2, value: "Upcoming" },
    { id: 3, value: "History" },
    { id: 4, value: "Accepted" },
    { id: 5, value: "Pending" },
    { id: 6, value: "Rejected" },
    { id: 7, value: "Cancelled" },
    { id: 8, value: "Not Cancelled" },
  ]);

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"black"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  function onChangeFilters(e) {
    let array = e;
    let tempOptions = [...options];

    let indexOfCancelled = array.findIndex((u) => u === "Cancelled");
    let indexOfNotCancelled = array.findIndex((u) => u === "Not Cancelled");
    if (array[array.length - 1] === "All") {
      let index = tempOptions.findIndex((u) => u.value === "Upcoming");
      tempOptions.splice(index, 1);
      index = tempOptions.findIndex((u) => u.value === "History");
      tempOptions.splice(index, 1);
    } else if (array[array.length - 1] === "Upcoming") {
      let index = tempOptions.findIndex((u) => u.value === "History");
      tempOptions.splice(index, 1);
    } else if (array[array.length - 1] === "History") {
      let index = tempOptions.findIndex((u) => u.value === "Upcoming");
      tempOptions.splice(index, 1);
    } else {
      if (tempOptions.findIndex((u) => u.value === "Upcoming") < 0) {
        tempOptions.push({
          id: 2,
          value: "Upcoming",
        });
      }
      if (tempOptions.findIndex((u) => u.value === "History") < 0) {
        tempOptions.push({
          id: 3,
          value: "History",
        });
      }
    }

    if (array[array.length - 1] === "Accepted") {
      let index = tempOptions.findIndex((u) => u.value === "Rejected");
      tempOptions.splice(index, 1);
      index = tempOptions.findIndex((u) => u.value === "Pending");
      tempOptions.splice(index, 1);
    } else if (array[array.length - 1] === "Rejected") {
      let index = tempOptions.findIndex((u) => u.value === "Accepted");
      tempOptions.splice(index, 1);
      index = tempOptions.findIndex((u) => u.value === "Pending");
      tempOptions.splice(index, 1);
    } else if (array[array.length - 1] === "Pending") {
      let index = tempOptions.findIndex((u) => u.value === "Accepted");
      tempOptions.splice(index, 1);
      index = tempOptions.findIndex((u) => u.value === "Rejected");
      tempOptions.splice(index, 1);
    } else {
      if (tempOptions.findIndex((u) => u.value === "Accepted") < 0) {
        tempOptions.push({
          id: 4,
          value: "Accepted",
        });
      }
      if (tempOptions.findIndex((u) => u.value === "Pending") < 0) {
        tempOptions.push({
          id: 5,
          value: "Pending",
        });
      }
      if (tempOptions.findIndex((u) => u.value === "Rejected") < 0) {
        tempOptions.push({
          id: 6,
          value: "Rejected",
        });
      }
    }
    if (indexOfCancelled >= 0) {
      let index = tempOptions.findIndex((u) => u.value === "Not Cancelled");
      tempOptions.splice(index, 1);
    } else {
      let index = tempOptions.findIndex((u) => u.value === "Cancelled");
      if (index < 0) {
        tempOptions.push({
          id: 7,
          value: "Cancelled",
        });
      }
    }
    if (indexOfNotCancelled >= 0) {
      let index = tempOptions.findIndex((u) => u.value === "Cancelled");
      tempOptions.splice(index, 1);
    } else {
      let index = tempOptions.findIndex((u) => u.value === "Not Cancelled");
      if (index < 0 && indexOfCancelled < 0) {
        tempOptions.push({
          id: 8,
          value: "Not Cancelled",
        });
      }
    }
    tempOptions.sort(function (a, b) {
      return parseInt(a.id) - parseInt(b.id);
    });
    let tempFilters = {
      appointmentStatus: "",
      appointmentType: "ALL",
      isCancelled: -1,
    };
    if (array.findIndex((u) => u === "All") >= 0) {
      tempFilters.appointmentType = "ALL";
    } else if (array.findIndex((u) => u === "Upcoming") >= 0) {
      tempFilters.appointmentType = "UPCOMING";
    } else if (array.findIndex((u) => u === "History") >= 0) {
      tempFilters.appointmentType = "HISTORY";
    }

    if (array.findIndex((u) => u === "Accepted") >= 0) {
      tempFilters.appointmentStatus = "ACCEPTED";
    } else if (array.findIndex((u) => u === "Rejected") >= 0) {
      tempFilters.appointmentStatus = "REJECTED";
    } else if (array.findIndex((u) => u === "Pending") >= 0) {
      tempFilters.appointmentStatus = "PENDING";
    }
    if (array.findIndex((u) => u === "Cancelled") >= 0) {
      tempFilters.isCancelled = 1;
    } else if (array.findIndex((u) => u === "Not Cancelled") >= 0) {
      tempFilters.isCancelled = 0;
    }
    setUpcomingAppointments([]);
    setPageNumber(1);
    setFilters(tempFilters);
    setOptions(tempOptions);
  }
  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All Appointments"
              extra={
                <Select
                  mode="multiple"
                  placeholder="Select filter"
                  onChange={onChangeFilters}
                  showArrow
                  tagRender={tagRender}
                  style={{ width: "200px" }}
                  options={options}
                />
              }
            >
              <div className="appointments-wrapper row d-flex flex-wrap justify-content-between">
                {userData.myAppointments.map((ap, index) => (
                  <div
                    key={index}
                    className="col-lg-5 col-md-5 col-sm-12 appointment-card mt-1"
                  >
                    <div className="d-flex flex-column ">
                      <div className="d-flex align-items-center">
                        <div className="appointment-profile">
                          <img src={avatar} className="" alt="" />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          {ap.firstName + " " + ap.lastName}
                          {ap.serviceName}
                          <div className="appointment-status">
                            {ap.appointmentStatus}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <div>Service Name</div>
                        <div>{ap.serviceName}</div>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center appointment-datetime">
                          <Calendar />
                          {ap.slotStartTime}
                        </div>
                        <div className="d-flex align-items-center appointment-datetime">
                          <Dollor color={"black"} />
                          {ap.servicePrice + "" + ap.currencyUnit}
                        </div>
                      </div>
                      {userData.userInfo?.userRole !== "PATIENT" && (
                        <div className="mt-3">
                          {ap.appointmentStatus === "PENDING" ? (
                            <div className="d-flex  w-100 justify-content-between">
                              <Button
                                type="primary"
                                className="w-50"
                                onClick={() => acceptAppointment(index)}
                              >
                                Accept
                              </Button>
                              <Button
                                className="w-50 mx-2"
                                danger
                                onClick={() => rejectAppointment(index)}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : ap.appointmentStatus === "ACCEPTED" ? (
                            <Button type="primary" disabled className="w-100">
                              Accepted
                            </Button>
                          ) : (
                            <Button danger className="w-100">
                              Rejected
                            </Button>
                          )}
                          {ap.appointmentActualEndTime !== null &&
                            ap.appointmentActualStartTime !== null && (
                              <Button
                                type="primary"
                                className="w-100"
                                onClick={() => {
                                  navigate("/referral", {
                                    state: {
                                      appointment: ap,
                                    },
                                  });
                                }}
                              >
                                Refer Doctor
                              </Button>
                            )}
                        </div>
                      )}
                      {userData.userInfo?.userRole === "PATIENT" &&
                        (ap.prescriptionId === -1 ? (
                          "Prescription In Progress"
                        ) : (
                          <Button type="primary">View Prescription</Button>
                        ))}
                    </div>
                  </div>
                ))}
                {!loading && upcomingAppointments.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",

                      lineHeight: "32px",
                    }}
                  >
                    <Button>no data</Button>
                  </div>
                )}
                {loading && (
                  <div
                    className="mt-3"
                    style={{
                      textAlign: "center",

                      lineHeight: "32px",
                    }}
                  >
                    <Button
                      loading={loading}
                      onClick={() => setPageNumber(pageNumber + 1)}
                    >
                      loading
                    </Button>
                  </div>
                )}
                {totalNumberOfPages > pageNumber && !loading && (
                  <div
                    className="mt-3"
                    style={{
                      textAlign: "center",

                      lineHeight: "32px",
                    }}
                  >
                    <Button onClick={() => setPageNumber(pageNumber + 1)}>
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default Appointments;
