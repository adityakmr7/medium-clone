import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POST } from "../../apollo/postQuery";
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
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading) {
    return <MLoader />;
  }

  const handleNavigateToDetail = (id) => {
    props.history.push(`/dashboard/${id}`);
  };
  return (
    <Box margin="auto" width="80%">
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

export default Dashboard;
