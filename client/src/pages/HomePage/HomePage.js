import { useQuery } from "@apollo/client";
import {
  Container,
  Grid,
  Box,
  Text,
  GridItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { GET_ALL_POST } from "../../apollo/postQuery";
import MFadeIn from "../../components/animations/MFadeIn";
import MCard from "../../components/MCard";
import MLoader from "../../components/MLoader";
import Navigation from "../../components/Navigation";

const HomePage = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading) {
    return <MLoader />;
  }

  const handleNavigateToDetail = (id, slug) => {
    props.history.push(`/${id}/${slug}`);
  };
  return (
    <Box margin="auto">
      <Flex width="100%" flexDirection="column">
        {data &&
          data.posts &&
          data.posts.posts &&
          data.posts.posts.map((post, i) => {
            return (
              <MFadeIn>
                <MCard onClick={handleNavigateToDetail} key={i} {...post} />
              </MFadeIn>
            );
          })}
      </Flex>
    </Box>
  );
};

export default HomePage;
