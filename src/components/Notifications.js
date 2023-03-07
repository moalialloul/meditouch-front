import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/images/avatar.jpg";

export default function Notifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const userData = useSelector((state) => state);

  return (
    <div className="nav-notification-wrapper">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setShowNotifications(!showNotifications)}
        className="d-flex align-items-center"
      >
        <BellOutlined />
      </div>
      <div className="nav-notification-badge">
        <Badge
          count={
            userData.notifications.filter((n) => n.isOpen === false).length
          }
        />
      </div>
      {showNotifications && (
        <div className="d-flex flex-column nav-notifications">
          {userData.notifications.length === 0
            ? "Not notifications"
            : userData.notifications.map((not) => {
                return (
                  <div className="nav-notification">{not.notificationText}</div>
                );
              })}
        </div>
      )}
    </div>
  );
}
