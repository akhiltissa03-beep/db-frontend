import { Box, Flex } from "@chakra-ui/react"; // Import Box and Flex from Chakra UI

import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";

//import {useState} from 'react'

//import UserSidebar from "../Dashboard/UserSidebar/UserSidebar"; 

function RootLayout() {
  // const [currentSidebar, setCurrentSidebar] = useState();

  // const toggleSidebar = (role) => {
  //   setCurrentSidebar(role);
  // };

  // let SidebarComponent = SideBar; // Default to regular sidebar

  // if (currentSidebar === "user") {
  //   SidebarComponent = UserSidebar;
  // } else if (currentSidebar === "admin") {
  //   SidebarComponent = SideBar;
  // }





  return (
    <Flex direction="column" height="100vh">
      {/* Navbar */}
      <Box>
        <Navbar />
      </Box>

      {/* Main Content */}
      <Flex flexGrow={1}>
        {/* Sidebar */}
        <Box flexBasis={{ base: "60%", md: "20%" }}>
          <SideBar />
        </Box>

        {/* Main Content */}
        <Box
          bg={"#f5f5f5"}

          flexBasis={{ base: "4770%", md: "80%" }}>
          <Outlet
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default RootLayout;
