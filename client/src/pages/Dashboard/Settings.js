import React from "react";
import { Flex, Box, Text, Divider, Link, Button } from "@chakra-ui/react";

const navigationArr = [
  {
    id: 1,
    label: "Settings",
    path: "/settings",
  },
  {
    id: 2,
    label: "Design",
    path: "/design",
  },
  {
    id: 3,
    label: "Followers",
    path: "/followers",
  },
  {
    id: 4,
    label: "Email settings",
    path: "/email-settings",
  },
  {
    id: 5,
    label: "Connections",
    path: "/connections",
  },
  {
    id: 6,
    label: "Account",
    path: "/account",
  },
  {
    id: 7,
    label: "Membership",
    path: "/membership",
  },
  {
    id: 8,
    label: "Integration tokens",
    path: "/integration-tokens",
  },
  {
    id: 9,
    label: "Security",
    path: "/security",
  },
];

function Settings(props) {
  console.log("path", props);
  const { pathname } = props.history.location;
  return (
    <Flex color="black">
      <Box flex={1}>
        <Box marginTop={10}>
          {navigationArr.map((item, i) => {
            return (
              <Box marginTop={4} marginBottom={4} key={i}>
                <Box mt={8}>
                  <Link style={{ textDecoration: "none" }} to={item.path}>
                    <Text
                      fontSize={20}
                      fontWeight={pathname === item.path ? "bold" : "normal"}
                      textColor={
                        pathname === item.path
                          ? "blackAlpha.900"
                          : "blackAlpha.700"
                      }
                    >
                      {item.label}
                    </Text>
                  </Link>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box flex={4}>
        <Box marginTop={10}>
          <Text fontSize={20} fontWeight="bold" textColor="blackAlpha.900">
            Profile
          </Text>
          <Divider marginTop={5} />
          <Box display="flex" alignItems="center" flexDirection="row">
            <Box mt={6} flex={1}>
              <Text mb={5}>Name</Text>

              <Text>aditya kumar</Text>
              <Divider width={"70%"} mt={2} mb={4} />
              <Text fontSize={12} noOfLines={2}>
                Your name appears on your Profile page, <br /> as your byline,
                and in your responses. It is a required field.
              </Text>
            </Box>
            <Box>
              <Button
                borderRadius={50}
                colorScheme="blackAlpha"
                variant="outline"
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Settings;
