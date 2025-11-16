
import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import logo from "../../Images/logo.png";
import { useNavigate } from 'react-router-dom';
import OtpInput from "react-otp-input";
import axios from "axios";
import { useToast } from '@chakra-ui/react';
const ForgetPassword = () => {

  let navigate = useNavigate();
  const toast = useToast();

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGetOtp = () => {
    // Perform logic to send OTP to the email address
    onOpen();
    forOtpIntegration()
  };
  const forOtpIntegration = async () => {
    try {
      if (!otp) {
        alert('Please Enter OTP');
      }
      const handlePayload = {
        passwordResetOTP: otp,
      };

      const config = {
        method: "POST",
        url: `${apiUrl}/user/verify_otp`,
        data: handlePayload,
      };

      const response = await axios(config);
      if (response.status === 200) {
        // Assuming the actual OTP value is available in the response
        const verifiedOtp = response.data.otp; // Adjust this based on your API response
        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        setOtp(verifiedOtp);
        alert('OTP verifyed Successfully...');
        onClose(); // Close the modal after OTP verification
        navigate("/setPassword"); // Correct the navigation syntax
        console.log(response, "For Otp ");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };
  // function to submit email oncick
  const submitEmail = async () => {
    try {
      if (!email) {
        // Email is empty
        alert("Please enter your email.");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // Incorrect email format
        alert("Please enter a valid email address.");
        return;
      }

      const payload = {
        email: email,
      };

      const config = {
        method: "POST",
        url: `${apiUrl}/user/forgot_password`,
        data: payload,
      };

      const response = await axios(config);
      setEmail(response);
      console.log(response, "Email will be shown here");
      // alert("OTP Sent successfully.");
      toast({
        title: 'OTP Sent successfully',
        // description: 'Provide Correct UserId and Password',
        status: 'success',
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position: "top",
      });
      onOpen();
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
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      textAlign="center"
    >
      <Flex direction="column" alignItems="center" fontFamily="Poppins">
        <Image width={"60%"} src={logo} alt="" />
        <Heading
          marginTop={'1rem'}
        >Forget Password</Heading>
      </Flex>

      <Input
        marginTop={"1rem"}
        padding={"1rem"}
        width={{ base: "80%", md: "30%" }}
        mx="auto"
        background="#ebe9eb"
        height="3rem"
        required
        type="email"
        placeholder="Enter Email"
        onFocus={(e) => (e.target.style.outline = "none")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Box

        width={{ base: "100%", md: "100%" }}

        marginTop="1rem">
        <Button
          _hover={{ bg: "lightgray", color: "black" }}
          height={{ base: "3rem" }}
          color={"white"} bg={"black"} onClick={submitEmail}>
          Get OTP
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"whitesmoke"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton bg={"gray"} />
          <ModalBody
            style={{ width: "90%", display: "flex", justifyContent: "center" }}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ padding: "3px" }}>-</span>}

              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "30px",
                    border: "2px solid black",
                    display: "flex",
                    textAlign: "center",
                  }}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Box width={"100%"} marginTop="1rem">
              <Button color={"white"} bg={"black"} onClick={handleGetOtp}>
                Verify OTP
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ForgetPassword;
