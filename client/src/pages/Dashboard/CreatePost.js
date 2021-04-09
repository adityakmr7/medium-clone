import { Input } from "@chakra-ui/input";
import { Box, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

const CreatePost = () => (
  <Box>
    <Box margin="auto" width="container.md" marginTop={10}>
      <Stack>
        <Input size="lg" placeholder="Title" />
        <Textarea size="lg" placeholder="Content" />
      </Stack>
    </Box>
  </Box>
);

export default CreatePost;
