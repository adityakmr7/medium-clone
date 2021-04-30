import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
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
  imageUrl,
}) {
  console.log("MaCard", imageUrl);
  return (
    <Box
      paddingTop={3}
      paddingBottom={2}
      onClick={() => onClick(_id, slug)}
      boxShadow="lg"
      m={2}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexDir="row"
        alignItems="center"
        width="80%"
      >
        <Box marginLeft={5} margin="10">
          <Text fontSize="5xl">{title}</Text>
          <Text>{content}</Text>
          <Text>{humanReadableDate(createdAt)}</Text>
          <Text>{humanReadableDate(updatedAt)}</Text>
          <Text>{creator.username}</Text>
        </Box>
        {/* <Box>
          <img src={imageUrl} style={{ width: 200, height: 200 }} />
        </Box> */}
      </Box>
    </Box>
  );
}

export default MCard;
