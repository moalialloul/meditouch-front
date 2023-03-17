import { Spin } from "antd";
import { EncryptStorage } from "encrypt-storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userController } from "../controllers/userController";

export default function AuthenticationWrapper({ children }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const encryptStorage1 = new EncryptStorage("secret-key", {
    prefix: "@instance1",
  });

  useEffect(() => {
    let user = encryptStorage1.getItem("meditouch_user");
    if (user) {
      if (userData.userInfo === null) {
        let userInfo = user.userInfo;
        dispatch({
          type: "SET_USER_INFO",
          userInfo: userInfo,
        });
        if (userInfo.userRole === "PATIENT") {
          if (!userData.userMedicalInfo.loaded) {
            userController
              .getMedicalInformation({ userFk: userInfo.userId })
              .then((response) => {
                let data = response.data.medical_information;
                dispatch({
                  type: "SET_MEDICAL_INFO",
                  userMedicalInfo: { ...data, loaded: true },
                });
              })
              .then(() => {
                setLoading(false);
                dispatch({
                  type: "SET_LOADING_APP",
                  loadingApp: false,
                });
              });
          } else {
            setLoading(false);
            dispatch({
              type: "SET_LOADING_APP",
              loadingApp: false,
            });
          }
        } else {
          if (userData.businessAccountInfo === null) {
            dispatch({
              type: "SET_BUSINESS_ACCOUNT_INFO",
              businessAccountInfo:
                encryptStorage1.getItem("meditouch_user").businessAccountInfo,
            });
            setLoading(false);
            dispatch({
              type: "SET_LOADING_APP",
              loadingApp: false,
            });
          } else {
            setLoading(false);
            dispatch({
              type: "SET_LOADING_APP",
              loadingApp: false,
            });
          }
        }
      } else {
        setLoading(false);
        dispatch({
          type: "SET_LOADING_APP",
          loadingApp: false,
        });
      }
    } else {
      setLoading(false);
      dispatch({
        type: "SET_LOADING_APP",
        loadingApp: false,
      });
      navigate("/sign-in");
    }
  }, []);
  return loading ? <Spin tip="Loading...">{children}</Spin> : children;
}
