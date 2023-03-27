import { useEffect, useState } from "react";

import { Button, Card, Col, Row, Typography } from "antd";

import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { useSelector } from "react-redux";

export default function Patients() {
  const userData = useSelector((state) => state);

  const { Title, Text } = Typography;

  const [patientsData, setPatientsData] = useState([]);
  useEffect(() => {
    if (!userData.loadingApp) {
      businessAccountController
        .getBusinessAccountPatients({
          businessAccountId: userData.businessAccountInfo.businessAccountId,
        })
        .then((response) => {
          setPatientsData(response.data.patients);
        });
    }
  }, [userData.loadingApp]);
  function blockUser(userId, index) {
    businessAccountController
      .blockUser({
        body: {
          businessAccountFk: userData.businessAccountInfo.businessAccountId,
          userFk: userId,
        },
      })
      .then((response) => {
        let tempPatients = [...patientsData];
        tempPatients[index].blockId = response.data.blockInfo.blockId;
        setPatientsData(tempPatients);
      });
  }
  function unblockUser(blockId, index) {
    businessAccountController
      .removeBlockUser({
        blockId: blockId,
      })
      .then((response) => {
        let tempPatients = [...patientsData];
        tempPatients[index].blockId = -1;
        setPatientsData(tempPatients);
      });
  }
  return (
    <Main>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody ">
              <div className="project-ant">
                <div>
                  <div className="heading-title" level={5}>Your Patients</div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th >PATIENT NAME</th>
                      <th >PATIENT EMAIL</th>
                      <th >ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientsData?.map((ap, index) => (
                      <tr key={index}>
                        <td>
                          <td className="heading-title">{ap.firstName + " " + ap.lastName}</td>
                        </td>
                        <td>{ap.userEmail}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {ap.blockId === -1 ? (
                              <Button
                                onClick={() => blockUser(ap.userId, index)}
                                danger
                              >
                                Block User
                              </Button>
                            ) : (
                              <Button
                                onClick={() => unblockUser(ap.blockId, index)}
                                type="primary"
                              >
                                Unblock
                              </Button>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}
