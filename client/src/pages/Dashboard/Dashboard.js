import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POST } from "../../apollo/postQuery";
import { Box, Container, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { humanReadableDate } from "../../utils/DateFormater";

const Dashboard = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  const handleNavigateToDetail = (id) => {
    props.history.push(`/dashboard/${id}`);
  }
  return (
    
    <Box margin="auto" width="80%" >
        <Flex>
        {data &&
          data.posts &&
          data.posts.posts &&
          data.posts.posts.map((post, i) => {
            return (
              <Box onClick={() =>handleNavigateToDetail(post._id)} boxShadow="lg" key={i} m={2} >
                <Box marginLeft={5} margin="10">
                <Text fontSize="5xl">{post.title}</Text>
                <Text>{post.content}</Text>
                <Text>{humanReadableDate(post.createdAt)}</Text>
                <Text>{humanReadableDate(post.updatedAt)}</Text>
                  <Text>{post.creator.username}</Text>
                  </Box>
              </Box>
            );
          })}
          </Flex>
      </Box>

  );
};

export default Dashboard;
