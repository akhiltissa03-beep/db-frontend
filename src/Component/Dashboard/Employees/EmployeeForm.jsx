import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

const Employeeform = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const employeesDataPayload = { ...data };

      console.log("data", employeesDataPayload);
      const apiUrl = import.meta.env.VITE_APP_API_URL;

      const config = {
        method: "POST",
        url: `${apiUrl}/user/add_employee`,
        data: employeesDataPayload,
      };

      const AddEmployeeApiResponse = await axios(config);

      console.log("add", AddEmployeeApiResponse);
      navigate("/employees");
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      toast({
        title: "Email has Already been used",
        
        status: "error",
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box className="employee-form-container" textAlign="center">
      <Box marginBottom={"1rem"} fontSize={"2rem"} fontWeight={"700"}>
        Add Employees
      </Box>
      <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} position="relative">
          <FormControl>
            <FormLabel textAlign="top" width={{ base: "33%", md: "55%" }}>
              Name
            </FormLabel>
            <Input
              width={{ base: "80%", md: "50%" }}
              name="name"
              id="name"
              type="text"
              {...register("name", {
                required: "Name is Requird",
                message: "invalid input",
              })}
              placeholder="Enter Name"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.name && <Box color="red">{errors.name.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel 
            marginLeft={'2rem'}
            textAlign="top"  width={{ base: "33%", md: "55%" }}>
              Mobile Number
            </FormLabel>
            <Input
              width={{ base: "80%", md: "50%" }}
              type="number"
              id="mobile"
              name="mobile"
              {...register("mobile", {
                required: "Mobile number is required",
                min: {
                  value: 1000000000,
                  message: "Mobile number should be at least 10 digits",
                },
                max: {
                  value: 9999999999,
                  message: "Mobile number should not exceed 10 digits",
                },
              })}
              placeholder="Enter Mobile No"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.mobile && <Box color="red">{errors.mobile.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel width={{ base: "33%", md: "55%" }} textAlign="top">
              Email
            </FormLabel>
            <Input
              width={{ base: "80%", md: "50%" }}
              id="email"
              type="email"
              name="email"
              {...register("email", { required: "Email is required" })}
              placeholder=".......@gmail.com"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.email && <Box color="red">{errors.email.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel width={{ base: "40%", md: "57%" }} textAlign="top">
              Address
            </FormLabel>
            <Input
              width={{ base: "80%", md: "50%" }}
              id="address"
              type="address"
              name="address"
              {...register("address", { required: "address is required" })}
              placeholder="Add You Adress"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.address && <Box color="red">{errors.address.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel width={{ base: "45%", md: "60%" }} textAlign="top">
              Designation
            </FormLabel>
            <Input
              width={{ base: "80%", md: "50%" }}
              id="designation"
              type="designation"
              name="designation"
              {...register("designation", {
                required: "designation is required",
              })}
              placeholder="Enter Your Designation"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.designation && (
              <Box color="red">{errors.designation.message}</Box>
            )}
          </FormControl>
          <FormControl>
            <FormLabel width={{ base: "33%", md: "55%" }} textAlign="top">
              Salary
            </FormLabel>
            <Input
              width={{ base: "80%", md: "50%" }}
              id="salary"
              type="salary"
              name="salary"
              {...register("salary", { required: "salary is required" })}
              placeholder="Enter Your Salary"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.salary && <Box color="red">{errors.salary.message}</Box>}
          </FormControl>
        </Stack>

        <Button
          className="employee-btn"
          colorScheme="teal"
          mt="4"
          _hover={{ bgColor: "teal.600" }}
          width="30%"
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default Employeeform;
