import { Button, Card, Col } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { userController } from "../controllers/userController";
import referralImage from "../assets/images/referralDoctor.png";

import BgProfile from "../assets/images/doctorProfile.jpg";


export default function AppointmentReferral() {
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
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage: "url(" + BgProfile + ")",
          height: "400px",
          backgroundSize: "cover",
        }}
      ></div>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
        <div className="all-txts mt-3 text-center">
          {" "}
          Please refer{" "}
          {state.appointment.firstName + " " + state.appointment.lastName} into
          another doctor
        </div>
        <div className="d-flex mt-3 justify-content-center align-items-center">
          <input
            className="referral-search-doctor "
            type="text"
            placeholder="Search doctor"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            className="referral-search-btn"
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
        <div style={{position:"relative"}}>
        <div className="d-flex mt-4" style={{gap:"10px"}}>
          {hpList.map((hp) => {
            return (
       
              <Card
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedHps.findIndex((hps) => hps.userId === hp.userId) >=
                    0
                      ? "#f5f7ff"
                      : "",
                }}
                onClick={() => modifySelectedHps(hp)}
                className="mt-3 referral-selected-information"
              >
                <div style={{ textAlign: "center" }} className="referral-doc pb-3">
                  <img src={referralImage} className="referral-doctor-img " alt="" />
                </div>
              <div className="d-flex align-items-center pb-2" style={{borderBottom:"1px solid rgb(219, 216, 216)"}}>
              
              <div className=" all-txts mt-2 ms-2">{hp.firstName}</div>
                </div> 
                <div className="d-flex align-items-center mt-2 pb-2" style={{borderBottom:"1px solid rgb(219, 216, 216)"}}>
                
              <div className=" all-txts mt-2 ms-2 ">{hp.lastName}</div>
                </div> 
                <div className="d-flex align-items-center mt-2">
          
              <div className=" all-txts  ms-2 m">{hp.userEmail}</div>
                </div> 
            
              </Card>
           
            );
          })}
         </div>

          {selectedHps.length !== 0 && (
            <div className=" mt-4">
              <input
                className="referral-search-doctor2 "
                type="text"
                placeholder="Referral Description"
                value={referralDescription}
                onChange={(e) => setReferralDescription(e.target.value)}
              />
              <Button
                type="primary"
                onClick={() => addReferral()}
                className="referral-search-btn"
              >
                Add Referral
              </Button>
            </div>
          )}
           <div className="load-more" >
         {pageNumber <= totalNumberOfPages && !loadMore && (
            <Button type="primary" onClick={() => setLoadMore(true)} className="mt-3">
              Load more
            </Button>
          )}
           
          </div>
          {loadMore && "loading..."}
        </div>
      </Col>
    </Main>
  );
}
