import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POST, GET_POST_BY_USER } from "../../apollo/postQuery";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import MCard from "../../components/MCard";
import MLoader from "../../components/MLoader";

const Dashboard = (props) => {
  const { loading, error, data } = useQuery(GET_POST_BY_USER);
  if (loading) {
    return <MLoader />;
  }

  const handleNavigateToDetail = (id, slug) => {
    props.history.push(`/dashboard/${id}/${slug}`);
  };
  console.log("dashboardData", data);
  return (
    <Box margin="auto" width="100%">
      <Flex flexWrap width="100%" flexDir="column">
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

export default Dashboard;
