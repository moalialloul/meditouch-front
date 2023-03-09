import { Button, Col, Row, Slider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../components/Layout";
import SearchItem from "../components/SearchItem";
import { businessAccountController } from "../controllers/businessAccountController";
import { util } from "../public/util";
import "../assets/styles/global-search.css";
import moment from "moment";
export default function GlobalSearch() {
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [withFavorite, setWithFavorite] = useState(false);
  const [withFavoriteVal, setWithFavoriteVal] = useState(-1);
  const [sliderPrice, setSliderPrice] = useState({
    min: 20,
    max: 40,
  });
  const [sliderDistance, setSliderDistance] = useState({
    min: 20,
    max: 40,
  });
  const [availabilityRange, setAvailabilityRange] = useState({
    min: "",
    max: "",
  });
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
    isFavorite: -2,
    myLongitude: -1,
    myLatitude: -1,
    minAvailability: null,
    maxAvailability: null,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(
              (position) => {
                let tempFilters = { ...filtersData };
                tempFilters.myLatitude = position.coords.latitude;
                tempFilters.myLongitude = position.coords.longitude;

                setFiltersData(tempFilters);
              },
              (error) => {}
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);
  const [loadMore, setLoadMore] = useState(paginationProps.pageNumber === -1);
  useEffect(() => {
    if (
      loadMore &&
      paginationProps.pageNumber <= paginationProps.totalNumberOfPages
    ) {
      setLoading(true);
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
          setLoading(false);
        });
    }
  }, [loadMore]);
  useEffect(() => {
    if (util.isUserAuthorized()) {
      let tempSearchData = [...searchData];
      tempSearchData = tempSearchData.filter(
        (sd) => sd.userDetails.favoriteId !== -1
      );
      let tempFavorites = [];
      for (let i = 0; i < tempSearchData.length; i++) {
        tempFavorites.push({
          businessAccountFk: tempSearchData[i].userDetails.businessAccountId,
          favoriteId: tempSearchData[i].userDetails.favoriteId,
        });
      }
      dispatch({
        type: "SET_FAVORITE_DOCTORS",
        favoriteDoctors: tempFavorites,
      });
    }
  }, [searchData]);
  function updateFilters(key, value) {
    let tempFilters = { ...filtersData };
    tempFilters[key] = value;
    setFiltersData(tempFilters);
    setPaginationProps({
      pageNumber: -1,
      totalNumberOfPages: 1,
    });
    setLoadMore(true);
  }
  return (
    <LayoutWrapper withFooter={true}>
      <section style={{ padding: "160px 0 120px" }}>
        <div>
          <select
            defaultValue={-1}
            onChange={(e) => updateFilters("specialityFk", e.target.value)}
          >
            <option value={-1}>All Specialities</option>
            {userData.specialities.map((sp) => {
              return (
                <option value={sp.specialityId}>{sp.specialityName}</option>
              );
            })}
          </select>
          <div className="d-flex">
            Slider Price
            <Slider
              range
              onChange={(e) => {
                let tempSliderPrice = { ...sliderPrice };
                tempSliderPrice.min = e[0];
                tempSliderPrice.max = e[1];
                setSliderPrice(tempSliderPrice);
              }}
              step={5}
              min={0}
              max={50}
              defaultValue={[20, 40]}
              className="global-search-slider"
            />
            <Button
              type="primary"
              onClick={() => {
                let tempFilters = { ...filtersData };
                tempFilters["minPrice"] = sliderPrice.min;
                tempFilters["maxPrice"] = sliderPrice.max;
                setFiltersData(tempFilters);
                setPaginationProps({
                  pageNumber: -1,
                  totalNumberOfPages: 1,
                });
                setLoadMore(true);
              }}
            >
              Apply
            </Button>
            {filtersData.minPrice !== -1 && filtersData.maxPrice !== -1 && (
              <Button
                type="primary"
                onClick={() => {
                  let tempFilters = { ...filtersData };
                  tempFilters["minPrice"] = -1;
                  tempFilters["maxPrice"] = -1;
                  setFiltersData(tempFilters);
                  setPaginationProps({
                    pageNumber: -1,
                    totalNumberOfPages: 1,
                  });
                  setLoadMore(true);
                }}
              >
                Reset
              </Button>
            )}
          </div>
          <div className="d-flex">
            <input
              placeholder="select start date time"
              type="datetime-local"
              onChange={(e) => {
                let tempAvailabilityRange = { ...availabilityRange };
                tempAvailabilityRange.min = e.target.value;
                setAvailabilityRange(tempAvailabilityRange);
              }}
            />
            -
            <input
              placeholder="select start date time"
              type="datetime-local"
              onChange={(e) => {
                let tempAvailabilityRange = { ...availabilityRange };
                tempAvailabilityRange.max = e.target.value;
                setAvailabilityRange(tempAvailabilityRange);
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                let m1 = moment(availabilityRange.min);
                let m2 = moment(availabilityRange.max);
                if (
                  availabilityRange.min === "" ||
                  availabilityRange.max === ""
                ) {
                  alert("times error");
                  return;
                }
                if (m1.isAfter(m2)) {
                  alert("times error");
                  return;
                }
                let tempFilters = { ...filtersData };
                tempFilters["minAvailability"] = availabilityRange.min;
                tempFilters["maxAvailability"] = availabilityRange.max;
                setFiltersData(tempFilters);
                setPaginationProps({
                  pageNumber: -1,
                  totalNumberOfPages: 1,
                });
                setLoadMore(true);
              }}
            >
              Apply
            </Button>
            {filtersData.minAvailability !== null &&
              filtersData.maxAvailability !== null && (
                <Button
                  type="primary"
                  onClick={() => {
                    let tempFilters = { ...filtersData };
                    tempFilters["minAvailability"] = null;
                    tempFilters["maxAvailability"] = null;
                    setFiltersData(tempFilters);
                    setPaginationProps({
                      pageNumber: -1,
                      totalNumberOfPages: 1,
                    });
                    setLoadMore(true);
                  }}
                >
                  Reset
                </Button>
              )}
          </div>
          <div className="d-flex">
            Slider Distance In Km
            {filtersData.myLatitude !== -1 ? (
              <div className="d-flex">
                <Slider
                  range
                  onChange={(e) => {
                    let tempSliderDistance = { ...sliderDistance };
                    tempSliderDistance.min = e[0];
                    tempSliderDistance.max = e[1];
                    setSliderDistance(tempSliderDistance);
                  }}
                  step={5}
                  min={0}
                  max={50}
                  defaultValue={[20, 40]}
                  className="global-search-slider"
                />
                <Button
                  type="primary"
                  onClick={() => {
                    let tempFilters = { ...filtersData };
                    tempFilters["minDistance"] = sliderDistance.min;
                    tempFilters["maxDistance"] = sliderDistance.max;
                    setFiltersData(tempFilters);
                    setPaginationProps({
                      pageNumber: -1,
                      totalNumberOfPages: 1,
                    });
                    setLoadMore(true);
                  }}
                >
                  Apply
                </Button>
              </div>
            ) : (
              "Enable location to benifit from this feature"
            )}
          </div>
          {util.isUserAuthorized() && (
            <div>
              Include Favorites Condition
              <input
                type="checkbox"
                checked={withFavorite}
                onClick={() => {
                  if (withFavorite) {
                    updateFilters("isFavorite", -2);
                  }
                  setWithFavorite(!withFavorite);
                }}
              />
              {withFavorite && (
                <div className="d-flex">
                  <input
                    type="radio"
                    name="withFavorite"
                    onClick={() => updateFilters("isFavorite", 1)}
                  />{" "}
                  Favorite
                  <input
                    type="radio"
                    name="withFavorite"
                    onClick={() => updateFilters("isFavorite", -1)}
                  />{" "}
                  Not Favorite
                </div>
              )}
            </div>
          )}
        </div>
        {loading ? (
          "loading..."
        ) : !loading && searchData.length === 0 ? (
          "no data"
        ) : (
          <div className="d-flex flex-wrap">
            {searchData.map((sd, index) => {
              return <SearchItem item={sd} />;
            })}
          </div>
        )}
      </section>
    </LayoutWrapper>
  );
}
