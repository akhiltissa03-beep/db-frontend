
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Input,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { SearchIcon } from "@chakra-ui/icons";
// import axios from "axios";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// const Pending = () => {
//   const apiUrl = import.meta.env.VITE_APP_API_URL;
//   const [searchQuary, setSearchQuary] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totlePage, setTotlePage] = useState(1);
//   const [userData , setUserData] = useState([])
//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const fetchData = async () => {
    
//     try {
//       const config = {
//         methode: "GET",
//         url: `${apiUrl}/user/user_pagination?page=${currentPage}`,
//       };
//       const responce = await axios(config);
//       console.log(responce)
//       setTotlePage(responce.data?.totalPages);
//       setUserData(responce?.data?.users)
//     } catch (error) {
//       console.log(error, "error");
//     }
//   };
//   const handleSearch = () => {
//     if(searchQuary){
//       searchResponse()
//       setCurrentPage(1);
//       setSearchQuary("")
//     }else{
//       fetchData()
//     }
//   };
//   const searchResponse = async () => {
//     try {
//       const handlePaylode = {
//         name: searchQuary,
//         data: {
//           status : "Pending"
//         }
//       };
//       console.log(searchQuary,"BackEnd Search Feild");

//       const config = {
//         method: "POST",
//         url: `${apiUrl}/user/search_user_by_name`,
//         data: handlePaylode,
//       };

//       const responces = await axios(config);
//       console.log(responces, "Search Result");
//       setUserData(responces.data.users);
//     } catch (error) {
//       console.log(error, "Error");
//     }
//   };

//   const handlePaggination = (page) => {
//     setCurrentPage(page);
//   };
//   return (
//     <>
//       <Flex direction="column" align="center">
//         <Box
//           color="#DD372D"
//           ml={["1rem", "0rem"]}
//           mt={["1rem", "0"]}
//           mb="1rem"
//           fontSize={["1.5rem", "2rem"]}
//           fontWeight="700"
//         >
//           Pending
//         </Box>
//       </Flex>
//       <InputGroup mt="1rem" ml={["1rem", "6.5rem"]} width={["90%", "400px"]}>
//         <InputLeftElement
//           pointerEvents="none"
//           children={<SearchIcon color="gray.300" />}
//         />
//         <Input
//           border="1px solid green"
//           width="100%"
//           type="text"
//           placeholder="Search..."
//           value={searchQuary}
//           onChange={(e) => {
//             setSearchQuary(e.target.value);
//           }}
//         />
//         <Button
//           className="employee-btn"
//           colorScheme="teal"
//           mt="4"
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </InputGroup>
//       <Grid
//         templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
//         gap={3}
//         width={["90%", "80%"]}
//         margin="1rem auto"
//       >
//         <Box fontWeight="bold">Name</Box>
//         <Box fontWeight="bold">Mobile</Box>
//         <Box fontWeight="bold">Mail</Box>
//         <Box></Box> {/* Empty box for the View Details button column */}
//         {userData && userData.map((items) => (
//           <React.Fragment key={items.id}>
//             <Box>{items.name}</Box>
//             <Box>{items.mobile}</Box>
//             <Box>{items.email}</Box>
//             <Box>
//               {/* <NavLink to={`/user/registeruserdetail/${items._id}`}> */}
//                <NavLink to={`/user/pendingformDetails/${items._id}`}>
//                 <Button
//                   colorScheme="blackAlpha"
//                   backgroundColor="black"
//                   width="80%"
//                 >
//                   View Detail
//                 </Button>
//               </NavLink>
//             </Box>
//           </React.Fragment>
//         ))}
//       </Grid>
//       <div className="numbers">
//           <ChevronLeftIcon />
//           {Array.from({ length: totlePage }, (_, index) => (
//             <span
//               key={index + 1}
//               className="num"
//               onClick={() => handlePaggination(index + 1)}
//             >
//               {index + 1}
//             </span>
//           ))}
//           <ChevronRightIcon />
//         </div>
//     </>
//   );
// };

// export default Pending;





import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Pending = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        // url: `${apiUrl}/user/user_pagination?page=${currentPage}`,
        url: `${apiUrl}/user/user_pagination?page=${currentPage}&status=Pending&limit=10`,

      };
      const response = await axios(config);
      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.users);
    } catch (error) {
      console.log(error, "error");
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
      console.log(error, "Error");
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
        <NavLink to={`/user/pendingformDetails/${row._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
            View Detail
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
        <Box
          color="#DD372D"
          ml={["1rem", "0rem"]}
          mt={["1rem", "0"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          Pending
        </Box>
        <NavLink to="/user/registrationform">
        
        </NavLink>
      </Flex>
      <InputGroup mt="1rem" ml={["1rem", "6.5rem"]} width={["90%", "400px"]}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          border="1px solid green"
          width="100%"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Button
          marginLeft={"1rem"}
          className="employee-btn"
          colorScheme="teal"
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

export default Pending;





