import {
  List,
  ListItem,
  Box,
  Image,
  Container,
  ListIcon,
  Icon,
  Button,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useDisclosure,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Flex,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  IconButton,
} from "@chakra-ui/react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import MovingIcon from "@mui/icons-material/Moving";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  BsGrid,
  BsFlagFill,
  BsFileEarmarkSpreadsheet,
  BsAmd,
  BsFillFileEarmarkSpreadsheetFill,
  BsChevronRight,
} from "react-icons/bs";
import { CiLogout, CiMoneyBill } from "react-icons/ci";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useUserContext } from "../Context/UserContext";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const { getUser } = useUserContext();
  // const userRole = getUser();
  const userRole = sessionStorage.getItem("userrole")
  console.log(userRole);
  const isAdmin = userRole === "Admin";
  const isUser = userRole === "User";
  console.log(isAdmin, isUser);
  const toast = useToast();
  const navigate = useNavigate();
  console.log(isMobileView, onOpen, "ismobileview")
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignout = () => {
    localStorage.clear();
    toast({
      title: "Logout Success.",
      // description: "We've created your account for you.",
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  const adminMenu = [
    { label: "Dashboard", path: "/dashboard" },
    {
      label: "User Registration",
      path: "/user",
      submenu: [
        { label: "Registration", path: "/user/registration" },
        { label: "Pending", path: "/user/pending" },
        { label: "Cancle", path: "/user/cancle" },
        { label: "Package", path: "/user/package" },
      ],
    },
    { label: "Deactivate User", path: "/blockeduser" },
    { label: "QC Report", path: "/report" },
    { label: "Recovery", path: "/recovery" },
    { label: "Employee", path: "/employees" },
    { label: "System User", path: "/system_user" },
  ];

  const menuMarginMap = {
    "/dashboard": 2,
    "/user": 5,
    "/blockeduser": 2,
    "/report": 2,
    "/recovery": 2,
    "/employees": 2,
    "/system_user": 2,
  };

  return (
    <>
      <List p="10px" bg="">
        {isMobileView && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ base: "block", md: "none" }}
          />
        )}
        {/* //laptop view for admin */}
        {!isMobileView && (
          <Box>
            {isAdmin && (
              <ListItem p="10px" borderRadius="10px">
                {adminMenu.map((item, index) =>
                  item.submenu ? (
                    <Accordion allowToggle key={index} width="100%">
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton
                            _hover={{ bg: "gray.100" }}
                            px={0}
                          >
                            <DashboardIcon />
                            <Text
                              as="span"
                              ml="8px"
                              fontSize="1.5rem"
                              flex="1"
                              textAlign="left"
                              color="black"
                            >
                              {item.label}
                            </Text>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={2}>
                          {item.submenu.map((sub, i) => (
                            <Flex
                              key={i}
                              alignItems="center"
                              ml="40px"
                              mt={2}
                              _hover={{ bg: "gray.50", borderRadius: "6px" }}
                            >
                              <NavLink
                                to={sub.path}
                                style={{
                                  textDecoration: "none",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  as="span"
                                  color="black"
                                  fontSize="1.3rem"
                                  _hover={{ textDecoration: "underline" }}
                                >
                                  {sub.label}
                                </Text>
                              </NavLink>
                            </Flex>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Flex key={index} 
                       alignItems="center" 
                       mt={menuMarginMap[item.path] ?? 4}
                       _hover={{ bg: "gray.100" }}
                       py={2}   
                    >
                      <DashboardIcon style={{ marginTop: "0rem" }} />
                      <NavLink
                        to={item.path}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          as="span"
                          color="black"
                          fontSize="1.5rem"
                          marginLeft="8px"
                          _hover={{ textDecoration: "underline" }}
                        >
                          {item.label}
                        </Text>
                      </NavLink>
                    </Flex>
                  )
                )}
              </ListItem>
            )}
          </Box>
        )}

      </List>
      <List>
        {/* laptop view for user */}
        {!isMobileView && (
          <Box>
            {isUser && (
              <Stack>
                <Accordion allowToggle width={"90%"}>
                  <ListItem
                    className="listItem"
                    p="0px"
                    borderRadius="10px"
                    m="0px"
                  >
                    <AccordionItem
                      _hover={{ bg: "blue.100" }}
                      _expanded={{ bg: "blue.100" }}
                    >
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton>
                              <AccountCircleIcon
                                style={{
                                  borderRadius: "50%",
                                  width: "3.5rem",
                                  height: "3rem",
                                  textAlign: "center",
                                }}
                              />
                              <NavLink to="/assignment">
                                <Text
                                  as="span"
                                  color="black"
                                  fontSize="1.5rem"
                                  marginLeft={"0.7rem"}
                                // Remove the hover red color
                                >
                                  Assignment
                                </Text>
                              </NavLink>

                              {isExpanded ? (
                                <ChevronUpIcon color={"black"} ml="10px" />
                              ) : (
                                <ChevronDownIcon color={"black"} ml="10px" />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <ListItem
                              className="listItem"
                              p="5px"
                              borderRadius="10px"
                            >
                              <ListIcon as={BsAmd} color="gray.500" ml="10px" />
                              <NavLink to="/newassignment">
                                <Text
                                  as="span"
                                  pl="10px"
                                  fontSize={{ base: "0.6rem", md: "1rem" }}
                                  color="black"
                                >
                                  New Assignment
                                </Text>
                              </NavLink>
                            </ListItem>
                            {/* 
                            <ListItem
                              className="listItem"
                              p="5px"
                              borderRadius="10px"
                            >
                              <ListIcon
                                as={BsFileEarmarkSpreadsheet}
                                color="gray.500"
                                ml="10px"
                              />

                              <Text
                                as="span"
                                pl="10px"
                                fontSize={{ base: "0.6rem", md: "1rem" }}
                                color="black"
                              >
                                Filled Assignment
                              </Text>
                            </ListItem> */}

                            <Divider borderWidth="1px" borderColor={"gray"} />
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </ListItem>
                </Accordion>

                {/* <Divider borderWidth="1px" borderColor={"gray"} /> */}
                <ListItem
                  style={{ marginTop: "1.5rem" }}
                  className="listItem"
                  p="10px"
                  borderRadius="10px"
                >
                  <MovingIcon className="sidebaricon" />

                  <Text
                    as="span"
                    color="black"
                    fontSize="rem"
                    marginLeft="8px" // Add some margin for spacing between icon and text
                    _hover={{ textDecoration: "underline" }}
                    onClick={handleSignout}
                  >
                    SignOut
                  </Text>
                </ListItem>
              </Stack>
            )}
          </Box>
        )}

        {/* mobile view for user */}
        {isMobileView && (
          <Box>
            {isUser && (
              <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={"2rem"}>
                      User Dashboard
                    </DrawerHeader>
                    <DrawerBody>
                      <Stack mt={"1rem"}>
                        <Accordion allowToggle width={"105%"}>
                          <AccordionItem
                            _hover={{ bg: "blue.100" }}
                            _expanded={{ bg: "blue.100" }}
                          >
                            {({ isExpanded }) => (
                              <>
                                <h2>
                                  <NavLink to="/assignment">
                                    <AccordionButton>
                                      <AccountCircleIcon
                                        style={{
                                          background: "",
                                          borderRadius: "50%",
                                          width: "3.5rem",
                                          height: "3rem",
                                          textAlign: "center",
                                        }}
                                      />
                                      <Text
                                        as="span"
                                        color="black"
                                        fontSize="1.9rem"
                                        marginLeft={"0.7rem"}
                                      // Remove the hover red color
                                      >
                                        Assignment
                                      </Text>

                                      {isExpanded ? (
                                        <ChevronUpIcon
                                          color={"black"}
                                          ml="10px"
                                          fontSize={"2rem"}
                                        />
                                      ) : (
                                        <ChevronDownIcon
                                          color={"black"}
                                          ml="10px"
                                          fontSize={"2rem"}
                                        />
                                      )}
                                    </AccordionButton>
                                  </NavLink>
                                </h2>
                                <AccordionPanel pb={4}>
                                  <ListItem
                                    className="listItem"
                                    p="5px"
                                    borderRadius="10px"
                                  >
                                    <ListIcon
                                      as={BsAmd}
                                      color="gray.500"
                                      ml="10px"
                                    />
                                    <NavLink to="/newassignment">
                                      <Text
                                        as="span"
                                        pl="10px"
                                        fontSize={{
                                          base: "1.3rem",
                                          md: "1.3rem",
                                        }}
                                        color="black"
                                      >
                                        New Assignment
                                      </Text>
                                    </NavLink>
                                  </ListItem>

                                  {/* <ListItem
                                    className="listItem"
                                    p="5px"
                                    borderRadius="10px"
                                  >
                                    <ListIcon
                                      as={BsFileEarmarkSpreadsheet}
                                      color="gray.500"
                                      ml="10px"
                                    />

                                    <Text
                                      as="span"
                                      pl="10px"
                                      fontSize={{
                                        base: "1.3rem",
                                        md: "1.3rem",
                                      }}
                                      color="black"
                                    >
                                      Filled Assignment
                                    </Text>
                                  </ListItem> */}

                                  <Divider
                                    borderWidth="1px"
                                    borderColor={"gray"}
                                  />
                                </AccordionPanel>
                              </>
                            )}
                          </AccordionItem>
                        </Accordion>

                        {/* <Divider borderWidth="1px" borderColor={"gray"} /> */}
                        <ListItem
                          style={{ marginTop: "1.5rem" }}
                          className="listItem"
                          p="10px"
                          borderRadius="10px"
                        >
                          <MovingIcon className="sidebaricon" />

                          <Text
                            as="span"
                            color="black"
                            fontSize="rem"
                            marginLeft="8px" // Add some margin for spacing between icon and text
                            _hover={{ textDecoration: "underline" }}
                            onClick={handleSignout}
                          >
                            SignOut
                          </Text>
                        </ListItem>
                      </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                      {" "}
                      <Button
                        marginLeft={"2.5rem"}
                        marginTop={"1.8rem"}
                        mr={3}
                        fontSize={"1.1rem"}
                        width={"100px"}
                        height={"35px"}
                        color={"black"}
                        fontWeight={"bold"}
                        onClick={onClose}
                        bg={"lightgray"}
                        borderRadius={"8px"}
                      >
                        {" "}
                        Close X
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            )}
          </Box>
        )}
      </List>
    </>
  );
}
