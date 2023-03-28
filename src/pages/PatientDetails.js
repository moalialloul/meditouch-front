import { Button, Card, Col, Descriptions, Layout, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userController } from "../controllers/userController";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { util } from "../public/util";
import LayoutWrapper from "../components/Layout";
import { Modal, ModalBody } from "react-bootstrap";
import CancelIcon from "../icons/CancelIcon";
import patientImg from "../assets/images/patient.png";
import Main from "../components/layout/Main";
import { toast } from "react-toastify";
export default function PatientDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const [completed, setCompleted] = useState(false);
  const [patientModal, setPatientModal] = useState(false);
  const [medicalInformation, setMedicalInformation] = useState({
    height: "",
    weight: "",
    diseasesDescription: "",
    vaccinationDescription: "",
  });
  function updateMedicalInformation(key, value) {
    let tempMedicalInformation = { ...medicalInformation };
    tempMedicalInformation[key] = value;
    setMedicalInformation(tempMedicalInformation);
  }
  function addMedicalInformation() {
    if (
      medicalInformation.height.toString().replace(/\s+/g, "") !== "" &&
      medicalInformation.weight.toString().replace(/\s+/g, "") !== "" &&
      medicalInformation.diseasesDescription.replace(/\s+/g, "") !== "" &&
      medicalInformation.vaccinationDescription.replace(/\s+/g, "") !== ""
    ) {
      userController
        .setMedicalInformation({
          body: {
            userFk: state ? state.userId : userData.userInfo.userId,
            ...medicalInformation,
          },
        })
        .then(() => {
          dispatch({
            type: "SET_MEDICAL_INFO",
            userMedicalInfo: { ...medicalInformation },
          });
          setCompleted(true);
        });
    } else {
    
      toast.error("info required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  }
  useEffect(() => {
    setMedicalInformation(userData.userMedicalInfo);
  }, [userData.userMedicalInfo]);

  return !completed ? (
   <LayoutWrapper  withFooter={true}>
        <Layout
        className="layout-default layout-signin"
        style={{ padding: "200px" }}
      >
       
      <Row gutter={[24, 0]} justify="center">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
          <img src={patientImg} alt="" className="patient-image" />
        </Col>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            title={<div className="m-0 text-center all-txts">Patient Details</div>}
            className="header-solid h-full card-profile-information  "
            extra={<Button type="link">{}</Button>}
            bodyStyle={{ paddingTop: 0 }}
          >
            <div className="d-flex flex-column" style={{gap:"20px"}}>
            <div className="all-txts" >
              Height (cm)*{" "}
            </div>
            <input
            className="patient-details-input"
              type="number"
              onChange={(e) =>
                updateMedicalInformation("height", parseInt(e.target.value))
              }
              value={medicalInformation.height}
              placeholder="height"
            />
            <div className="all-txts">
              {" "}
              Weight (kg)*
            </div>
            <input
              className="patient-details-input"
              type="number"
              onChange={(e) =>
                updateMedicalInformation("weight", parseInt(e.target.value))
              }
              value={medicalInformation.weight}
              placeholder="weight"
            />
            <div className="all-txts">
              Diseases*
            </div>
            <input
              className="patient-details-input"
              type="text"
              onChange={(e) =>
                updateMedicalInformation("diseasesDescription", e.target.value)
              }
              value={medicalInformation.diseasesDescription}
              placeholder="diseasesDescription"
            />
            <div className="all-txts">
              Vaccination*
            </div>
            <input
              className="patient-details-input"
              type="text"
              onChange={(e) =>
                updateMedicalInformation(
                  "vaccinationDescription",
                  e.target.value
                )
              }
              value={medicalInformation.vaccinationDescription}
              placeholder="vaccinationDescription"
            />
            <Button type="primary" onClick={() => addMedicalInformation()}>
              Update
            </Button>
            </div>
          </Card>
        </Col>
      </Row>
      
      </Layout>
      </LayoutWrapper>  
   
  ) : (
    <LayoutWrapper  withFooter={true}>
    <Layout
    className="layout-default layout-signin"
    style={{ padding: "200px" }}
  >
    <Result
      icon={<SmileOutlined />}
      title="Great, we have done all the operations!"
      extra={
        <Button
          onClick={() => {
            if (util.isUserAuthorized()) {
              navigate("/dashboard");
            } else {
              navigate("/sign-in");
            }
          }}
          type="primary"
        >
          Next
        </Button>
      }
    />
    
    </Layout>
      </LayoutWrapper>
  );
}
