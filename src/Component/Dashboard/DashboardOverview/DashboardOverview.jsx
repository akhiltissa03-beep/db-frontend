import { Box, Flex, Center } from "@chakra-ui/layout";
import { borderRadius } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
} from "@chakra-ui/react";

const DashboardOverview = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [data, setData] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActive] = useState(0);
  const [registerUsers, setRegisterUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [FrezzUsers, setFrezzUsers] = useState(0);;
    const navigate = useNavigate();
  

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
    const totalData = response?.data?.allUsers;
    console.log("response users", totalData);
    setData(totalData);
    setTotalUsers(totalData)
  };

  const handleClick = async () => {
    navigate("/dashboard/user_registration_view");
  };

  const handleTotalUserClick = async () => {
    navigate("/dashboard/total_user__view");
  };


  const totlalActiveUser = async () => {
    const response = await axios.get(`${apiUrl}/user/user_pagination?status=Active`);
    const totalActiveUserData = response.data.totalUsers;
    setActive(totalActiveUserData)
    console.log(totalActiveUserData, "totalActive");

  };

  const totlalRegistrationUser = async () => {
    const response = await axios.get(`${apiUrl}/user/user_pagination?status=Registered`);
    const totalRigistraUserData = response.data.totalUsers;
    setRegisterUsers(totalRigistraUserData)
    console.log(totalRigistraUserData, "totalRegistration");

  }

  const totlalPendingUser = async () => {
    const response = await axios.get(`${apiUrl}/user/user_pagination?status=Pending`);
    console.log("responseresponseresponseresponse,,,,",response)
    const totalPendingUser = response.data.totalUsers;
    setPendingUsers(totalPendingUser)
    console.log(totalPendingUser, "totalPending");
  };

  const totlalFrezzUser = async () => {
    const response = await axios.get(`${apiUrl}/user/user_pagination?status=Freeze`);
    const totalFrezzUser = response.data.totalUsers;
    setFrezzUsers(totalFrezzUser)
    console.log(totalFrezzUser, "totalFrezz");
  };

  return (
    <>

      <Flex textAlign="center" direction={{ base: "column", md: "row" }} flexBasis={{ base: "20%", md: "auto" }}>
        {/* Total Assingment */}
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
            onClick={handleTotalUserClick}
            marginLeft={{ md: "10rem" }}
            backgroundColor="#ffffff"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            cursor={"pointer"}
          >
            <Avatar
              // marginTop={"1rem"}
              borderRadius="10%"
              width={{ base: "1.5rem", md: "2.5rem" }}
              height={{ base: "1.5rem", md: "2rem" }}
              src="total-users.png"
            // marginRight="1.5"
            />
            <div>
              <span
                style={{
                  marginTop: "2px",
                  marginBottom: "2px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "gray"
                }}
              >
                {totalUsers?.length || 0}
              </span>
              <p
                style={{
                  color: "gray",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "1px",
                }}
              >
                Total User
              </p>
            </div>
          </Box>
        </Box>


        <Box

          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
          cursor={"pointer"}
        >
          <Box
            onClick={handleClick}
            marginLeft={{ md: "10rem" }}
            backgroundColor="#23A657"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar

              border="5px solid white"
              background="white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3.5rem" }}
              src="total-registered.png"

            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "white"
                }}
              >
                {registerUsers || 0}
              </span>
              <p
                style={{
                  color: "white",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                  cursor: "pointer"
                }}
              >
                Registered User
              </p>
            </div>
          </Box>
        </Box>
      </Flex >

      <Flex textAlign="center" direction={{ base: "column", md: "row" }} flexBasis={{ base: "20%", md: "auto" }}>
        {/* Total Assingment */}
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
            marginLeft={{ md: "10rem" }}
            backgroundColor="#E8C11E"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              // marginTop={"1rem"}
              border="5px solid white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3.5rem" }}
              src="pending-registration.png"
            // marginRight="1.5"
            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "white"
                }}
              >
                {pendingUsers || 0}
              </span>
              <p
                style={{
                  color: "white",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Pending Registrations
              </p>
            </div>
          </Box>
        </Box>


        <Box

          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
            marginLeft={{ md: "10rem" }}
            backgroundColor="#E81E36"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar

              border="1px solid white"
              background="white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3.5rem" }}
              src="canceld-users.png"

            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "white"
                }}
              >
                {0 || 0}
              </span>
              <p
                style={{
                  color: "white",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Canceled User
              </p>
            </div>
          </Box>
        </Box>
      </Flex >

      <Flex textAlign="center" direction={{ base: "column", md: "row" }} flexBasis={{ base: "20%", md: "auto" }}>
        {/* Total Assingment */}
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
            marginLeft={{ md: "10rem" }}
            backgroundColor="#23A657"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              // marginTop={"1rem"}
              border="5px solid white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3.5rem" }}
              src="active-users.png"
              background="white"
            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "white"
                }}
              >
                {data?.totalUsers || 0}
              </span>
              <p
                style={{
                  color: "white",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Active Users
              </p>
            </div>
          </Box>
        </Box>


        <Box

          gap="15%"
          textAlign="center"
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Box
            marginLeft={{ md: "10rem" }}
            backgroundColor="#ffffff"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar

              border="1px solid white"
              background="white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3.5rem" }}
              src="inactive-users.png"

            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "red"
                }}
              >
                {0 || 0}
              </span>
              <p
                style={{
                  color: "red",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Iactive User
              </p>
            </div>
          </Box>
        </Box>
      </Flex >

      <Flex textAlign="center" direction={{ base: "column", md: "row" }} flexBasis={{ base: "20%", md: "auto" }}>
        {/* Total Assingment */}
        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
            marginLeft={{ md: "10rem" }}
            backgroundColor="#1F8499"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              // marginTop={"1rem"}
              border="5px solid white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3rem" }}
              src="total-recovery.png"
              background="white"
            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "white"
                }}
              >
                {data?.totalUsers || 0}
              </span>
              <p
                style={{
                  color: "white",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Total recover
              </p>
            </div>
          </Box>
        </Box>


        <Box textAlign="center" flexBasis={{ base: "100%", md: "auto" }}>
          <Box
            marginLeft={{ md: "10rem" }}
            backgroundColor="#1F8499"
            border="#ebe9eb"
            margin="20px"
            padding={{ base: "0.5rem", md: "40px" }}
            fontWeight="800"
            borderRadius="10px"
            width={{ base: "15rem", md: "400px" }}
            height={{ base: "5rem", md: "100px" }}
            display="flex"
            // flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              // marginTop={"1rem"}
              border="5px solid white"
              width={{ base: "2.5rem", md: "3.5rem" }}
              height={{ base: "2.4rem", md: "3rem" }}
              src="total-recovery.png"
              background="white"
            />
            <div>
              <span
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  height: "10px",
                  fontSize: "1.5rem",
                  marginRight: "0%",
                  color: "white"
                }}
              >
                {data?.totalUsers || 0}
              </span>
              <p
                style={{
                  color: "white",
                  fontWeight: "600",
                  flexDirection: "row",
                  marginLeft: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Total recover
              </p>
            </div>
          </Box>
        </Box>
      </Flex >

    </>
  );
};

export default DashboardOverview;
