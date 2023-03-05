const data = {
  userInfo: null,
  businessAccountInfo: null,
  communityPosts: {
    pageNumber: -1,
    totalNumberOfPages: 1,
    posts: [],
  },
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
    default:
      return state;
  }
};
export default reducer;
