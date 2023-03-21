import axios from "axios";
const url = "http://localhost:8080/";

const globalSearch = ({ body, pageNumber, recordsByPage }) => {
  return axios({
    method: "POST",
    url: url + "globalSearch/" + pageNumber + "/" + recordsByPage,
    data: body,
  });
};
const setSchedule = ({ body, businessAccountId }) => {
  return axios({
    method: "POST",
    url: url + "setSchedule/" + businessAccountId,
    data: body,
  });
};
const deleteSchedule = ({ businessAccountId }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteSchedule/" + businessAccountId,
  });
};
const getBusinessAccountSchedule = ({
  businessAccountId,
  pageNumber,
  recordsByPage,
}) => {
  return axios({
    method: "GET",
    url:
      url +
      "getBusinessAccountSchedule/" +
      businessAccountId +
      "/" +
      pageNumber +
      "/" +
      recordsByPage,
  });
};
const modifySlotLock = ({ slotId }) => {
  return axios({
    method: "PUT",
    url: url + "modifySlotLock/" + slotId,
  });
};
const getBusinessAccount = ({ userId }) => {
  return axios({
    method: "GET",
    url: url + "getBusinessAccount/" + userId,
  });
};
const updateBusinessAccount = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateBusinessAccount",
    data: body,
  });
};
const updateAppointmentPrescription = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateAppointmentPrescription",
    data: body,
  });
};
const removeBlockUser = ({ blockId }) => {
  return axios({
    method: "DELETE",
    url: url + "removeBlockUser/" + blockId,
  });
};
const blockUser = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "blockUser",
    data: body,
  });
};
const getBlockedUsers = ({ businessAccountId, pageNumber, recordsByPage }) => {
  return axios({
    method: "GET",
    url:
      url +
      "getBlockedUsers/" +
      businessAccountId +
      "/" +
      pageNumber +
      "/" +
      recordsByPage,
  });
};
const updateService = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateService",
    data: body,
  });
};
const addService = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addService",
    data: body,
  });
};
const deleteService = ({ body }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteService",
    data: body,
  });
};
const getServices = ({ businessAccountFk }) => {
  return axios({
    method: "GET",
    url: url + "getServices/" + businessAccountFk,
  });
};
const getRevenueOfYear = ({ businessAccountFk, userFk }) => {
  return axios({
    method: "GET",
    url: url + "getRevenueOfYear/" + businessAccountFk + "/" + userFk,
  });
};
const addAppointmentPrescription = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addAppointmentPrescription",
    data: body,
  });
};
const getAppointmentResult = ({ appointmentId }) => {
  return axios({
    method: "GET",
    url: url + "getAppointmentResult/" + appointmentId,
  });
};
const getAppointmentPrescription = ({ appointmentId }) => {
  return axios({
    method: "GET",
    url: url + "getAppointmentPrescription/" + appointmentId,
  });
};
const addAppointmentResult = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addAppointmentResult",
    data: body,
  });
};
const getAppointments = ({ id, userType, pageNumber, recordsByPage, body }) => {
  return axios({
    method: "POST",
    url:
      url +
      "getAppointments/" +
      id +
      "/" +
      userType +
      "/" +
      pageNumber +
      "/" +
      recordsByPage,
    data: body,
  });
};
const getTodaysAppointments = ({ businessAccountId }) => {
  return axios({
    method: "GET",
    url: url + "getTodayAppointments/" + businessAccountId,
  });
};
const getBusinessAccountPatients = ({ businessAccountId }) => {
  return axios({
    method: "GET",
    url: url + "getBusinessAccountPatients/" + businessAccountId,
  });
};
const deleteReferrals = ({ body }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteService/",
    data: body,
  });
};
const addReferrals = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addReferrals",
    data: body,
  });
};
const getReferrals = ({ businessAccountFk, pageNumber, recordsByPage }) => {
  return axios({
    method: "GET",
    url:
      url + "getReferrals/" + businessAccountFk + "/" + pageNumber + "/" + recordsByPage,
  });
};
const getBusinessAccountStatistics = ({ businessAccountId }) => {
  return axios({
    method: "GET",
    url: url + "getBusinessAccountStatistics/" + businessAccountId,
  });
};
const getAppointmentById = ({ appointmentFk }) => {
  return axios({
    method: "GET",
    url: url + "getAppointmentById/" + appointmentFk,
  });
};
const getBusinessAccountAppointmentsStatistics = ({
  businessAccountId,
  fromDate,
  toDate,
}) => {
  return axios({
    method: "GET",
    url:
      url +
      "getBusinessAccountAppointmentsStatistics/" +
      businessAccountId +
      "/" +
      fromDate +
      "/" +
      toDate,
  });
};
const getAllHealthProfessionals = ({
  searchText,
  pageNumber,
  recordsByPage,
  isApproved,
}) => {
  return axios({
    method: "GET",
    url:
      url +
      "getAllHealthProfessionals/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      searchText +
      "/" +
      isApproved,
  });
};
const getAdminStatistics = () => {
  return axios({
    method: "GET",
    url: url + "getAdminStatistics",
  });
};
const updateNotificationsSettings = ({ body, userFk }) => {
  return axios({
    method: "POST",
    url: url + "updateNotificationsSettings/" + userFk,
    data: body,
  });
};
const getNotificationsSettings = ({ userFk }) => {
  return axios({
    method: "GET",
    url: url + "getNotificationsSettings/" + userFk,
  });
};
export const businessAccountController = {
  getAppointmentById,
  getRevenueOfYear,
  getServices,
  getNotificationsSettings,
  updateNotificationsSettings,
  getAdminStatistics,
  getAllHealthProfessionals,
  updateAppointmentPrescription,
  getBusinessAccountPatients,
  getTodaysAppointments,
  globalSearch,
  setSchedule,
  deleteSchedule,
  getBusinessAccountSchedule,
  modifySlotLock,
  getBusinessAccount,
  updateBusinessAccount,
  removeBlockUser,
  blockUser,
  getBlockedUsers,
  updateService,
  addService,
  deleteService,
  addAppointmentPrescription,
  getAppointmentResult,
  getAppointmentPrescription,
  addAppointmentResult,
  getAppointments,
  deleteReferrals,
  addReferrals,
  getReferrals,
  getBusinessAccountStatistics,
  getBusinessAccountAppointmentsStatistics,
};
