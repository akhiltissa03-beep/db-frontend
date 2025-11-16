// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import { NavLink } from "react-router-dom";
// import { ChevronLeftIcon, SearchIcon,ChevronRightIcon } from "@chakra-ui/icons";

// import axios from "axios";

// function UserAgreement() {
//   const apiUrl = import.meta.env.VITE_APP_API_URL;
  
//   const [searchQuary, setSearchQuary] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totlePage, setTotlePage] = useState(1);
//   const [userData , setUserData] = useState([])

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const fetchData = async () => {
    
//     const config = {
//       method: "GET",
//       url: `${apiUrl}/user/get_terms?page=${currentPage}`,
//     };
//     const GetEmplyeesApiResponse = await axios(config);
//     console.log("get user ", GetEmplyeesApiResponse.data);
//     setTotlePage(GetEmplyeesApiResponse.data.totalPages);
//     setUserData(GetEmplyeesApiResponse.data.allAgreements)
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
//         url: `${apiUrl}/user/search_agreement`,
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

//       <Box margin={"1rem"}>
//         <Box fontSize={"2rem"} fontWeight={"700"}>
//           User Agreement Details
//         </Box>

//         <InputGroup>
//           <InputLeftElement
//             pointerEvents="none"
//             children={<SearchIcon color="gray.300" />}
//           />
//           <Input
//             width={"400px"}
//             type="text"
//             placeholder="Search..."
//             value={searchQuary}
//             onChange={(e) => {
//               setSearchQuary(e.target.value);
//             }}
//           />
//           <Button
//           className="employee-btn"
//           colorScheme="teal"
//           ml={'1rem'}
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//         </InputGroup>
//         <div
//           className="table"
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             width: "80%",
//             padding: "1rem",
//           }}
//         >
//           {userData && userData.length > 0 ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Address</th>
//                   <th>Email</th>
//                   <th>Signature</th>
//                   <th>Photo</th>
//                   <th>Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userData.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td>{item.address}</td>
//                     <td>{item.email}</td>
//                     <td>{item.signature}</td>
//                     <td>{item.photo}</td>
//                     <td>
//                       <Box>
//                         <NavLink to={`/employmentformdetails/${item._id}`}>
//                           <Button
//                             colorScheme="blackAlpha"
//                             backgroundColor="black"
//                             width="80%"
//                           >
//                             View Detail
//                           </Button>
//                         </NavLink>
//                       </Box>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </Box>
   
//     </>
//   );
// }

// export default UserAgreement; 




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

const UserAgreemen = () => {
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
        url: `${apiUrl}/user/get_terms?page=${currentPage}`,
      };
      const response = await axios(config);
      setTotalPages(response.data?.totalPages);
      setUserData(response?.data?.allAgreements);
       console.log(response);
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
        url: `${apiUrl}/user/search_agreement`,
        data: payload,
      };

      const response = await axios(config);
      setUserData(response.data.users);
      console.log(response);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    // {
    //   name: "Name",
    //   selector: "name",
    // },
    // {
    //   name: "Address",
    //   selector: "address",
      
    // },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Details",
      cell: (row) => (
 
       <NavLink to={`/employmentformdetails/${row._id}`}>
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

export default UserAgreemen;





