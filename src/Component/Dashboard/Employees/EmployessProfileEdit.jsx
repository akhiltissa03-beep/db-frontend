import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  useDisclosure,
} from "@chakra-ui/react";
import axios, { Axios } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import "./EmployeeProfileEdit.css";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteIcon } from "@chakra-ui/icons";
const EmployeeProfileEdit = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const { userId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("user",userId)
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/user/getemployee_by_id/${userId}`
        );
        const data = response.data;
        console.log(data);
        // console.log(data?.User.name);.

        setName(data?.User.name);
        setEmail(data?.User.email);
        setAddress(data?.User.address);
        setDesignation(data?.User.designation);
        setMobile(data?.User.mobile);
        setSalary(data?.User.salary);
        // alert("Saved successfully.");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const UpdatedValue = async () => {
    try {
      const payload = {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        designation: designation,
        salary: salary,
      };

      const config = {
        method: "PUT",
        url: `${apiUrl}/user/edit_employee/${userId}`,
        data: payload,
      };

      const response = await axios(config);
      navigate("/employees");
      alert("Saved successfully.");
      console.log(response, "res");
    } catch (err) {
      console.log("error in fetching", err);
    }
  };

  //delete data

  const DeleteUser = async (id) => {
    try {
      // const apiresponse
      //console.log(id)
      const response = await axios.delete(
        `http://localhost:5000/user/delete_employee/${id}`
      );
      console.log("res", response);

      navigate("/employees");
      alert("User Deleted Succesfully.");
    } catch (err) {
      console.log("fetching error", err);
    }
  };

  return (
    <Box
      mb={"1rem"}
      ml={"1rem"}
      mt={"1rem"}
      className="employee-form-container"
    >
      <Box as="h3" fontSize="xl" mb="4">
        Edit Employee Detail
      </Box>
      <form className="employee-form">
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                stype="text"
                placeholder="Edit Name"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="email"
                placeholder=".....@gmail.com"
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Mobile</FormLabel>
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="9647*******"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Address</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="Enter Address"
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            {" "}
            <FormControl className="employee-form-group">
              <FormLabel>Salary</FormLabel>
              <Input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="100000"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>designation</FormLabel>
              <Input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder=""
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            {" "}
            <FormControl className="employee-form-group">
              <FormLabel>Access code</FormLabel>
              <Input
                // value={salary}
                // onChange={(e) => setSalary(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="text"
                placeholder="97345"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Password</FormLabel>
              <Input
                // value={designation}
                // onChange={(e) => setDesignation(e.target.value)}
                width={{ base: "300px", md: "400px" }}
                type="password"
                placeholder=""
              />
            </FormControl>
          </Box>
        </Stack>
      </form>

      <Button
        marginTop={"1rem"}
        _hover={{ background: "white", color: "gray" }}
        onClick={onOpen}
        bg={"red"}
      >
        Delete
      </Button>
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
                colorScheme="green"
                onClick={() => {
                  onClose();
                  DeleteUser(userId);
                }}
                ml={3}
              >
                YES
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <br />

      <Button
        onClick={UpdatedValue}
        className="employee-btn"
        colorScheme="teal"
        mt="4"
      >
        Save
      </Button>
    </Box>
  );
};

export default EmployeeProfileEdit;
