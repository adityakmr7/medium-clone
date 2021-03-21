import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POST } from "../../apollo/postQuery";
import { Box, Container, SimpleGrid, Spinner, Text } from "@chakra-ui/react";

const Dashboard = () => {
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
  return (
    
    <Container width={'100%'}>
        <SimpleGrid width="100%">
        {data &&
          data.posts &&
          data.posts.posts &&
          data.posts.posts.map((post, i) => {
            return (
              <Box boxShadow="lg" key={i} m={5} >
                <Box marginLeft={5} margin="10">
                <Text>{post.title}</Text>
                <Text>{post.content}</Text>
                <Text>{post.createdAt}</Text>
                <Text>{post.updatedAt}</Text>
                  <Text>{post.creator.username}</Text>
                  </Box>
              </Box>
            );
          })}
          </SimpleGrid>
      </Container>

  );
};

export default Dashboard;
