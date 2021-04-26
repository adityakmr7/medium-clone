import { useQuery } from "@apollo/client";
import { Divider, Text } from "@chakra-ui/layout";
import React from "react";
import { GET_PROFILE } from "../../apollo/profileQuery";
import MLoader from "../MLoader";
import MError from "../MError";
import MSettingsField from "../MSettingsField";
import { Formik } from "formik";
import * as Yup from "yup";
const Profile = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);
  if (error) {
    return <MError />;
  }
  if (loading) {
    return <MLoader />;
  }

  const {
    firstName,
    lastName,
    profilePic,
    url,
    username,
    bio,
  } = data.userProfile;
  const validation = Yup.object().shape({
    name: Yup.string().min(2, "Too Short").required("Title Required"),
    bio: Yup.string().min(5, "Too Short").required("Content Required"),
    userName: Yup.string().required("UserName Is Required"),
    url: Yup.string().required("Url is required"),
  });

  return (
    <>
      <Text fontSize={20} fontWeight="bold" textColor="blackAlpha.900">
        Profile
      </Text>
      <Divider marginTop={5} />
      <Formik
        initialValues={{ name: "", content: "", imageUrl: "" }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
            <MSettingsField
              values={values.name}
              handleChange={handleChange}
              name="name"
              label="Name"
              defaultValue={`${firstName} ${lastName}`}
              description="Your name appears on your Profile page, <br /> as your byline, and
            in your responses. It is a required field."
              onClick={() => {}}
            />
            <MSettingsField
              label="Bio"
              defaultValue={bio}
              description="Your name appears on your Profile page, <br /> as your byline, and
            in your responses. It is a required field."
              onClick={() => {}}
            />
            <MSettingsField
              imageUrl={profilePic ? profilePic : "https://bit.ly/broken-link"}
              label="Photo"
              fullName={`${firstName} ${lastName}`}
              defaultValue="https://bit.ly/broken-link"
              description="Your photo appears on your Profile page and with your stories across Medium.
            <br/>
            Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF."
              onClick={() => {}}
            />
            <MSettingsField
              label="UserName"
              defaultValue={username}
              description="Your name appears on your Profile page, <br /> as your byline, and
            in your responses. It is a required field."
              onClick={() => {}}
            />
            <MSettingsField
              label="Url"
              defaultValue={url}
              description="Your name appears on your Profile page, <br /> as your byline, and
            in your responses. It is a required field."
              onClick={() => {}}
            />
          </>
        )}
      </Formik>
    </>
  );
};

export default Profile;
