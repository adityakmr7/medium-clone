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
import MCard from "../../components/MCard";
import MLoader from "../../components/MLoader";
import Navigation from "../../components/Navigation";

const HomePage = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading) {
    return <MLoader />;
  }

  const handleNavigateToDetail = (id) => {
    props.history.push(`/dashboard/${id}`);
  };
  return (
    <Box margin="auto" width="100%">
      <Flex>
        {data &&
          data.posts &&
          data.posts.posts &&
          data.posts.posts.map((post, i) => {
            return <MCard onClick={handleNavigateToDetail} key={i} {...post} />;
          })}
      </Flex>
    </Box>
  );
};

export default HomePage;
