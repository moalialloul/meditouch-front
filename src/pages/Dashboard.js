import { useEffect, useState } from "react";

import { Card, Col, Row, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

import card from "../assets/images/info-card-1.jpg";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { useSelector } from "react-redux";
import Dollor from "../icons/dollor";
import Profile from "../icons/profile";
import Heart from "../icons/heart";
import Cart from "../icons/cart";
import { util } from "../public/util";
import moment from "moment";
import { userController } from "../controllers/userController";

export default function Dashboard() {
  const count = [
    {
      today: "Total Appointments",
      title: "$53,000",
      icon: <Dollor />,
      bnb: "bnb2",
      key: "totalAppointments",
    },
    {
      today: "Total Patients",
      title: "3,200",
      icon: <Profile />,
      bnb: "bnb2",
      key: "totalPatients",
    },
    {
      today: "Total Blocked Users",
      title: "+1,200",
      icon: <Heart />,
      bnb: "bnb2",
      key: "totalBlockedUsers",
    },
    {
      today: "Total Referrals",
      title: "$13,200",
      icon: <Cart />,
      bnb: "bnb2",
      key: "totalReferrals",
    },
  ];

  const count2 = [
    {
      today: "Total Appointments",
      title: "$53,000",
      icon: <Dollor />,
      bnb: "bnb2",
      key: "totalAppointments",
    },
    {
      today: "Total Done Appointments",
      title: "3,200",
      icon: <Profile />,
      bnb: "bnb2",
      key: "totalDoneAppointments",
    },
    {
      today: "Total Accepted Appointments",
      title: "+1,200",
      icon: <Heart />,
      bnb: "bnb2",
      key: "totalAcceptedAppointments",
    },
    {
      today: "Total Rejected Appointments",
      title: "$13,200",
      icon: <Cart />,
      bnb: "bnb2",
      key: "totalRejectedAppointments",
    },
  ];
  const userData = useSelector((state) => state);
  const [cardsStatistics, setCardsStatisitcs] = useState({
    totalReferrals: 0,
    totalBlockedUsers: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalAcceptedAppointments: 0,
    totalRejectedAppointments: 0,
    totalDoneAppointments: 0,
  });
  const { Title, Text } = Typography;

  const [appointmentsData, setAppointmentsData] = useState({});
  useEffect(() => {
    if (userData.businessAccountInfo) {
      if (userData.businessAccountInfo !== -1) {
        businessAccountController
          .getBusinessAccountStatistics({
            businessAccountId: userData.businessAccountInfo.businessAccountId,
          })
          .then((response) => {
            setCardsStatisitcs(response.data.result);
          });
      } else {
        if (userData.userInfo) {
          userController
            .getUserStatistics({ userFk: userData.userInfo.userId })
            .then((response) => {
              setCardsStatisitcs(response.data.result);
            });
        }
      }
      if (userData.userInfo) {
        businessAccountController
          .getAppointments({
            userType: userData.userInfo.userRole,
            id:
              userData.userInfo.userRole === "PATIENT"
                ? userData.userInfo.userId
                : userData.businessAccountInfo.businessAccountId,
            pageNumber: 1,
            recordsByPage: 4,
            body: {
              appointmentStatus: "",
              appointmentType: "ALL",
              isCancelled: -1,
            },
          })
          .then((response) => {
            let data = response.data;
            for (let i = 0; i < data.length; i++) {
              data[i].appointmentActualStartTime = moment(
                util.formatTimeByOffset(
                  new Date(
                    moment(
                      data[i].appointmentActualStartTime,
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                ),
                "YYYY-MM-DD HH:mm:ss"
              ).format("YYYY-MM-DD HH:mm:ss");
              data[i].appointmentActualEndTime = moment(
                util.formatTimeByOffset(
                  new Date(
                    moment(
                      data[i].appointmentActualEndTime,
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                ),
                "YYYY-MM-DD HH:mm:ss"
              ).format("YYYY-MM-DD HH:mm:ss");
            }
            setAppointmentsData(data);
          });
      }
    } else {
    }
  }, [userData.businessAccountInfo, userData.userInfo]);

  return (
    <Main>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {Array.from(userData.businessAccountInfo === -1 ? count2 : count).map(
            (c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c.today}</span>
                        <Title level={3}>{cardsStatistics[c.key]}</Title>
                      </Col>
                      <Col xs={6}>
                        <div className="icon-box">{c.icon}</div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            )
          )}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody ">
              <div className="project-ant">
                <div>
                  <Title level={5}>Appointments</Title>
                  <Paragraph className="lastweek">
                    {/* done this month<span className="blue">40%</span> */}
                  </Paragraph>
                </div>
                {/* <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div> */}
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>
                        {userData.userInfo?.userRole === "PATIENT"
                          ? "DOCTOR NAME"
                          : "PATIENT NAME"}
                      </th>
                      <th>SERVICE NAME</th>
                      <th>BUDGET</th>
                      <th>DATETIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentsData.appointments?.map((ap, index) => (
                      <tr key={index}>
                        <td>
                          <h6>{ap.firstName + " " + ap.lastName}</h6>
                        </td>
                        <td>{ap.serviceName}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {ap.servicePrice + "" + ap.currencyUnit}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">
                            {ap.slotStartTime}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload>
              </div> */}
            </Card>
          </Col>
          {/* <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col> */}
        </Row>

        {/* <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by developers</Text>
                      <Title level={5}>MediTouch Dashboard</Title>
                      <Paragraph className="lastweek mb-36">
                        From colors, cards, typography to complex elements, you
                        will find the full documentation.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>Work with the best</Title>
                  <p>
                    Wealth creation is an evolutionarily recent positive-sum
                    game. It is all about who take the opportunity first.
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="#pablo">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row> */}
      </div>
    </Main>
  );
}
