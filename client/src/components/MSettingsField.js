import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Text } from "@chakra-ui/layout";
import React from "react";

const MSettingsField = (
  {
    label,
    placeholder,
    defaultValue,
    onClick,
    description,
    imageUrl,
    fullName,
  },
  props
) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" flexDirection="row">
        <Box mt={6} flex={1}>
          <Text mb={5}>{label}</Text>
          {imageUrl ? (
            <Box>
              <Avatar name={fullName} src={imageUrl} />
            </Box>
          ) : (
            <>
              <Input
                border="none"
                defaultValue={defaultValue}
                placeholder={placeholder}
                variant="flushed"
                {...props}
              />
              <Divider width={"70%"} mt={2} mb={4} />
            </>
          )}

          <Text fontSize={12} noOfLines={2}>
            {description}
          </Text>
        </Box>
        <Box>
          <Button
            onClick={onClick}
            borderRadius={50}
            colorScheme="blackAlpha"
            variant="outline"
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MSettingsField;
