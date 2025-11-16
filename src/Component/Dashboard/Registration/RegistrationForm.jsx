
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form"
import { useToast } from '@chakra-ui/react';

const RegistrationForm = () => {


  
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { handleSubmit, register, control, reset, formState: { errors } } = useForm();
  const toast = useToast();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userDataPayload = {...data};
      const config = {
        method: "POST",
        url: `${apiUrl}/user/add_user`,
        data: userDataPayload,
      };

      const AdduserApiResponse = await axios(config);
      console.log("add", AdduserApiResponse);
      reset(); 
      toast({
        title: 'Mail Sent Successfully',
        description: 'Open Your Gmail',
        status: 'success',
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position:"top",
      });
      navigate('/user/registration')
    } catch (err) {
      toast({
        title: 'Email has Already been used',
        //description: 'Open Your Gmail',
        status: 'error',
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position:"top",
      });
    }
  };

  return (
    <Box mt="8" mx="auto" width={["90%", "50%"]}>
      <Box color="#DD372D" mb="1rem" fontSize={["1.5rem", "2rem"]} fontWeight="700">
        Add User
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
            name="name"
            id="name"
            type="text"
              {...register("name", { required: 'Name is Requird',message: "invalid input", })}
              placeholder="Enter Name"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.name && <Box color="red">{errors.name.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              type="email"
              name='email'
              {...register("email", { required: "Email is required" })}
              placeholder=".......@gmail.com"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.email && <Box color="red">{errors.email.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              type="number"
              id="mobile"
              name="mobile"
              {...register("mobile", { 
                required: "Mobile number is required",
                min: { value: 1000000000, message: "Mobile number should be at least 10 digits" },
                max: { value: 9999999999, message: "Mobile number should not exceed 10 digits" },
              })}
              placeholder="Enter Mobile No"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.mobile && <Box color="red">{errors.mobile.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              id="address"
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Address"
              _hover={{ borderColor: "teal.500" }}
            />
            {errors.address && <Box color="red">{errors.address.message}</Box>}
          </FormControl>
          <FormControl>
            <FormLabel>Plan</FormLabel>
            <Controller
              control={control}
              name="plan"
              rules={{ required: 'Plan is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select option"
                  _hover={{ borderColor: "teal.500" }}
                >
                  <option value="option1">520</option>
                 
                </Select>
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Caller</FormLabel>
            <Controller
              control={control}
              name="caller"
              rules={{ required: 'Caller is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select option"
                  _hover={{ borderColor: "teal.500" }}
                >
                  <option value="option1">Caller 1</option>
                  <option value="option2">Caller 2</option>
                  <option value="option3">Caller 3</option>
                  <option value="option4">Caller 4</option>
                </Select>
              )}
            />
          </FormControl>
        </Stack>

        
          <Button
            type="submit"
            colorScheme="teal"
            mt="4"
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bgColor: "teal.600" }}
            fontSize="lg"
            fontWeight="bold"
            p={4}
            width="100%" // Set the width to 100% for mobile view
          >
            Save
          </Button>
        
      </form>
    </Box>
  );
};

export default RegistrationForm;

