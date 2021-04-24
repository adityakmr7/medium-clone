import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Textarea } from "@chakra-ui/textarea";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CREATE_POST } from "../../apollo/postQuery";

const CreatePost = () => {
  const [createPost, { data, error, loading }] = useMutation(CREATE_POST);
  const handleFormSubmit = async (data) => {
    let formData = new FormData();
    formData.append("image", data.imageUrl);
    const response = await fetch("http://localhost:8080/post-image", {
      method: "PUT",
      body: formData,
    });
    const responseToJson = await response.json();
    const responseData = await responseToJson;
    const imagePath = responseData.filePath;
    if (!imagePath) {
      alert("Image Should be either in png , jpg format");
    }
    createPost({
      variables: {
        title: data.title,
        content: data.content,
        imageUrl: imagePath,
      },
    })
      .then((res) => {
        console.log("CreatePost", res);
      })
      .catch((err) => console.log(err));
  };
  const validation = Yup.object().shape({
    title: Yup.string().min(2, "Too Short").required("Title Required"),
    content: Yup.string().min(5, "Too Short").required("Content Required"),
    imageUrl: Yup.string().required("Image is Required"),
  });
  return (
    <Box>
      <Box margin="auto" width="container.md" marginTop={10}>
        <Formik
          initialValues={{ title: "", content: "", imageUrl: "" }}
          validationSchema={validation}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await handleFormSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Stack>
              <Input
                value={values.title}
                type="text"
                name="title"
                onChange={handleChange}
                size="lg"
                placeholder="Title"
              />
              {errors.title ? <Text>{errors.title}</Text> : null}
              <Textarea
                size="lg"
                type="text"
                name="content"
                onChange={handleChange}
                placeholder="Content"
              />
              {errors.content ? <Text>{errors.content}</Text> : null}

              <Input
                type="file"
                onChange={(event) => {
                  setFieldValue("imageUrl", event.currentTarget.files[0]);
                }}
                name="imageUrl"
                placeholder="Add Image"
              />
              {errors.imageUrl ? <Text>{errors.imageUrl}</Text> : null}

              <Button onClick={handleSubmit}>
                {isSubmitting ? <Spinner /> : "Create Post"}
              </Button>
            </Stack>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreatePost;
