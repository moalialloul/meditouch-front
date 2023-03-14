import { EncryptStorage } from "encrypt-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthenticationWrapper({ children }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const encryptStorage1 = new EncryptStorage("secret-key", {
    prefix: "@instance1",
  });
  useEffect(() => {
    let user = encryptStorage1.getItem("meditouch_user");
    if (user) {
      if (userData.userInfo === null) {
        dispatch({
          type: "SET_USER_INFO",
          userInfo: encryptStorage1.getItem("meditouch_user").userInfo,
        });
      }

      if (user.businessAccountInfo) {
        if (userData.businessAccountInfo === null) {
          dispatch({
            type: "SET_BUSINESS_ACCOUNT_INFO",
            businessAccountInfo:
              encryptStorage1.getItem("meditouch_user").businessAccountInfo,
          });
        }
      }
    } else {
      navigate("/sign-in");
    }
  }, []);
  return children;
}
