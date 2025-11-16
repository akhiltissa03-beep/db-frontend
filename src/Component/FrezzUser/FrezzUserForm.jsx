

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
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
  import axios from "axios";
  // import "./EmployeeProfileEdit.css";
  import { useEffect, useRef, useState } from "react";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
  import { useToast } from '@chakra-ui/react';
  
const FrezzUserForm = ()=>{
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    // using navigate
    const navigate = useNavigate();
    const toast = useToast();
    // userId of the user
    const { userId } = useParams();
  
    // input fields for all inputs
    const [inputField, setInputField] = useState({
      name: "",
      email: "",
      mobile: "",
      address: "",
      plan: "",
      caller: "",
      status: "",
      loginStatus: "",
      amount : "",
    });
  
    // modal button
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
  
    // useEffect to fetch specific user by ID
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
            status: data?.User?.status,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }, [userId]);
  
    // form change handler
    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setInputField({
        ...inputField,
        [name]: value,
      });
    };

    // delete function call
    const deleteUser = async (id) => {
      try {
        console.log(id);
        const response = await axios.delete(`${apiUrl}/user/delete_user/${id}`);
        if (response.status === 200) {
          navigate("/user/registration");
          alert("User Deleted Succesfully.");
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const SendEmail = async (id) => {
      
      try {
        const payload = {
            amount : inputField.amount
       }
       console.log(inputField.amount,"inputField.amount");

       const config = {
        method : "PUT",
        url : `${apiUrl}/user/update_endDate/${id}`,
        data : payload
       }
        const response = await axios(config);
        console.log(response,"response");
        if (response.status === 200) {
          // alert("User Status Update Successfully....");
          toast({
            title: 'User Status Update Successfully....',
            // description: 'Provide Correct UserId and Password',
            status: 'success',
            duration: 3000, // Toast message will disappear after 3 seconds
            isClosable: true,
            position:"top",
          });
          navigate("/user/frezzuser");
        } else {
          alert("Failed to Update User Status");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
        <>
      <Box
      mb={'1rem'}
        marginLeft={"1rem"}
        marginTop={"1rem"}
        className="employee-form-container"
      >
        <form className="employee-form">
          <Stack direction={["column", "row"]}>
            <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  onChange={onChangeHandler}
                  value={inputField.name}
                  width={{ base: "300px", md: "400px" }}
                  type="text"
                  placeholder="Enter Name"
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
                  placeholder="enter email"
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack direction={["column", "row"]}>
            <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  name="mobile"
                  onChange={onChangeHandler}
                  value={inputField.mobile}
                  width={{ base: "300px", md: "400px" }}
                  type="number"
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={inputField.address}
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
                <FormLabel>Plan</FormLabel>
                <Select
                  name="plan"
                  onChange={onChangeHandler}
                  value={inputField.plan}
                  width={{ base: "300px", md: "400px" }}
                  placeholder="Select option"
                >
                  <option value="option1">Plan 1</option>
                  <option value="option2">Plan 2</option>
                  <option value="option3">Plan 3</option>
                  <option value="option3">Plan 4</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Caller</FormLabel>
                <Select
                  name="caller"
                  onChange={onChangeHandler}
                  value={inputField.caller}
                  width={{ base: "300px", md: "400px" }}
                  placeholder="Select option"
                >
                  <option value="option1">Caller 1</option>
                  <option value="option2">Caller 2</option>
                  <option value="option3">Caller 3</option>
                  <option value="option3">Caller 4</option>
                </Select>
              </FormControl>
            </Box>
          </Stack>
  
          <Stack direction={["column" ,"row"]}>
            <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Status</FormLabel>
                <Input
                 width={{ base: "300px", md: "400px" }}
                  type="text"
                  name="status"
                  onChange={onChangeHandler}
                  value={inputField.status}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Login Status</FormLabel>
                <Input
                  width={{ base: "300px", md: "400px" }}
                  type="text"
                  name="status"
                  value={inputField.status}
                  onChange={onChangeHandler}
                />
              </FormControl>
            </Box>
          </Stack>
          <Box>
              <FormControl className="employee-form-group">
                <FormLabel>Amount</FormLabel>
                <Input
                 width={{ base: "300px", md: "400px" }}
                  placeholder="Enter Your Amount"
                  type="number"
                  name="amount"
                  value={inputField.amount}
                  onChange={onChangeHandler}
                />
              </FormControl>
            </Box>
        </form>
  
        {/* <DeleteIcon onClick={onOpen} /> */}
        <Button
          marginTop={"1rem"}
          _hover={{ background: "white", color: "gray" }}
          onClick={onOpen}
          bg={"red"}
        >
          Delete
        </Button>
        {/* Modal Code */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete User
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You want to delete !!.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onClose();
                    deleteUser(userId);
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  
        <Button
          onClick={() => SendEmail(userId)}
          marginTop={"1rem"}
          marginLeft={"1rem"}
          colorScheme="blue"
        >
          Extend
        </Button>
      </Box>
      </>
)}

export default FrezzUserForm;