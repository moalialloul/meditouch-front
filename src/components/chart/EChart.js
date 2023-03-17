import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import { useEffect, useRef, useState } from "react";
import { businessAccountController } from "../../controllers/businessAccountController";
import { useSelector } from "react-redux";
import { util } from "../../public/util";
import { userController } from "../../controllers/userController";

function EChart() {
  const { Title, Paragraph } = Typography;
  const chartRef = useRef();

  const userData = useSelector((state) => state);
  const eChartOptions = eChart.options;
  const [eChartData, setEChartData] = useState({
    Approved: 0,
    Cancelled: 0,
    NotCancelled: 0,
    NotApproved: 0,
  });
  function publishChart(res, daysOfWeekDates, keys) {
    let results = res.data.results;
    let tempEChartData = { ...eChartData };
    for (let i = 0; i < results.length; i++) {
      tempEChartData.Approved =
        tempEChartData.Approved + results[i].numAppointmentsApproved;
      tempEChartData.NotApproved =
        tempEChartData.NotApproved + results[i].numAppointmentsNotApproved;
      tempEChartData.Cancelled =
        tempEChartData.Cancelled + results[i].numAppointmentsCancelled;
      tempEChartData.NotCancelled =
        tempEChartData.NotCancelled + results[i].numAppointmentsNotCancelled;
    }
    setEChartData(tempEChartData);
    let tempSeries = {
      series: [
        {
          name: "Appointments",
          data: [],
          color: "#fff",
        },
      ],
    };
    for (let i = 0; i < 7; i++) {
      let dateRecordsIndex = results.findIndex(
        (d) => d.appointmentDate === daysOfWeekDates[keys[i]]
      );
      tempSeries.series[0].data.push(
        dateRecordsIndex >= 0 ? results[dateRecordsIndex].numAppointments : 0
      );
    }
    setEChartSeries(tempSeries.series);
  }

  const [eChartSeries, setEChartSeries] = useState(eChart.series);
  useEffect(() => {
    if (
      userData.businessAccountInfo !== -1 &&
      userData.businessAccountInfo !== -2 &&
      userData.businessAccountInfo
    ) {
      let daysOfWeekDates = util.getDaysOfWeekDates();
      let firstDayDate = "";
      let lastDayDate = "";
      let keys = Object.keys(daysOfWeekDates);
      firstDayDate = daysOfWeekDates[keys[0]];
      lastDayDate = daysOfWeekDates[keys[keys.length - 1]];

      if (userData.businessAccountInfo !== -2) {
        if (userData.businessAccountInfo !== -1) {
          businessAccountController
            .getBusinessAccountAppointmentsStatistics({
              businessAccountId: userData.businessAccountInfo.businessAccountId,
              fromDate: firstDayDate,
              toDate: lastDayDate,
            })
            .then((res) => {
              publishChart(res, daysOfWeekDates, keys);
            });
        } else {
          userController
            .getUserAppointmentsStatistics({
              userFk: userData.userInfo.userId,
              fromDate: firstDayDate,
              toDate: lastDayDate,
            })
            .then((res) => {
              publishChart(res, daysOfWeekDates, keys);
            });
        }
      }
    }
  }, [userData.businessAccountInfo]);
  return (
    <>
      <div id="chart">
        <ReactApexChart
          ref={chartRef}
          className="bar-chart"
          options={eChartOptions}
          series={eChartSeries}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>This Week Appointments</Title>
        <Paragraph className="lastweek">
          {/* than last week <span className="bnb2">+30%</span> */}
        </Paragraph>
        <Paragraph className="lastweek">
          General statistics of your this week appointments till now
        </Paragraph>
        <Row gutter>
          {Object.keys(eChartData).map((key, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{key}</Title>
                <span>{eChartData[key]}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
