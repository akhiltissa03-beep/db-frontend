import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";

const CustomDataTable = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const config = {
        method: "GET",
        url: `${apiUrl}/user/recovery_user?page=${currentPage}`,
      };
      const response = await axios(config);
      setTotalPage(response.data.totalPages);
      setUserData(response?.data?.users);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
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
      };

      const response = await axios.post(
        `${apiUrl}/user/search_user_recovery`,
        payload
      );
      setUserData(response.data.users);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const columns = [
    {
      name: "User Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Number",
      selector: "mobile",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: "startDate",
      sortable: true,
      format: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
    },
    {
      name: "",
      button: true,
      cell: (row) => (
        <NavLink to={`/recoveryprofile/${row._id}`}>
          <Button colorScheme="blackAlpha" backgroundColor="black" width="80%">
            View Detail
          </Button>
        </NavLink>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsText: "All",
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
          Recovery
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            width={{ md: "12rem", base: "8rem" }}
            colorScheme="teal"
            mt="0"
            style={{ marginLeft: "20px" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>
      </Flex>
      <Box width={{ base: "81vw", md: "80vw" }} overflowX="auto" p={4}>
        <DataTable
          columns={columns}
          data={userData}
          pagination
          paginationServer
          paginationTotalRows={totalPage * 10} // Assuming 10 items per page
          onChangePage={(page) => handlePagination(page)}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          paginationComponentOptions={paginationOptions}
          responsive
        />
      </Box>
    </>
  );
};

export default CustomDataTable;
