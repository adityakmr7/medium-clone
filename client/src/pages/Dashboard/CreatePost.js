import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Textarea } from "@chakra-ui/textarea";
import { Formik } from "formik";
import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, "BOLD");

    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const focusEditor = () => {
    editorRef.current.focus();
  };
  console.log("editorState", editorState);
  return (
    <Box>
      <Box
        onCLick={focusEditor}
        margin="auto"
        width="container.md"
        marginTop={10}
        borderWidth={"0.5px"}
        borderColor="grey"
        borderStyle="solid"
        minHeight="6em"
      >
        <Editor
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};

export default CreatePost;
