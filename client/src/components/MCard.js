import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { humanReadableDate } from "../utils/DateFormater";

function MCard({
  onClick,
  _id,
  title,
  content,
  createdAt,
  updatedAt,
  creator,
  slug,
}) {
  return (
    <Box onClick={() => onClick(_id, slug)} boxShadow="lg" m={2}>
      <Box marginLeft={5} margin="10">
        <Text fontSize="5xl">{title}</Text>
        <Text>{content}</Text>
        <Text>{humanReadableDate(createdAt)}</Text>
        <Text>{humanReadableDate(updatedAt)}</Text>
        <Text>{creator.username}</Text>
      </Box>
    </Box>
  );
}

export default MCard;
