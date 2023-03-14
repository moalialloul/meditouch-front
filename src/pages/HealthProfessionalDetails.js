import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthenticationWrapper from "../components/AuthenticationWrapper";
import { businessAccountController } from "../controllers/businessAccountController";
import { userController } from "../controllers/userController";

export default function HealthProfessionalDetails() {
  const [specialities, setSpecialities] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const { state } = useLocation();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [myClinicLocation, setMyClinicLocation] = useState(false);
  const [userForm, setUserForm] = useState({
    speciality: -1,
    biography: "",
    clinicLocation: "",
    clinicLocationLongitude: -1,
    clinicLocationLatitude: -1,
    services: [
      {
        serviceId: 1,
        isDeleted: false,
        new: true,
        servicePrice: 0,
        serviceName: "",
        currencyUnit: "USD",
      },
    ],
  });
  function addService() {
    let tempUserForm = { ...userForm };
    tempUserForm.services.push({
      serviceId: tempUserForm.services.length + 1,
      servicePrice: -1,
      serviceName: "",
      currencyUnit: "USD",
      isDeleted: false,
      new: true,
    });
    setUserForm(tempUserForm);
  }
  function deleteService(index) {
    let tempUserForm = { ...userForm };
    tempUserForm.services[index].isDeleted = true;
    setUserForm(tempUserForm);
  }
  function updateForm(key, value) {
    let tempUserForm = { ...userForm };
    tempUserForm[key] = value;
    setUserForm(tempUserForm);
  }
  function updateService(index, key, value) {
    let tempUserForm = { ...userForm };
    tempUserForm.services[index][key] = value;
    setUserForm(tempUserForm);
  }
  useEffect(() => {
    userController.getSpecialities().then((response) => {
      setSpecialities(response.data.specialities);
    });
  }, []);
  function getServices(tempUserForm) {
    businessAccountController
      .getServices({
        businessAccountFk: userData.businessAccountInfo.businessAccountId,
      })
      .then((response2) => {
        let data2 = response2.data;
        tempUserForm.services = data2.services;
        for (let i = 0; i < tempUserForm.services.length; i++) {
          tempUserForm.services[i].new = false;
          tempUserForm.services[i].isDeleted = false;
        }
        setUserForm({ ...tempUserForm });
        setDataLoaded(true);
      });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(
              (position) => {
                let tempUserData = { ...userForm };
                userForm.clinicLocationLatitude = position.coords.latitude;
                userForm.clinicLocationLongitude = position.coords.longitude;

                setUserForm(tempUserData);
                setLocationEnabled(true);
              },
              (error) => {}
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
    if (
      userData.businessAccountInfo &&
      userData.businessAccountInfo !== -1 &&
      userData.businessAccountInfo !== -2 &&
      userData.userInfo &&
      !dataLoaded
    ) {
      let tempUserForm = { ...userForm };
      businessAccountController
        .getBusinessAccount({ userId: userData.userInfo.userId })
        .then((response) => {
          let data = response.data.businessAccount;
          tempUserForm.speciality = data.specialityFk;
          tempUserForm.clinicLocation = data.clinicLocation;
          tempUserForm.biography = data.biography;
          tempUserForm.clinicLocationLatitude = data.clinicLocationLatitude;
          tempUserForm.clinicLocationLongitude = data.clinicLocationLongitude;
          getServices(tempUserForm);
        });
    }
  }, [userData.businessAccountInfo, userData.userInfo]);
  function submit() {
    if (
      userForm.speciality === -1 ||
      userForm.services.filter(
        (s) =>
          s.isDeleted === false &&
          (s.servicePrice.toString().replace(/\s+/g, "") === "" ||
            s.serviceName.toString().replace(/\s+/g, "") === "" ||
            s.currencyUnit.toString().replace(/\s+/g, "") === "")
      ).length !== 0 ||
      userForm.clinicLocation.toString().replace(/\s+/g, "") === ""
    ) {
      alert("fields required");
      return;
    }
    let body = {
      businessAccountId: state
        ? state.businessAccountId
        : userData.businessAccountInfo.businessAccountId,
      specialityFk: parseInt(userForm.speciality),
      biography: userForm.biography,
      clinicLocation: userForm.clinicLocation,
    };
    if (locationEnabled && myClinicLocation) {
      body.clinicLocationLatitude = userForm.clinicLocationLatitude;
      body.clinicLocationLongitude = userForm.clinicLocationLongitude;
    }
    businessAccountController
      .updateBusinessAccount({
        body: body,
      })
      .then(() => {
        let businessAccountInfo = userData.businessAccountInfo;
        businessAccountInfo.biography = userForm.biography;
        businessAccountInfo.clinicLocation = userForm.clinicLocation;
        dispatch({
          type: "SET_BUSINESS_ACCOUNT_INFO",
          businessAccountInfo: businessAccountInfo,
        });
        let jsonArrayNew = [];
        let jsonArrayOld = [];
        let jsonArrayToDelete = [];

        for (let i = 0; i < userForm.services.length; i++) {
          if (userForm.services[i].new === true) {
            jsonArrayNew.push({
              businessAccountFk: state
                ? state.businessAccountId
                : userData.businessAccountInfo.businessAccountId,
              servicePrice: parseInt(userForm.services[i].servicePrice),
              serviceName: userForm.services[i].serviceName,
              currencyUnit: userForm.services[i].currencyUnit,
            });
          } else {
            jsonArrayOld.push({
              serviceId: userForm.services[i].serviceId,
              businessAccountFk: state
                ? state.businessAccountId
                : userData.businessAccountInfo.businessAccountId,
              servicePrice: parseInt(userForm.services[i].servicePrice),
              serviceName: userForm.services[i].serviceName,
              currencyUnit: userForm.services[i].currencyUnit,
            });
          }
        }
        businessAccountController
          .addService({ body: jsonArrayNew })
          .then(() => {
            businessAccountController
              .updateService({ body: jsonArrayOld })
              .then(() => {
                let data = userForm.services.filter(
                  (s) => s.isDeleted === true && s.new === false
                );
                if (data.length !== 0) {
                  for (let i = 0; i < data.length; i++) {
                    jsonArrayToDelete.push({
                      serviceId: data[i].serviceId,
                      businessAccountFk: state
                        ? state.businessAccountId
                        : userData.businessAccountInfo.businessAccountId,
                    });
                  }
                  businessAccountController
                    .deleteService({ body: jsonArrayToDelete })
                    .then(() => {
                      // setCompleted(true);
                    });
                } else {
                  // setCompleted(true);
                }
              });
          });
      });
  }
  return (
    <AuthenticationWrapper>
      {!completed ? (
        <div>
          Speciality*
          <select
            defaultValue={-1}
            value={userForm.speciality}
            onChange={(e) => updateForm("speciality", e.target.value)}
          >
            <option value={-1}>All Specialities</option>
            {specialities.map((sp) => {
              return (
                <option value={sp.specialityId}>{sp.specialityName}</option>
              );
            })}
          </select>
          <div>
            clinicLocation*{" "}
            <input
              type="text"
              value={userForm.clinicLocation}
              placeholder="clinicLocation"
              onChange={(e) => updateForm("clinicLocation", e.target.value)}
            />
            biography{" "}
            <input
              type="text"
              placeholder="biography"
              value={userForm.biography}
              onChange={(e) => updateForm("biography", e.target.value)}
            />
          </div>
          <div>
            {locationEnabled ? (
              <div>
                Are you in your clinic now?
                <div className="d-flex">
                  Yes{" "}
                  <input
                    type="radio"
                    name="clinic"
                    onClick={(e) => setMyClinicLocation(true)}
                    checked={myClinicLocation}
                  />
                  No{" "}
                  <input
                    type="radio"
                    name="clinic"
                    onClick={(e) => setMyClinicLocation(false)}
                    checked={!myClinicLocation}
                  />
                </div>
              </div>
            ) : (
              "Enable location to set your clinic position"
            )}
          </div>
          <div>
            <Button type="primary" onClick={() => addService()}>
              Add service
            </Button>
            {userForm.services.map((service, index) => {
              return (
                service.isDeleted === false && (
                  <div>
                    <div className="d-flex">
                      Service {index + 1}
                      {userForm.services.filter((s) => s.isDeleted === false)
                        .length > 1 && (
                        <div onClick={() => deleteService(index)}>
                          <DeleteOutlined />
                        </div>
                      )}
                    </div>
                    <div>
                      service name{" "}
                      <input
                        type="text"
                        value={service.serviceName}
                        placeholder="service name"
                        onChange={(e) =>
                          updateService(index, "serviceName", e.target.value)
                        }
                      />
                      price{" "}
                      <input
                        type="number"
                        value={service.servicePrice}
                        placeholder="price"
                        onChange={(e) =>
                          updateService(index, "servicePrice", e.target.value)
                        }
                      />
                      currency{" "}
                      <select
                        defaultValue={-1}
                        value={service.currencyUnit}
                        onChange={(e) =>
                          updateService(index, "currencyUnit", e.target.value)
                        }
                      >
                        <option value={-1}>All Currencies</option>
                        <option value={"USD"}>USD</option>
                        <option value={"LBP"}>LBP</option>
                      </select>
                    </div>
                  </div>
                )
              );
            })}
            <Button type="primary" onClick={() => submit()}>
              Continue
            </Button>
          </div>
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
      )}
      ;
    </AuthenticationWrapper>
  );
}
