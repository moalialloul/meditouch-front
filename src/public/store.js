const data = {
  userInfo: null,
  loadingApp: true,
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
  storage: null,
  userProfileStorageObject: null,
  notificationSettings: {
    onReferral: -1,
    onFavorite: -1,
    onScheduleReminder: -1,
    onAppointmentReservation: -1,
    onAddFeatureEmail: -1,
    onAppointmentReminder: -1,
  },
  userMedicalInfo: {
    height: 0,
    weight: 0,
    diseasesDescription: 0,
    vaccinationDescription: 0,
    loaded: false,
  },
  myReservedSlots: {
    loaded: false,
    slots: [],
  },
  myReferrals: [],
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case "SET_REFERRALS":
      return {
        ...state,
        myReferrals: action.myReferrals,
      };
    case "SET_LOADING_APP":
      return {
        ...state,
        loadingApp: action.loadingApp,
      };
    case "SET_MEDICAL_INFO":
      return {
        ...state,
        userMedicalInfo: action.userMedicalInfo,
      };
    case "SET_MY_RESERVED_SLOTS":
      return {
        ...state,
        myReservedSlots: action.myReservedSlots,
      };
    case "SET_STORAGE":
      return {
        ...state,
        storage: action.storage,
      };
    case "SET_USER_PROFILE_STORAGE_OBJECT":
      return {
        ...state,
        userProfileStorageObject: action.userProfileStorageObject,
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
    case "SET_NOTIFCATION_SETTINGS":
      return {
        ...state,
        notificationSettings: action.notificationSettings,
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
