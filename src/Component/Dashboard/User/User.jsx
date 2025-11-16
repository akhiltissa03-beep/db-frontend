

import { Box, Flex , Center} from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
    const [data, setData] = useState(0);
    const [activeUsers, setActive] = useState(0);
    const [registerUsers, setRegisterUsers] = useState(0);
    const [pendingUsers, setPendingUsers] = useState(0);
    const [FrezzUsers, setFrezzUsers] = useState(0);;

    useEffect(() => {
          fetchDetails();
          totlalActiveUser();
          totlalRegistrationUser();
          totlalPendingUser();
          totlalFrezzUser();
        }, []);
      

  const fetchDetails = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${apiUrl}/user/get_all_user`);
    const totalData = response.data;
    console.log(totalData);
    setData(totalData);
  };


  const totlalActiveUser = async () => {
        const response = await axios.get(`${apiUrl}/user/user_pagination?status=Active`);
        const totalActiveUserData = response.data.totalUsers;
        setActive(totalActiveUserData)
        console.log(totalActiveUserData,"totalActive");
        
      };
    
      const totlalRegistrationUser = async () => {
        const response = await axios.get(`${apiUrl}/user/user_pagination?status=Registered`);
        const totalRigistraUserData = response.data.totalUsers;
        setRegisterUsers(totalRigistraUserData)
        console.log(totalRigistraUserData,"totalRegistration");
        
      }
    
      const totlalPendingUser = async () => {
        const response = await axios.get(`${apiUrl}/user/user_pagination?status=Pending`);
        const totalPendingUser = response.data.totalUsers;
        setPendingUsers(totalPendingUser)
        console.log(totalPendingUser,"totalPending");
      };
    
      const totlalFrezzUser = async () => {
        const response = await axios.get(`${apiUrl}/user/user_pagination?status=Freeze`);
        const totalFrezzUser = response.data.totalUsers;
        setFrezzUsers(totalFrezzUser)
        console.log(totalFrezzUser,"totalFrezz");
      };

  return (
    <>
   
      <Flex textAlign="center" flexBasis={{ base: "20%", md: "auto" }}>
        {/* Total Assingment */}
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
          marginLeft={{ md: "10rem" }}
            backgroundColor="#ffe6ff"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
              {data?.totalUsers}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Total User
            </p>
          </Box>
        </Box>

        {/* Submitted Assingment */}
        <Box
         
          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
           marginLeft={{ md: "20rem" }}
            backgroundColor="#EBE9EB"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
              {registerUsers}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Total Registration
            </p>
          </Box>
        </Box>
      </Flex>

      <Flex>
        {/* Pending Assingment */}
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
          marginLeft={{ md: "10rem" }}
            backgroundColor="#e6ffe6"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
               {activeUsers}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Active User
            </p>
          </Box>
        </Box>
        <Box
          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
            marginLeft={{ md: "20rem" }}
            backgroundColor="#e6ffe6"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
               {FrezzUsers}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Inactive User
            </p>
          </Box>
        </Box>
      </Flex>

      <Flex>
        {/* Total Assingment */}
        <Box
          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
          marginLeft={{ md: "10rem" }}
            backgroundColor="#ffe6ff"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
              {pendingUsers}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Pending Registration
            </p>
          </Box>
        </Box>

        {/* Submitted Assingment */}
        <Box
          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
            marginLeft={{ md: "20rem" }}
            backgroundColor="#EBE9EB"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
               {data?.submitted}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Cancel User's
            </p>
          </Box>
        </Box>
      </Flex>
      {/* Pending Assingment */}
      <Flex flexBasis={{ base: "20%", md: "auto" }} textAlign="center">
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
          marginLeft={{ md: "10rem" }}
            backgroundColor="#e6ffe6"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
              {data?.pending}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Today's Recovery
            </p>
          </Box>
        </Box>
        <Box
          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
            marginLeft={{ md: "20rem" }}
            backgroundColor="#e6ffe6"
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "100px", md: "150px" }}
            height={{ base: "100px", md: "150px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                height: "10px",
                fontSize: "20px",
                marginRight: "0%",
              }}
            >
              {data?.pending}
            </span>
            <p
              style={{
                color: "gray",
                fontWeight: "600",
                flexDirection: "row",
                marginLeft: "0px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Total Recovery
            </p>
          </Box>
        </Box>
      </Flex>
     
  </>
  );
};

export default User;
