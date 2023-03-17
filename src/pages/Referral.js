import { Button, Col } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { userController } from "../controllers/userController";

export default function Referral() {
  const { state } = useLocation();
  const userData = useSelector((state) => state);
  const [hpList, setHPList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedHps, setSelectedHps] = useState([]);
  const [referralDescription, setReferralDescription] = useState("");
  useEffect(() => {
    if (!userData.loadingApp) {
      if (loadMore && pageNumber <= totalNumberOfPages) {
        setLoading(true);
        userController
          .getHealthProfessionals({
            userFk: userData.userInfo.userId,
            pageNumber: pageNumber === -1 ? 1 : pageNumber,
            recordsByPage: 1,
            searchText: searchText === "" ? "null" : searchText,
          })
          .then((response) => {
            let data = response.data;
            setTotalNumberOfPages(data.totalNumberOfPages);
            setPageNumber(pageNumber === -1 ? 2 : pageNumber + 1);
            setHPList((hps) => [...hps, ...data.health_professionals]);
          })
          .then(() => {
            setLoading(false);
            setLoadMore(false);
          });
      }
    }
  }, [loadMore, userData.loadingApp]);
  function modifySelectedHps(hp) {
    let tempSelectedHps = [...selectedHps];
    let hpIndex = tempSelectedHps.findIndex((hps) => hps.userId === hp.userId);
    if (hpIndex >= 0) {
      tempSelectedHps.splice(hpIndex, 1);
    } else {
      tempSelectedHps.push(hp);
    }
    setSelectedHps(tempSelectedHps);
  }
  function addReferral() {
    let referralBody = [];
    for (let i = 0; i < selectedHps.length; i++) {
      let json = {
        userFk: state.appointment.currentUserId,
        appointmentFk: state.appointment.appointmentId,
        referralDescription: referralDescription,
        referredByBusinessAccountFk:
          userData.businessAccountInfo.businessAccountId,
        referredToBusinessAccountFk: selectedHps[i].businessAccountId,
      };
      referralBody.push(json);
    }
    businessAccountController.addReferrals({ body: referralBody });
  }
  return (
    <Main>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
        <div>
          {" "}
          Please refer{" "}
          {state.appointment.firstName + " " + state.appointment.lastName} into
          another doctor
        </div>
        <div className="d-flex">
          <input
            type="text"
            placeholder="Search doctor"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() => {
              setHPList([]);
              setPageNumber(-1);
              setTotalNumberOfPages(1);
              setLoadMore(true);
            }}
          >
            Search
          </Button>
        </div>
        <div>
          {hpList.map((hp) => {
            return (
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedHps.findIndex((hps) => hps.userId === hp.userId) >=
                    0
                      ? "red"
                      : "",
                }}
                onClick={() => modifySelectedHps(hp)}
                className="mt-3"
              >
                <div>{hp.firstName}</div>
                <div>{hp.lastName}</div>
                <div>{hp.userEmail}</div>
              </div>
            );
          })}
          {pageNumber <= totalNumberOfPages && !loadMore && (
            <Button type="primary" onClick={() => setLoadMore(true)}>
              Load more
            </Button>
          )}
          {loadMore && "loading..."}

          {selectedHps.length !== 0 && (
            <div>
              <input
                type="text"
                placeholder="Referral Description"
                value={referralDescription}
                onChange={(e) => setReferralDescription(e.target.value)}
              />
              <Button type="primary" onClick={() => addReferral()}>
                Add Referral
              </Button>
            </div>
          )}
        </div>
      </Col>
    </Main>
  );
}
