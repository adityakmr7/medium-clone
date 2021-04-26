import React from "react";
import { Flex, Box, Text, Divider, Link, Button } from "@chakra-ui/react";
import Profile from "../../components/SettingsSubComponent/Profile";
import { useQuery } from "@apollo/client";
import MLoader from "../../components/MLoader";
import { GET_PROFILE } from "../../apollo/profileQuery";

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
          <Profile />
        </Box>
      </Box>
    </Flex>
  );
}

export default Settings;
