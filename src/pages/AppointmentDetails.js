import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { util } from "../public/util";

export default function AppointmentDetails() {
  const [appointmentData, setAppointmentData] = useState({});
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state);

  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.loadingApp) {
      if (!state) {
        if (util.isUserAuthorized()) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setLoading(true);
        businessAccountController
          .getAppointmentById({ appointmentFk: state.appointmentId })
          .then((response) => {
            setAppointmentData(response.data.appointment);
          })
          .then(() => {
            setLoading(false);
          });
      }
    }
  }, [state, userData.loadingApp]);
  return (
    <Main>
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <>
          <div>
            Patient Name:{" "}
            {appointmentData.patientFirstName +
              " " +
              appointmentData.patientLastName}
          </div>
          <div>
            Doctor Name:{" "}
            {appointmentData.doctorFirstName +
              " " +
              appointmentData.doctorLastName}
          </div>
          <div>Description : {appointmentData.appointmentDescription}</div>
        </>
      )}
    </Main>
  );
}
