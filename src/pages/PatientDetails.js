import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userController } from "../controllers/userController";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
export default function PatientDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const [completed, setCompleted] = useState(false);
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
      alert("info required");
    }
  }
  useEffect(() => {
    setMedicalInformation(userData.userMedicalInfo);
  }, [userData.userMedicalInfo]);
  return !completed ? (
    <div>
      height (cm)*{" "}
      <input
        type="number"
        onChange={(e) =>
          updateMedicalInformation("height", parseInt(e.target.value))
        }
        value={medicalInformation.height}
        placeholder="height"
      />
      weight (kg)*{" "}
      <input
        type="number"
        onChange={(e) =>
          updateMedicalInformation("weight", parseInt(e.target.value))
        }
        value={medicalInformation.weight}
        placeholder="weight"
      />
      diseases*{" "}
      <input
        type="text"
        onChange={(e) =>
          updateMedicalInformation("diseasesDescription", e.target.value)
        }
        value={medicalInformation.diseasesDescription}
        placeholder="diseasesDescription"
      />
      vaccination*{" "}
      <input
        type="text"
        onChange={(e) =>
          updateMedicalInformation("vaccinationDescription", e.target.value)
        }
        value={medicalInformation.vaccinationDescription}
        placeholder="vaccinationDescription"
      />
      <Button type="primary" onClick={() => addMedicalInformation()}>
        Update
      </Button>
    </div>
  ) : (
    <Result
      icon={<SmileOutlined />}
      title="Great, we have done all the operations!"
      extra={
        <Button onClick={() => navigate("/dashboard")} type="primary">
          Next
        </Button>
      }
    />
  );
}
