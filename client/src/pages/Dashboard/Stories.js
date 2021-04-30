import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { GET_POST_BY_USER } from "../../apollo/postQuery";
import MCard from "../../components/MCard";
import MError from "../../components/MError";
import MLoader from "../../components/MLoader";

const Stories = (props) => {
  const { loading, error, data } = useQuery(GET_POST_BY_USER);
  if (loading) {
    return <MLoader />;
  }
  if (error) {
    return <MError />;
  }
  console.log("Stories", loading, error, data);
  const handleNavigateToDetail = (id, slug) => {
    props.history.push(`/dashboard/${id}/${slug}`);
  };
  if (data.postsByUser.posts.length === 0) {
    return <MError label="No Posts Yet" />;
  }
  console.log("Stores", data);
  return (
    <Box margin="auto" width="100%">
      <Flex flexWrap width="100%" flexDir="column">
        {data &&
          data.postsByUser &&
          data.postsByUser.posts.map((post, i) => {
            return <MCard onClick={handleNavigateToDetail} key={i} {...post} />;
          })}
      </Flex>
    </Box>
  );
};

export default Stories;
