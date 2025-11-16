import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef } from "react";
// import "./EmployeeProfileEdit.css";
import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

const EditRegistration = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  // getting id from params
  const { userId } = useParams();
  const navigate = useNavigate();
  console.log(userId);

  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    plan: "",
    caller: "",
    endDate: "",
    startDate: "",
    status: "",
  });

  // useEffect to call
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/user/getuser_by_id/${userId}`
        );
        const data = response.data;
        console.log(data?.User.name);
        console.log(data?.User);
        setInputField({
          name: data?.User?.name,
          email: data?.User?.email,
          mobile: data?.User?.mobile,
          address: data?.User?.address,
          plan: "",
          caller: data?.User?.caller,
          endDate: formatDate(data?.User?.endDate),
          startDate: formatDate(data?.User?.startDate),
          status: "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name.includes("Date")) {
      formattedValue = formatDate(new Date(value));
    }

    setInputField((prevValue) => ({
      ...prevValue,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputField);
    try {
      const response = await axios.put(
        `${apiUrl}/user/edit_user/${userId}`,
        inputField,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      alert("Saved successfully.");
      navigate("/user/registration");
    } catch (error) {
      console.log(`Error is ${error}`);
    }
  };

  return (
    <Box
    marginBottom={'1rem'}
      marginLeft={"1rem"}
      marginTop={"1rem"}
      className="employee-form-container"
    >
      <form className="employee-form" onSubmit={handleSubmit}>
        <Stack direction={{ base: "column", md: "row" }}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Name</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Kaveri Kappor"
                name="name"
                value={inputField.name}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={inputField.email}
                onChange={onChangeHandler}
                width={{ base: "300px", md: "400px" }}
                type="email"
                mailto:placeholder="kaveri@gmail.com"
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={inputField.password}
                onChange={onChangeHandler}
                width={{ base: "300px", md: "400px" }}
                type="password"
                placeholder="kaveri@2023"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Access Code</FormLabel>
              <Input
                name="name"
                value={inputField.name}
                onChange={onChangeHandler}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Address"
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Mobile</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="number"
                name="mobile"
                value={inputField.mobile}
                onChange={onChangeHandler}
                placeholder="kaveri@2023"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Address</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Address"
                name="address"
                value={inputField.address}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Caller</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="kaveri@2023"
                name="caller"
                value={inputField.caller}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Amount</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                type="number"
                placeholder="Address"
                name="plan"
                value={inputField.plan}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Start Date</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                name="startDate"
                value={inputField.startDate}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>End date</FormLabel>
              <Input
                width={{ base: "300px", md: "400px" }}
                name="endDate"
                value={inputField.endDate}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Box>
        </Stack>
        <Box>
          <FormControl className="employee-form-group">
            <FormLabel>Remark</FormLabel>
            <Input
              width={{ base: "300px", md: "400px" }}
              type="text"
              placeholder="Remark"
              name=""
            />
          </FormControl>
        </Box>

        <Button
        
          className="employee-btn"
          colorScheme="teal"
          mt="4"
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditRegistration;
