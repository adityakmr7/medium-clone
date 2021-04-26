// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { GET_POST_DETAIL } from "../../apollo/postQuery";
import MError from "../../components/MError";
import MLoader from "../../components/MLoader";
const PostDetail = (props) => {
  const path = props.history.location.pathname;
  const pathLength = path.split("/").length;
  const index = pathLength === 4 ? 2 : 1;
  const id = path.split("/")[index];

  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { id: id },
  });
  if (error) {
    return <MError />;
  }
  if (loading) {
    return <MLoader />;
  }

  const { title, content, slug } = data.getPostDetail;
  console.log("Postdetail", data, id);
  return (
    <Box>
      <Text fontSize="6xl">{title}</Text>
      <Text>{slug}</Text>
      <Box>
        <Text fontSize="3xl">{content}</Text>
      </Box>
    </Box>
  );
};
export default PostDetail;
