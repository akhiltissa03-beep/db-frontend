// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";

// const Registration = () => {
//   const apiUrl = import.meta.env.VITE_APP_API_URL;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [userData, setUserData] = useState([]);
//   const [registrationsCount, setRegistrationsCount] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const todaysRegistrations = async () => {
//     try {
//       const start = new Date();
//       start.setHours(0, 0, 0, 0);

//       const end = new Date();
//       end.setHours(23, 59, 59, 999);

//       // Fetch user registrations for today
//       const registrationsConfig = {
//         method: "GET",
//         url: `${apiUrl}/todaysRegistrations`,
//       };
//       const registrationsResponse = await axios(registrationsConfig);
//       setRegistrationsCount(registrationsResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const config = {
//         method: "GET",
//         url: `${apiUrl}/user/user_pagination?page=${currentPage}`,
//       };
//       const response = await axios(config);
//       setTotalPages(response.data?.totalPages);
//       console.log("response", response);
//       setUserData(response?.data?.users);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery) {
//       searchResponse();
//       setCurrentPage(1);
//       setSearchQuery("");
//     } else {
//       fetchData();
//     }
//   };

//   const searchResponse = async () => {
//     try {
//       const payload = {
//         name: searchQuery,
//         data: {
//           status: "Pending",
//         },
//       };

//       const config = {
//         method: "POST",
//         url: `${apiUrl}/user/search_user_by_name`,
//         data: payload,
//       };

//       const response = await axios(config);
//       setUserData(response.data.users);
//     } catch (error) {
//       alert("Error searching users or user already registered.");
//     }
//   };
//   const handlePagination = (page) => {
//     setCurrentPage(page);
//   };

//   const columns = [
//     {
//       name: "Name",
//       selector: "name",
//     },
//     {
//       name: "Mobile",
//       selector: "mobile",
//     },
//     {
//       name: "Email",
//       selector: "email",
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <NavLink to={`/user/registeruserdetail/${row._id}`}>
//           <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
//             View Detail
//           </Button>
//         </NavLink>
//       ),
//     },
//     {
//       name: "Agreement",
//       cell: () => (
//         <NavLink to="https://illustrious-pie-1bc3fa.netlify.app/">
//           <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
//             Fill Agreement
//           </Button>
//         </NavLink>
//       ),
//     },
//   ];

//   const paginationOptions = {
//     rowsPerPageText: "Rows per page:",
//     rangeSeparatorText: "of",
//     selectAllRowsItem: true,
//     selectAllRowsItemText: "All",
//   };

//   return (
//     <>
//       <Flex direction="column" align="center">
//         <div>
//           {loading && <p>Loading...</p>}
//           {error && <p>{error}</p>}
//           {registrationsCount !== null && (
//             <p>Today's Registrations: {registrationsCount}</p>
//           )}
//         </div>
//         <Box
//           color="#DD372D"
//           ml={["1rem", "0rem"]}
//           mt={["1rem", "0"]}
//           mb="1rem"
//           fontSize={["1.5rem", "2rem"]}
//           fontWeight="700"
//         >
//           Registration
//         </Box>
//         <NavLink to="/user/Registrationform">
//           <Button
//             mt="1rem"
//             mb={"1rem"}
//             _hover={{ background: "white", color: "gray" }}
//             p="1rem"
//             color="white"
//             bg="black"
//             width={"6rem"}
//           >
//             Add User
//           </Button>
//         </NavLink>
//       </Flex>
//       <InputGroup mt="1rem" ml={["1rem", "1.5rem"]} width={["90%", "400px"]}>
//         <InputLeftElement
//           pointerEvents="none"
//           children={<SearchIcon color="gray.300" />}
//         />
//         <Input
//           border="1px solid green"
//           width="100%"
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           required
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//           }}
//         />
//         <Button
//           marginLeft={"1rem"}
//           className="employee-btn"
//           colorScheme="teal"
//           style={{ marginLeft: "20px" }}
//           mt="0"
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </InputGroup>

//       <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
//         <DataTable
//           title=""
//           columns={columns}
//           data={userData}
//           pagination
//           paginationServer
//           paginationTotalRows={totalPages * 10} // Assuming 10 items per page
//           onChangePage={(page) => handlePagination(page)}
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 20, 30]}
//           paginationComponentOptions={paginationOptions}
//         />
//       </Box>
//     </>
//   );
// };

// export default Registration;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Box, Button, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Registration = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [registrationsCount, setRegistrationsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    todaysRegistrations();
  }, [currentPage]);

  const todaysRegistrations = async () => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const registrationsConfig = {
        method: "GET",
        url: `${apiUrl}/user/getTodaysRegistrations`,
      };
      const registrationsResponse = await axios(registrationsConfig);
      setRegistrationsCount(registrationsResponse.data);
    console.log(registrationsResponse ,"registrationsResponse")
    } catch (error) {
      console.error("Error fetching today's registrations:", error);
    }
  };

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/user_pagination?page=${currentPage}`,
      };
      const response = await axios(config);
      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchResponse();
      setCurrentPage(1);
      setSearchQuery("");
    } else {
      fetchData();
    }
  };

  const searchResponse = async () => {
    try {
      const payload = {
        name: searchQuery,
        data: {
          status: "Pending",
        },
      };

      const config = {
        method: "POST",
        url: `${apiUrl}/user/search_user_by_name`,
        data: payload,
      };

      const response = await axios(config);
      setUserData(response.data.users);
    } catch (error) {
      alert("Error searching users or user already registered.");
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Mobile",
      selector: "mobile",
    },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Action",
      cell: (row) => (
        <NavLink to={`/user/registeruserdetail/${row._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
            View Detail
          </Button>
        </NavLink>
      ),
    },
    {
      name: "Agreement",
      cell: () => (
        <NavLink to="https://stamppapers.netlify.app/">
          <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
            Fill Agreement
          </Button>
        </NavLink>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <>
      <Flex direction="column" align="center">
        <div>
          {/* {loading && <p>Loading...</p>}
          {error && <p>{error}</p>} */}
          {registrationsCount !== null && (
            <Box    fontSize={["1.3rem", "1.5rem"]}  mt ={"1rem"} fontWeight={"700"} color={'green'}>Today's Registrations: {registrationsCount}</Box>
          )}
        </div>
        <Box
          color="#DD372D"
          ml={["1rem", "0rem"]}
          mt={["1rem", "0"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          Registration
        </Box>
        <NavLink to="/user/registrationform">
          <Button
            mt="1rem"
            mb={"1rem"}
            _hover={{ background: "white", color: "gray" }}
            p="1rem"
            color="white"
            bg="black"
            width={"6rem"}
          >
            Add User
          </Button>
        </NavLink>
      </Flex>
      <InputGroup mt="1rem" ml={["1rem", "1.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          border="1px solid green"
          width="100%"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          required
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          marginLeft={"1rem"}
          className="employee-btn"
          colorScheme="teal"
          style={{ marginLeft: "20px" }}
          mt="0"
          onClick={handleSearch}
        >
          Search
        </Button>
      </InputGroup>

      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          title=""
          columns={columns}
          data={userData}
          pagination
          paginationServer
          paginationTotalRows={totalPages * 10} // Assuming 10 items per page
          onChangePage={(page) => handlePagination(page)}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          paginationComponentOptions={paginationOptions}
        />
      </Box>
    </>
  );
};

export default Registration;

