import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import "./EmployeeProfileEdit.css";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
const ReportForm = () => {
  const toast = useToast();

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { userId } = useParams();
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    mobile: "",
    caller: "",
    startdate: "",
    enddate: "",
    totalform: "",
    filledform: "0",
    rightform: "0",
    incorrectform: "0",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/user/get_report_by_id/${userId}`
        );
        const data = response.data;

        if (data && data.user) {
          console.log(data.user.name);
          console.log(data.user);
          setInputField({
            name: data.user.name || "",
            email: data.user.email || "",
            mobile: data.user.mobile || "",
            caller: data.user.caller || "",
            startdate: data.user.startDate || "",
            enddate: data.user.endDate || "",
            totalform: data.user.totalAssingment || "",
            filledform: data.user.submitdAssingment || "",
            rightform: data.user.correctAssignment || "",
            incorrectform: data.user.incorrectAssignment || "",
          });
        } else {
          console.error("User data not available");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // form change handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputField((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const Navigate = useNavigate();

  const handlelogout = () => {
    Navigate("/report");
  };
  const downloadUserDetailsAsPDF = async () => {
    try {
      // Fetch incomplete assignments data from the backend
      const incompleteAssignmentsResponse = await axios.get(
        `${apiUrl}/user/get_incorrect_assignments/${userId}`
      );
      console.log(
        "incompleteAssignmentsResponse",
        incompleteAssignmentsResponse
      );

      // Extract assignments data from the response
      const incompleteAssignmentsData =
        incompleteAssignmentsResponse.data.incorrectAssignment;

      // Create PDF
      const pdf = new jsPDF();

      // Set font size
      const fontSize = 26;

      // Add user details to the first page only
      const addTextWithMargin = (text, x, y, marginBottom) => {
        pdf.setFontSize(fontSize);
        pdf.text(text, x, y);
        pdf.text("", x, y + marginBottom); // Add an empty line as a margin
      };

      // Add user details to the first page only
      addTextWithMargin(`Zemix Services-List of Details`, 20, 20, 10);
      addTextWithMargin(`User Details - ${inputField.name}`, 20, 30, 20);

      addTextWithMargin(`Name: ${inputField.name}`, 20, 40, 30);
      addTextWithMargin(`Email: ${inputField.email}`, 20, 50, 40);
      addTextWithMargin(`Mobile: ${inputField.mobile}`, 20, 60, 50);
      addTextWithMargin(`Start-Date: ${inputField.startdate}`, 20, 70, 60);
      addTextWithMargin(`End-Date: ${inputField.enddate}`, 20, 80, 70);
      addTextWithMargin(`Filled-Form: ${inputField.filledform}`, 20, 90, 80);
      addTextWithMargin(`Correct-Form: ${inputField.rightform}`, 20, 100, 90);
      addTextWithMargin(
        `InCorrect-Form: ${inputField.incorrectform}`,
        20,
        110,
        100
      );

      // Save PDF after adding the first page
      // Add an empty line as a margin
      pdf.addPage();

      incompleteAssignmentsData.forEach((assignment, index) => {
        // Add incomplete assignments data to PDF
        pdf.setFontSize(fontSize);
        pdf.text("Incomplete Assignments:", 20, 20);

        // Function to check remaining space on the page
        const checkRemainingSpace = (currentY, marginBottom) => {
          const maxY = pdf.internal.pageSize.height - marginBottom;
          if (currentY > maxY) {
            pdf.addPage();
            return 20; // Starting Y position on the new page
          }
          return currentY;
        };

        let yPos = 30; // Initial Y position
        const marginBottom = 15; // Increase bottom margin

        // Add more fields as needed
        pdf.text(`${index + 1}. Name: ${assignment.name || "N/A"}`, 20, yPos);
        yPos += 20; // Increase yPos after the name
        pdf.text(`    Address: ${assignment.address || "N/A"}`, 20, yPos);
        yPos += 20; // Increase Y position for address
        pdf.text(`    Pin Code: ${assignment.pinCode || "N/A"}`, 20, yPos);
        yPos += 20; // Increase Y position for pin code
        pdf.text(
          `    Job Functional: ${assignment.jobFunctional || "N/A"}`,
          20,
          yPos
        );
        yPos += 20; // Increase Y position for job functional
        pdf.text(`    Mobile Number: ${assignment.phone || "N/A"}`, 20, yPos);
        yPos += 20; // Increase Y position for mobile number
        pdf.text(
          `    Annual Revenue: ${assignment.annualRevenue || "N/A"}`,
          20,
          yPos
        );

        if (index < incompleteAssignmentsData.length - 1) {
          // Add a new page for each user except the last one
          pdf.addPage();
        }
      });

      // Save PDF
      pdf.save(`Zemix Services: ${inputField.name} `);
    } catch (error) {
      toast({
        title: 'User has not filled all the forms',
        // description: 'Provide Correct UserId and Password',
        status: 'error',
        duration: 3000, // Toast message will disappear after 3 seconds
        isClosable: true,
        position:"top",
      });
    }
  };

  return (
    <Box 
    margin={'0.7rem'}
    className="employee-form-container">
      <form className="employee-form">
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Name</FormLabel>
              <Input
                width={["300px", "400px"]}
                type="text"
                placeholder="Enter Name"
                onChange={onChangeHandler}
                value={inputField.name}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Mobile</FormLabel>
              <Input
             width={["300px" ,"400px"]}
                type="number"
                placeholder="9876543210"
                onChange={onChangeHandler}
                value={inputField.mobile}
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Email</FormLabel>
              <Input
                width={["300px", "400px"]}
                type="email"
                placeholder=".........i@2023"
                onChange={onChangeHandler}
                value={inputField.email}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Caller</FormLabel>
              <Input
               width={["300px" ,"400px"]}
                type="text"
                placeholder="Caller"
                onChange={onChangeHandler}
                value={inputField.caller}
              />
            </FormControl>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Start Date</FormLabel>
              <Input
                width={["300px", "400px"]}
                type="text"
                placeholder="start date"
                onChange={onChangeHandler}
                value={inputField.startdate}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>End Date</FormLabel>
              <Input
             width={["300px" ,"400px"]}
                type="text"
                placeholder="End Date"
                onChange={onChangeHandler}
                value={inputField.enddate}
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Total Form</FormLabel>
              <Input
                width={["300px", "400px"]}
                type="number"
                placeholder="Total Form"
                onChange={onChangeHandler}
                value={inputField.totalform}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Filled Form</FormLabel>
              <Input
              width={["300px" ,"400px"]}
                type="number"
                placeholder="Filled Form"
                onChange={onChangeHandler}
                value={inputField.filledform}
                defaultValue="0"
              />
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]}>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>Right Form</FormLabel>
              <Input
                width={["300px", "400px"]}
                type="number"
                placeholder="correct form"
                onChange={onChangeHandler}
                value={inputField.rightform}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl className="employee-form-group">
              <FormLabel>InCorrect Form</FormLabel>
              <Input
                width={["300px", "400px"]}
                type="number"
                placeholder="Incorrect form"
                onChange={onChangeHandler}
                value={inputField.incorrectform}
              />
            </FormControl>
          </Box>
        </Stack>
      </form>

     
      <Button
        
        className="employee-btn"
        colorScheme="teal"
        mt="4"
        onClick={downloadUserDetailsAsPDF}
      >
        Download User Report
      </Button>
    </Box>
  );
};

export default ReportForm;
