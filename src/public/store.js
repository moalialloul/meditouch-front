const data = {
  userInfo: null,
  businessAccountInfo: null,
  communityPosts: {
    pageNumber: -1,
    totalNumberOfPages: 1,
    posts: [],
  },
  reservedSlots: [],
  favoriteDoctors: [],
  myAppointments: [],
  notifications: [],
  specialities: [],
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case "SET_BUSINESS_ACCOUNT_INFO":
      return {
        ...state,
        businessAccountInfo: action.businessAccountInfo,
      };
    case "SET_COMMUNITY_POSTS":
      return {
        ...state,
        communityPosts: action.communityPosts,
      };
    case "SET_RESERVED_SLOTS":
      return {
        ...state,
        reservedSlots: action.reservedSlots,
      };
    case "SET_FAVORITE_DOCTORS":
      return {
        ...state,
        favoriteDoctors: action.favoriteDoctors,
      };
    case "SET_MY_APPOINTMENTS":
      return {
        ...state,
        myAppointments: action.myAppointments,
      };
    case "SET_MY_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.notifications,
      };
    case "SET_SPECIALITIES":
      return {
        ...state,
        specialities: action.specialities,
      };
    default:
      return state;
  }
};
export default reducer;
