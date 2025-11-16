import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Flex,
  VStack,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";

const SetPassword = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Changed from conformPassword to confirmPassword

  const passwordIntegrate = async () => {
    const userId = localStorage.getItem("userId"); // Changed from user_id to userId

    try {
      if (!password || !confirmPassword) {
        alert('Please enter both new and confirm passwords.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please enter the same password in both fields.');
        return;
      }

      const payload = {
        newPassword: password, // Changed from newPassword to password
        confirmPassword: confirmPassword,
      };

      const config = {
        method: "PUT",
        url: `${apiUrl}/user/submit_password/${userId}`, // Changed from user_id to userId
        data: payload,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert('Password saved successfully.');
        navigate("/userlogin");
      } else {
        alert("Failed to save password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle error appropriately, e.g., show a user-friendly error message
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Center height="100vh">
        <VStack spacing={4} width="300px">
          <Flex direction="column" alignItems="center" fontFamily="Poppins">
            <Image src={logo} alt="" />
          </Flex>
          <FormControl>
            <Heading marginLeft={{ base: "2.2rem", md: "1rem" }}>
              SET PASSWORD
            </Heading>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button
            bg={"black"}
            color={"white"}
            _hover={{ bg: "lightgray", color: "black" }}
            size="lg"
            width="100%"
            onClick={passwordIntegrate}
          >
            Submit
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default SetPassword;
