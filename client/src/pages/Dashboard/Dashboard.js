import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POST } from "../../apollo/postQuery";
import { Box, Text } from "@chakra-ui/react";

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {data.posts.posts.map((post, i) => {
        return (
          <Box key={i}>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>{post.createdAt}</Text>
            <Text>{post.updatedAt}</Text>
          </Box>
        );
      })}
    </div>
  );
};

export default Dashboard;
