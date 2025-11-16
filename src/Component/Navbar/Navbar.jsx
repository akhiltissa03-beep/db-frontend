import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dataentry from "../../Images/logo.png";
// import Dataentry from "../../Images/ZEMEX LOGO.png";
import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("")
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      alert("passwords do not match")
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/user/changePassword`, {
        newPassword,
      });

      setSuccessMessage(response.data.message);


      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      console.log(response, "response")
      setTimeout(() => {
        handleCloseModal()
      }, 3000)
    } catch (error) {
      console.error(error);
      setErrorMessage("Error changing password");
    }
  };

  const handleOpenModal = () => {
    return;
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      direction={{ base: "row", md: "row" }} // Stack vertically on small screens and horizontally on medium and larger screens
      justifyContent={{ base: "space-around", md: "space-between" }}
      // alignItems="center"
      paddingX={{ base: "0", md: "3" }} // Add padding on small screens and larger screens
      paddingY="5"
    >
      <Box
        display="flex"
        alignItems="center"
        // marginBottom={{ base: "4", md: "0" }}
        margin="0" padding="0"
      >
        <Heading
          fontSize={{ base: "2xl", md: "5xl" }}
          marginLeft={{ base: "0.5rem", md: "0rem" }}
          style={{
            fontFamily: "Algerian",
            color: "gray"

          }}
        >
          Fillable
        </Heading>
      </Box>

      <Box onClick={handleOpenModal} cursor="pointer" margin="0" padding="0">
        <Avatar
          marginTop={"1rem"}
          borderRadius="50%"
          width={{ base: "2.5rem", md: "3.5rem" }}
          height={{ base: "2.4rem", md: "3rem" }}
          src="admin.png"
          marginRight="0.5"
        />
      </Box>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />

          {/* Your form for password and confirm password */}
          {/* Example */}
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl marginBottom="1rem">
                <FormLabel>New Password:</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  border="1px solid #ccc"
                  borderRadius="4px"
                />
                {console.log(newPassword, "newpassword")}
              </FormControl>
              <FormControl marginTop="1rem" marginBottom="1rem">
                <FormLabel>Confirm Password:</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  border="1px solid #ccc"
                  borderRadius="4px"
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <Button type="submit" onClick={handleSubmit} colorScheme="blue">
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
