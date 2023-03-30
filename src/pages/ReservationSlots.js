import { useEffect, useState } from "react";

import { Button, Card, Col, Row, Typography } from "antd";

import Main from "../components/layout/Main";
import { useDispatch, useSelector } from "react-redux";
import { userController } from "../controllers/userController";

export default function ReservationSlots() {
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!userData.loadingApp && !userData.myReservedSlots.loaded) {
      setLoading(true);

      userController
        .getReservationSlots({
          userId: userData.userInfo.userId,
        })
        .then((response) => {
          dispatch({
            type: "SET_MY_RESERVED_SLOTS",
            myReservedSlots: {
              loaded: true,
              slots: response.data.reservations,
            },
          });
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [userData.loadingApp]);
  function deleteReservation(index) {
    userController
      .deleteReservationSlotByReservationId({
        reservationId: userData.myReservedSlots.slots[index].reservationId,
        userFk: userData.userInfo.userId,
      })
      .then((response) => {});
  }

  return (
    <Main>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody ">
              <div className="project-ant">
                <div>
                  <Title level={5}>Reservation Slots</Title>
                </div>
              </div>
              {loading ? (
                "loading..."
              ) : userData.myReservedSlots.slots.length === 0 ? (
                "no data"
              ) : (
                <div className="ant-list-box table-responsive">
                  <table className="width-100">
                    <thead>
                      <tr>
                        <th>DOCTOR NAME</th>
                        <th>DOCTOR EMAIL</th>
                        <th>DOCTOR SPECIALITY</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.myReservedSlots.slots?.map((ap, index) => (
                        <tr key={index}>
                          <td>
                            <h6>{ap.firstName + " " + ap.lastName}</h6>
                          </td>
                          <td>{ap.userEmail}</td>
                          <td>{ap.specialityName}</td>
                          <td>
                            <span className="text-xs font-weight-bold">
                              <Button
                                onClick={() => deleteReservation(index)}
                                danger
                              >
                                Delete Reservation
                              </Button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}
