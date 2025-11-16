import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Employees = () => {
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
        url: `${apiUrl}/user/user_pagination?page=${currentPage}`,
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
        url: `${apiUrl}/user/search_employee`,
        data: payload,
      };

      const response = await axios(config);
      setUserData(response.data.users);
    } catch (error) {
      alert("Employee Already Registered")
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
        <NavLink to={`/employeeprofileedit/${row._id}`}>
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
      <Flex direction="column" align="flex-start" ml={["1rem", "2rem"]}>
        <Box
          color="#0e0d0dff"
          mt={["1rem", "10"]}
          mb="1rem"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="700"
        >
          Employee
        </Box>
      </Flex>
      <Flex
        mt="1rem"
        ml={["1rem", "1.5rem"]}
        mr={["1rem", "1.5rem"]}
        justify="space-between"
        align="center"
        flexWrap="wrap"
      >
        <InputGroup mt="1rem" ml={["1rem", "1.5rem"]} width={["90%", "400px"]}>
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
            width={{ md: "12rem", base: "8rem" }}
            marginLeft={"1rem"}
            className="employee-btn"
            colorScheme="teal"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>
        <NavLink to="/employeeform">
          <Button
            mt="1rem"
            mb={"1rem"}
            _hover={{ background: "white", color: "gray" }}
            p="1rem"
            color="white"
            bg="black"
            width={"10rem"}
          >
            Add Employee
          </Button>
        </NavLink>
      </Flex>
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

export default Employees;
