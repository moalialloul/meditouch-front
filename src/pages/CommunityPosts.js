import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Card, Col, Typography, Timeline, Input } from "antd";
import Title from "antd/lib/skeleton/Title";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../assets/styles/schedule.css";
import Main from "../components/layout/Main";
import { businessAccountController } from "../controllers/businessAccountController";
import { userController } from "../controllers/userController";
import { SocketWrapperContext } from "../public/SocketWrapper";

export default function CommunityPosts() {
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loadMore, setLoadMore] = useState(
    userData.communityPosts.pageNumber === -1
  );
  console.log(userData)
  useEffect(() => {
    if (
      userData.communityPosts.pageNumber <=
        userData.communityPosts.totalNumberOfPages &&
      loadMore
    )
      userController
        .getCommunityPosts({
          pageNumber:
            userData.communityPosts.pageNumber === -1
              ? 1
              : userData.communityPosts.pageNumber,
          recordsByPage: 3,
          searchText: "null",
        })
        .then((response) => {
          dispatch({
            type: "SET_COMMUNITY_POSTS",
            communityPosts: {
              pageNumber:
                userData.communityPosts.pageNumber === -1
                  ? 2
                  : userData.communityPosts.pageNumber + 1,
              totalNumberOfPages: response.data.totalNumberOfPages,
              posts: [
                ...userData.communityPosts.posts,
                ...response.data.communityPosts,
              ],
            },
          });
          setLoadMore(false)
        });
  }, [loadMore]);

  const [addPostVisibility, setAddPostVisibility] = useState(false);
  const [postDetails, setPostDetails] = useState({
    postDescription: "",
    postService: "",
  });
  function updatePostDetails(key, value) {
    let tempPostDetails = { ...postDetails };
    tempPostDetails[key] = value;
    setPostDetails(tempPostDetails);
  }
  function addPost() {
    userController
      .addCommunityPost({
        body: {
          postService: postDetails.postService,
          postDescription: postDetails.postDescription,
          userFk: userData.userInfo.userId,
        },
      })
      .then((response) => {});
  }
  return (
    <Main>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
        <Button
          type="primary"
          onClick={() => setAddPostVisibility(!addPostVisibility)}
        >
          Post
        </Button>
        {addPostVisibility && (
          <Card bordered={false} className="criclebox h-full">
            <Input
              type="text"
              placeholder="Service Title"
              onChange={(e) => updatePostDetails("postService", e.target.value)}
            />
            <Input
              type="text"
              value={postDetails.postDescription}
              onChange={(e) =>
                updatePostDetails("postDescription", e.target.value)
              }
            />

            <div className="d-flex w-100 justify-content-end">
              <Button type="primary" onClick={() => addPost()}>
                Add Post
              </Button>
            </div>
          </Card>
        )}
        <Card bordered={false} className="criclebox h-full">
          {userData.communityPosts.posts.map((post, index) => {
            return (
              <div key={"post" + index} className="mt-3">
                <div> {post.firstName + " " + post.lastName}</div>
                <div> {post.postService}</div>
                <div> {post.postDescription}</div>
              </div>
            );
          })}
          {userData.communityPosts.pageNumber !== -1 && userData.communityPosts.pageNumber <=
            userData.communityPosts.totalNumberOfPages && (
            <Button type="primary" onClick={() => setLoadMore(true)}>
              load
            </Button>
          )}
        </Card>
      </Col>
    </Main>
  );
}
