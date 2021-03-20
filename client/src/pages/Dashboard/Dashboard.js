import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POST } from "../../apollo/postQuery";
import { Box, Container, Text } from "@chakra-ui/react";

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Container>

      
      {data.posts.posts.map((post, i) => {
        return (
          <Box key={i} m ={5} style={{border: '2px solid #000000'}}>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>{post.createdAt}</Text>
            <Text>{post.updatedAt}</Text>
            <Text>{post.creator.username}</Text>
          </Box>
        );
      })}
      </Container>
    </div>
  );
};

export default Dashboard;
