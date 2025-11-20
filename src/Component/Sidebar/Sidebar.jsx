import {
  List,
  ListItem,
  Box,
  Text,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  IconButton,
  Button,
  Divider,
  Stack,
  ListIcon,
} from "@chakra-ui/react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovingIcon from "@mui/icons-material/Moving";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { NavLink, useNavigate } from "react-router-dom";
import { BsAmd } from "react-icons/bs";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useUserContext } from "../Context/UserContext";

export default function SideBar() {
  // SEPARATE DRAWER FOR ADMIN
  const {
    isOpen: adminOpen,
    onOpen: openAdmin,
    onClose: closeAdmin,
  } = useDisclosure();

  // SEPARATE DRAWER FOR USER
  const {
    isOpen: userOpen,
    onOpen: openUser,
    onClose: closeUser,
  } = useDisclosure();

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const { getUser } = useUserContext();

  const userRole = sessionStorage.getItem("userrole");
  const isAdmin = userRole === "Admin";
  const isUser = userRole === "User";

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignout = () => {
    localStorage.clear();
    toast({
      title: "Logout Success.",
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
        { label: "Cancel", path: "/user/cancel" },
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
      <List p="10px">
        {/* MOBILE HAMBURGER */}
        {isMobileView && (
          <IconButton
            icon={<HamburgerIcon />}
            display={{ base: "block", md: "none" }}
            onClick={isAdmin ? openAdmin : openUser}
          />
        )}

        {/* ---------------------- DESKTOP ADMIN ---------------------- */}
        {!isMobileView && isAdmin && (
          <Box>
            <ListItem p="10px">
              {adminMenu.map((item, index) =>
                item.submenu ? (
                  <Accordion allowToggle key={index} width="100%">
                    <AccordionItem>
                      <AccordionButton>
                        <DashboardIcon />
                        <Text ml="8px" fontSize="1.5rem" flex="1">
                          {item.label}
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pb={2}>
                        {item.submenu.map((sub, i) => (
                          <Flex key={i} ml="40px" mt={2}>
                            <NavLink to={sub.path}>
                              <Text fontSize="1.3rem">{sub.label}</Text>
                            </NavLink>
                          </Flex>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Flex key={index} mt={4}>
                    <DashboardIcon />
                    <NavLink to={item.path}>
                      <Text ml="8px" fontSize="1.5rem">
                        {item.label}
                      </Text>
                    </NavLink>
                  </Flex>
                )
              )}
            </ListItem>
          </Box>
        )}

        {/* ---------------------- MOBILE ADMIN DRAWER ---------------------- */}
        {isMobileView && isAdmin && (
          <Drawer isOpen={adminOpen} onClose={closeAdmin} placement="left">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader fontSize="2rem">Admin Dashboard</DrawerHeader>
              <DrawerBody>
                <List>
                  {adminMenu.map((item, index) =>
                    item.submenu ? (
                      <Accordion allowToggle key={index}>
                        <AccordionItem>
                          <AccordionButton   ml={item.path === "/user" ? "-18px" : menuMarginMap[item.path] ?? 0}>
                            <DashboardIcon />
                            <Text ml="8px" fontSize="1.4rem" flex="1">
                              {item.label}
                            </Text>
                            <AccordionIcon />
                          </AccordionButton>

                          <AccordionPanel pb={2}>
                            {item.submenu.map((sub, i) => (
                              <NavLink
                                key={i}
                                to={sub.path}
                                onClick={closeAdmin}
                              >
                                <Text ml="35px" fontSize="1.2rem">
                                  {sub.label}
                                </Text>
                              </NavLink>
                            ))}
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Flex key={index} py={2}>
                        <DashboardIcon />
                        <NavLink to={item.path} onClick={closeAdmin}>
                          <Text ml="8px" fontSize="1.4rem">
                            {item.label}
                          </Text>
                        </NavLink>
                      </Flex>
                    )
                  )}
                </List>
              </DrawerBody>

              <DrawerFooter>
                <Button width="100%" onClick={closeAdmin}>
                  Close X
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        {/* ---------------------- DESKTOP USER ---------------------- */}
        {!isMobileView && isUser && (
          <Box>
            <Stack>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <AccountCircleIcon
                      style={{ width: "3.5rem", height: "3rem" }}
                    />
                    <NavLink to="/assignment">
                      <Text ml="10px" fontSize="1.5rem">
                        Assignment
                      </Text>
                    </NavLink>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <ListItem>
                      <ListIcon as={BsAmd} />
                      <NavLink to="/newassignment">
                        <Text ml="10px" fontSize="1rem">
                          New Assignment
                        </Text>
                      </NavLink>
                    </ListItem>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <ListItem mt="1.5rem" onClick={handleSignout}>
                <MovingIcon />
                <Text ml="8px">SignOut</Text>
              </ListItem>
            </Stack>
          </Box>
        )}

        {/* ---------------------- MOBILE USER DRAWER ---------------------- */}
        {isMobileView && isUser && (
          <Drawer isOpen={userOpen} onClose={closeUser} placement="left">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerHeader fontSize="2rem">User Dashboard</DrawerHeader>

              <DrawerBody>
                <Stack>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton>
                        <AccountCircleIcon
                          style={{
                            width: "3.5rem",
                            height: "3rem",
                          }}
                        />
                        <Text ml="10px" fontSize="1.9rem">
                          Assignment
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pb={4}>
                        <NavLink to="/newassignment" onClick={closeUser}>
                          <Text ml="35px" fontSize="1.4rem">
                            New Assignment
                          </Text>
                        </NavLink>

                        <Divider mt={2} />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <ListItem mt="1.5rem" onClick={handleSignout}>
                    <MovingIcon />
                    <Text ml="8px" fontSize="1.4rem">
                      SignOut
                    </Text>
                  </ListItem>
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button width="100%" onClick={closeUser}>
                  Close X
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </List>
    </>
  );
}
