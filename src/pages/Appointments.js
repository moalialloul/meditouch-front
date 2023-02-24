import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import "../assets/styles/appointments.css";

import avatar from "../assets/images/avatar.jpg";
import Main from "../components/layout/Main";
import { useEffect, useState } from "react";
import { businessAccountController } from "../controllers/businessAccountController";
import { useSelector } from "react-redux";
import { userController } from "../controllers/userController";
import Calendar from "../icons/calendar";
import Dollor from "../icons/dollor";
import moment from "moment";

const { Title } = Typography;

function Appointments() {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [filters, setFilters] = useState({
    isApproved: false,
    isCancelled: false,
    appointmentStatus: null,
    isUpcoming: false,
    isAll: true,
    withFilters: false,
  });
  function acceptAppointment(i) {
    let newData = [...upcomingAppointments];
    userController
      .updateAppointment({
        body: {
          appointmentActualStartTime: newData[i].appointmentActualStartTime,
          appointmentActualEndTime: newData[i].appointmentActualEndTime,
          appointmentStatus: "ACCEPTED",
          isApproved: 1,
          isCancelled: 0,
          appointmentId: newData[i].appointmentId,
        },
      })
      .then(() => {
        debugger;

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
    if (userData.businessAccountInfo) {
      if (userData.userInfo) {
        let jsonFilter = {};
        if (filters.isAll) {
          jsonFilter.isAll = true;
        } else {
          jsonFilter.isAll = false;

          jsonFilter.isUpcoming = filters.isUpcoming;
        }
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
            body: jsonFilter,
          })
          .then((response) => {
            let appointmentsData = response.data.appointments;
            setUpcomingAppointments((app) => [...app, ...appointmentsData]);

            setTotalNumberOfPages(response.data.totalNumberOfPages);
          })
          .then(() => {
            setLoading(false);
          });
      }
    }
  }, [userData.businessAccountInfo, userData.userInfo, pageNumber, filters]);
  const onChange = (e) => {
    let val = e.target.value;
    let tempFilter = { ...filters };
    if (val === "upcoming") {
      tempFilter.isAll = false;
      tempFilter.isUpcoming = true;
    }
    if (val === "history") {
      tempFilter.isAll = false;
      tempFilter.isUpcoming = false;
    }
    if (val === "all") {
      tempFilter.isAll = true;
      tempFilter.isUpcoming = false;
    }
    setUpcomingAppointments([]);
    setPageNumber(1);
    setFilters(tempFilter);
  };
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
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="upcoming">Upcoming</Radio.Button>
                    <Radio.Button value="history">History</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="appointments-wrapper row d-flex flex-wrap justify-content-between">
                {upcomingAppointments.map((ap, index) => (
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {!loading && upcomingAppointments.length === 0 && (
                <div
                  style={{
                    textAlign: "center",

                    lineHeight: "32px",
                  }}
                >
                  <Button onClick={() => setPageNumber(pageNumber + 1)}>
                    no data
                  </Button>
                </div>
              )}
              {loading && (
                <div
                  style={{
                    textAlign: "center",

                    lineHeight: "32px",
                  }}
                >
                  <Button onClick={() => setPageNumber(pageNumber + 1)}>
                    loading
                  </Button>
                </div>
              )}
              {totalNumberOfPages > pageNumber && !loading && (
                <div
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
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default Appointments;
