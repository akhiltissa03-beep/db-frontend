import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import React from "react";
// import "./EmployeeProfileEdit.css";
import { useToast } from '@chakra-ui/react';
const NewAssignment = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const token = JSON.parse(sessionStorage.getItem("token"));
  const { email, _id } = token;
  // console.log(email, "Get Email");
  // console.log(_id, "Get ID");
  const toast = useToast();

  const Navigate = useNavigate();
  // state hook to take input from form
  const [data, setData] = useState("");
  const [inputFields, setInputFields] = useState({
    name: "",
    address: "",
    pinCode: "",
    jobFunctional: "",
    phone: "",
    annualRevenue: "",
    cleanCode: "",
  });
  useEffect(() => {
    getDataAssignment();
  }, [email]);
  console.log(email);

  const getDataAssignment = async () => {
    try {
      const config = {
        method: "POST",
        url: `${apiUrl}/user/get_assignment_details`,
        data: { email: email }, // Pass the email as part of the request body
      };

      const response = await axios(config);
      console.log("Get response:", response.data);
      // Assuming you have a state variable setData to store the response
      setData(response?.data?.assignmentDetail);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(data, "Get Data");

  // console.log(data?._id ,"Assingment ID");
  const RelodeHandle = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/refresh_assignment_detail/${data?._id}`,
      };
      const responce = await axios(config);
      console.log(responce, "Relode ");
      getDataAssignment();
    } catch (err) {
      // console.log("error", err);
      alert("error occured")
    }
  };

  // on change capture the input from frontsnd handler
  const onChangehandler = (e) => {
    //console.log(e , "e")
    const { name, value } = e.target;
    setInputFields((prev) => {
      return {
        ...prev, // value saari isme daalra
        [name]: value,
      };
    });
  };
  // handle to submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(inputFields);
    try {
      const id = sessionStorage.getItem("id");  
      console.log(id ,"id")
      if (!id) {
        console.error("User ID is missing in sessionStorage");
        return;
      }
      // for (const key in inputFields) {
      //   if (!inputFields[key]) {
      //     alert(`Please enter ${key} value.`);
      //     return;
      //   }
      // }
      const response = await axios.post(
        `${apiUrl}/user/add_assignment/${id}`,
        // body : JSON.stringify(inputFields), 
         inputFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
       console.log(response ,"response") ;
      // alert("Assignment Saved successfully.");
      toast({
        title: 'Assignment Saved successfully',
        // description: 'Provide Correct UserId and Password',
        status: 'success',
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position:"top",
      });
      getDataAssignment();
      Navigate("/assignment");
    } catch (error) {
      console.log(error);
      // alert("An error occurred. Please try again later.");
      toast({
        title: 'An error occurred. Please try again later.',
        // description: 'Provide Correct UserId and Password',
        status: 'success',
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position:"top",
      });
    }
  };

  return (
    <Box className="employee-form-container">
      {/* <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap={4}
        p="7"
        borderWidth="1px"
        borderRadius="md"
        mb="4"
        color="#393e46"
      >
        <Box>
          <Text fontSize="xl">Name : {data?.name}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">Address : {data?.address}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">Pin Code : {data?.pinCode}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">Job Function :{data?.jobFunctional}</Text>
        </Box>

        <Divider gridColumn="span 4" my="2" />

        <Box>
          <Text fontSize="xl">Mobile : {data?.phone}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">Annual Revenue : {data?.annualRevenue}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">Client Code : {data?.cleanCode}</Text>
        </Box>
      </Box> */}
      <Box
        display="grid"
         gridTemplateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={4}
        p="7"
        borderWidth="1px"
        borderRadius="md"
        mb="4"
        color="#393e46"
        style={{ fontFamily: 'BILLY ARGEL FONT', fontStyle: 'italic' , fontWeight:"bold" }}
      >
        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>Name: {data?.name}</Text>
        </Box>
        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Address: {data?.address}
          </Text>
        </Box>
        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Pin Code: {data?.pinCode}
          </Text>
        </Box>
        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Job Function: {data?.jobFunctional}
          </Text>
        </Box>

        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>Mobile: {data?.phone}</Text>
        </Box>
        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Annual Revenue: {data?.annualRevenue}
          </Text>
        </Box>
        <Box>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Client Code: {data?.cleanCode}
          </Text>
        </Box>
      </Box>

      <Box
        marginBottom={"1rem"}
        fontSize={"2rem"}
        fontWeight={"700"}
        p={"20px"}
      >
        New Assignment
      </Box>
      <form
        className="employee-form"
        onSubmit={handleSubmit}
        style={{ padding: "20px" }}
      >
        <Stack direction={{ md: "row", base: "column" }}>
          <Box>
            <FormControl isRequired className="employee-form-group">
              <FormLabel> Name</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={onChangehandler}
                required
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired className="employee-form-group">
              <FormLabel>Address</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Enter Address"
                name="address"
                onChange={onChangehandler}
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={{ md: "row", base: "column" }}>
          <Box>
            <FormControl isRequired className="employee-form-group">
              <FormLabel>PinCode</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="number"
                placeholder="Enter PInCode"
                name="pinCode"
                onChange={onChangehandler}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired className="employee-form-group">
              <FormLabel>Job Function</FormLabel>
              <Input
               width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Enter your Job Function"
                name="jobFunctional"
                onChange={onChangehandler}
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={{ md: "row", base: "column" }}>
          <Box>
            <FormControl isRequired className="employee-form-group">
              <FormLabel>Mobile</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                placeholder="Enter the Number"
                name="phone"
                onChange={onChangehandler}
              />
            </FormControl>
           
          </Box>
          <Box>
            <FormControl isRequired className="employee-form-group">
              <FormLabel>Annual Revenue</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Enter Annual Revenue"
                name="annualRevenue"
                onChange={onChangehandler}
              />
            </FormControl>
          </Box>
        </Stack>
        <Box>
          <FormControl isRequired className="employee-form-group">
            <FormLabel>Client Code</FormLabel>
            <Input
              width={{ base: "300px", md: "400px" }}
              type="text"
              placeholder="Enter Client Code"
              name="cleanCode"
              onChange={onChangehandler}
            />
          </FormControl>
        </Box>
        <Stack direction={{ md: "row", base: "column" }}>
          <Box>
            <Button
              className="employee-btn"
              colorScheme="teal"
              mt="4"
              width={{ md: "4rem" }}
              onClick={handleSubmit}
              style={{
                marginLeft: "50px",
              }}
            >
              Submit
            </Button>
          </Box>
          <Box>
            <Button
              // onClick={Previouspage}
              className="employee-btn"
              colorScheme="teal"
              mt="4"
              width={{ md: "4rem" }}
              style={{
                marginLeft: "50px",
              }}
              onClick={RelodeHandle}
            >
              Reload
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};
export default NewAssignment;
