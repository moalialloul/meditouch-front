import axios from "axios";

const url = "http://localhost:8080/";
const registerUser = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "registerUser",
    data: body,
  });
};
const checkToken = ({ body, tokenType }) => {
  return axios({
    method: "POST",
    url: url + "checkToken/" + tokenType,
    data: body,
  });
};
const approveUser = ({ userId }) => {
  return axios({
    method: "PUT",
    url: url + "approveUser/" + userId,
    data: {},
  });
};
const verifyUser = ({ userId }) => {
  return axios({
    method: "PUT",
    url: url + "verifyUser/" + userId,
    data: {},
  });
};
const generateToken = ({ tokenType, body }) => {
  return axios({
    method: "POST",
    url: url + "generateToken/" + tokenType,
    data: body,
  });
};
const loginUser = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "loginUser",
    data: body,
  });
};
const updatePassword = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updatePassword",
    data: body,
  });
};
const forgetPassword = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "forgetPassword",
    data: body,
  });
};
const getReservationSlots = ({ userId }) => {
  return axios({
    method: "GET",
    url: url + "getReservationSlots/" + userId,
  });
};
const deleteReservationSlot = ({ reservationId }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteReservationSlot/" + reservationId,
  });
};
const addReservationSlot = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addReservationSlot",
    data: body,
  });
};
const getUserFeedbacks = ({
  userId,
  pageNumber,
  recordsByPage,
  searchText,
}) => {
  return axios({
    method: "GET",
    url:
      url +
      "getUserFeedbacks/" +
      userId +
      "/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      (searchText === "" || searchText === null ? "null" : searchText),
  });
};
const getAllFeedbacks = ({ pageNumber, recordsByPage, searchText }) => {
  return axios({
    method: "GET",
    url:
      url +
      "getUserFeedbacks/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      (searchText === "" || searchText === null ? "null" : searchText),
  });
};
const deleteFavorite = ({ favoriteId }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteFavorite/" + favoriteId,
  });
};
const deleteFeedback = ({ feedbackId }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteFeedback/" + feedbackId,
  });
};
const addFeedback = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addFeedback",
    data: body,
  });
};
const addFavorite = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addFavorite",
    data: body,
  });
};
const getFavorites = ({ pageNumber, recordsByPage, searchText }) => {
  return axios({
    method: "GET",
    url:
      url +
      "getFavorites/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      (searchText === "" || searchText === null ? "null" : searchText),
  });
};
const deleteCommunityPost = ({ postId }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteCommunityPost/" + postId,
  });
};
const updateCommunityPost = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateCommunityPost",
    data: body,
  });
};
const addCommunityPost = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addCommunityPost",
    data: body,
  });
};
const updateAppointment = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateAppointment",
    data: body,
  });
};
const registerAppointment = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "registerAppointment",
    data: body,
  });
};
const getCommunityPosts = ({ pageNumber, recordsByPage, searchText }) => {
  return axios({
    method: "GET",
    url:
      url +
      "getCommunityPosts/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      (searchText === "" || searchText === null ? "null" : searchText),
  });
};
const addCommunityPostComment = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addCommunityPostComment",
    data: body,
  });
};
const getCommunityPostComment = ({
  postId,
  pageNumber,
  recordsByPage,
  searchText,
}) => {
  return axios({
    method: "GET",
    url:
      url +
      "getCommunityPostComment/" +
      postId +
      "/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      (searchText === "" || searchText === null ? "null" : searchText),
  });
};
const updateCommunityPostComment = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateCommunityPostComment",
    data: body,
  });
};
const deleteCommunityPostComment = ({ commentId }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteCommunityPostComment/" + commentId,
  });
};
const deleteSubscription = ({ userEmail }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteSubscription/" + userEmail,
  });
};
const subscribe = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "subscribe",
    data: body,
  });
};
const updateUser = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateUser",
    data: body,
  });
};
const postponeAppointment = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "postponeAppointment",
    data: body,
  });
};
const contactUs = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "contactUs",
    data: body,
  });
};
const updateNotification = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateNotification",
    data: body,
  });
};
const deleteAllNotifications = ({ userId }) => {
  return axios({
    method: "DELETE",
    url: url + "updateNotification/" + userId,
  });
};
const deleteNotifications = ({ body }) => {
  return axios({
    method: "DELETE",
    url: url + "updateNotification",
    data: body,
  });
};
const getNotifications = ({ userId, pageNumber, recordsByPage }) => {
  return axios({
    method: "GET",
    url:
      url +
      "getNotifications/" +
      pageNumber +
      "/" +
      recordsByPage +
      "/" +
      userId,
  });
};
const getBlogs = ({ pageNumber, recordsByPage }) => {
  return axios({
    method: "GET",
    url: url + "getBlogs/" + pageNumber + "/" + recordsByPage,
  });
};
const addBlog = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addBlog",
    data: body,
  });
};
const deleteBlogs = ({ body }) => {
  return axios({
    method: "DELETE",
    url: url + "deleteBlogs",
    data: body,
  });
};

const updateBlog = ({ body }) => {
  return axios({
    method: "PUT",
    url: url + "updateBlog",
    data: body,
  });
};
const addSurveyQuestionsAnswers = ({ surveyId, body }) => {
  return axios({
    method: "POST",
    url: url + "addSurveyQuestionsAnswers/" + surveyId,
    data: body,
  });
};
const getSurvey = ({ surveyId }) => {
  return axios({
    method: "GET",
    url: url + "getSurvey/" + surveyId,
  });
};
const addSurvey = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addSurvey/",
    data: body,
  });
};
const addSurveyAnswers = ({ body }) => {
  return axios({
    method: "POST",
    url: url + "addSurveyAnswers",
    data: body,
  });
};
const getSurveyQuestionsAnswers = ({ surveyId }) => {
  return axios({
    method: "GET",
    url: url + "getSurveyQuestionsAnswers/" + surveyId,
  });
};
export const userController = {
  registerUser,
  checkToken,
  approveUser,
  verifyUser,
  generateToken,
  loginUser,
  updatePassword,
  forgetPassword,
  getReservationSlots,
  deleteReservationSlot,
  addReservationSlot,
  getUserFeedbacks,
  getAllFeedbacks,
  deleteFavorite,
  deleteFeedback,
  addFeedback,
  addFavorite,
  getFavorites,
  deleteCommunityPost,
  updateCommunityPost,
  addCommunityPost,
  updateAppointment,
  registerAppointment,
  getCommunityPosts,
  addCommunityPostComment,
  getCommunityPostComment,
  updateCommunityPostComment,
  deleteCommunityPostComment,
  deleteSubscription,
  subscribe,
  updateUser,
  postponeAppointment,
  contactUs,
  updateNotification,
  deleteAllNotifications,
  deleteNotifications,
  getNotifications,
  getBlogs,
  addBlog,
  deleteBlogs,
  updateBlog,
  addSurveyQuestionsAnswers,
  getSurvey,
  addSurvey,
  addSurveyAnswers,
  getSurveyQuestionsAnswers,
};
