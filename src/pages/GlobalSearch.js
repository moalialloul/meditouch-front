import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutWrapper from "../components/Layout";
import SearchItem from "../components/SearchItem";
import { businessAccountController } from "../controllers/businessAccountController";
import { util } from "../public/util";

export default function GlobalSearch() {
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  const [paginationProps, setPaginationProps] = useState({
    pageNumber: -1,
    totalNumberOfPages: 1,
  });
  const [filtersData, setFiltersData] = useState({
    specialityFk: -1,
    minDistance: -1,
    maxDistance: -1,
    minPrice: -1,
    maxPrice: -1,
    myLongitude: -1,
    myLatitude: -1,
    minAvailability: null,
    maxAvailability: null,
  });
  const [loadMore, setLoadMore] = useState(paginationProps.pageNumber === -1);
  useEffect(() => {
    if (
      loadMore &&
      paginationProps.pageNumber <= paginationProps.totalNumberOfPages
    ) {
      let tempFilters = { ...filtersData };
      if (util.isUserAuthorized()) {
        let user = util.getUser();
        tempFilters["userId"] = user.userInfo.userId;
      }
      businessAccountController
        .globalSearch({
          body: tempFilters,
          pageNumber:
            paginationProps.pageNumber === -1 ? 1 : paginationProps.pageNumber,
          recordsByPage: 3,
        })
        .then((response) => {
          let data = response.data;
          setSearchData(data.data);
          let tempPaginationProps = { ...paginationProps };
          tempPaginationProps.pageNumber =
            tempPaginationProps.pageNumber === -1
              ? 2
              : tempPaginationProps.pageNumber + 1;
          tempPaginationProps.totalNumberOfPages = data.totalNumberOfPages;
          setPaginationProps(tempPaginationProps);
        })
        .then(() => {
          setLoadMore(false);
        });
    }
  }, [loadMore]);
  useEffect(() => {
    if (util.isUserAuthorized()) {
      let tempSearchData = [...searchData];
      tempSearchData = tempSearchData.filter((sd) => sd.userDetails.favoriteId !== -1);
      let tempFavorites = [];
      for (let i = 0; i < tempSearchData.length; i++) {
        tempFavorites.push({
          businessAccountFk: tempSearchData[i].userDetails.businessAccountId    ,
          favoriteId: tempSearchData[i].userDetails.favoriteId,
        });
      }
      dispatch({
        type: "SET_FAVORITE_DOCTORS",
        favoriteDoctors: tempFavorites,
      });
    }
  }, [searchData]);
  return (
    <LayoutWrapper withFooter={true}>
      <section style={{ padding: "160px 0 120px" }}>
        <div className="d-flex flex-wrap">
          {searchData.map((sd, index) => {
            return <SearchItem item={sd} />;
          })}
        </div>
      </section>
    </LayoutWrapper>
  );
}
