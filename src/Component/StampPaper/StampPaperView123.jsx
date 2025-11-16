import {
  Box,
  Heading,
  Text,
  Image,
  Table,
  Tr,
  Td,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
// import image from "./SVG STAM.svg";
import image from "../../Images/SVG STAM.svg";
import { useEffect, useState } from "react";
import notri from "../../Images/notriimage.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import LeaseAgreement from "../../Images/notri.svg";
import sign from "../../Images/SIGN 6.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { usePDF } from "react-to-pdf";

const StampPaperView = () => {
  const { toPDF, targetRef } = usePDF({ filename: "Agreement.pdf" });
  const { id } = useParams();
  console.log(id, "userId");
  const appUrl = import.meta.env.VITE_APP_API_URL;
  const [doc, setDoc] = useState(null);
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    startdate: "",
    address: "",
    photo: "",
    signature: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  console.log(photoPreview);

  const [loader, setLoader] = useState(false);

  // const loadImage = async (src) => {
  //   if (typeof window !== 'undefined') {
  //     // Browser environment
  //     const response = await fetch(src);
  //     const blob = await response.blob();
  //     return createImageBitmap(blob);
  //   } else {
  //     // Node.js environment
  //     const { createCanvas, loadImage } = require('canvas');
  //     const image = await loadImage(src);
  //     const canvas = createCanvas(image.width, image.height);
  //     const ctx = canvas.getContext('2d');
  //     ctx.drawImage(image, 0, 0);
  //     return canvas;
  //   }
  // };

  //download pdf logic
  // const downlodePDF = async (photoPreview, signaturePreview) => {
  //   console.log(downlodePDF, "downlodePD");
  //   const capture = document.querySelector(".downLodeBox");
  //   setLoader(true);

  //   html2canvas(capture).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     // const imgData = canvas.toDataURL("img/png");
  //     const doc = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: [canvas.width, canvas.height],
  //     });

  //       const marginLeft = 0; // Adjust as needed
  //       const marginTop = 0; // Adjust as needed
  //       const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;
  //       const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

  //       // Calculate the aspect ratio of the content
  //       const aspectRatio = canvas.width / canvas.height;

  //       // Calculate the width and height based on the aspect ratio
  //       let imgWidth = contentWidth;
  //       let imgHeight = contentWidth / aspectRatio;

  //     // If the image height exceeds the content height, adjust accordingly
  //     if (imgHeight > contentHeight) {
  //       imgHeight = contentHeight;
  //       imgWidth = contentHeight * aspectRatio;
  //     }
  //     // Calculate the center position for the image
  //     const imgX = marginLeft + (contentWidth - imgWidth) / 2;
  //     const imgY = marginTop + (contentHeight - imgHeight) / 2;
  //     // Add the image to the PDF with adjusted position and dimensions
  //     doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);
  //     const photoX = marginLeft + 420; // Adjust as needed
  //     const photoY = doc.internal.pageSize.getHeight() - 480; // Adjust as needed
  //     // Add the photoPreview image to the PDF
  //     if (photoPreview) {
  //         doc.addImage(photoPreview, "JPEG", photoX, photoY, 170, 205);
  //     }
  //     // Calculate the position for signaturePreview at the end of the content
  //     const signatureX = marginLeft + 750; // Adjust as needed
  //     const signatureY = doc.internal.pageSize.getHeight() - 480; // Adjust as needed
  //     // Add the signaturePreview image to the PDFsss
  //     if (signaturePreview) {
  //         doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 170,205);
  //     }
  //     setLoader(false);
  //     doc.save("Agreement.pdf");
  //   });
  // };
  // const downlodePDF = async (photoPreview, signaturePreview) => {
  //   console.log(downlodePDF, "downlodePD");
  //   const capture = document.querySelector(".downLodeBox");
  //   setLoader(true);
  //   const pdfBlob = doc.output('blob');
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   window.open(pdfUrl, '_blank');

  //   html2canvas(capture).then((canvas) => {

  //     const imgData = canvas.toDataURL("image/png");
  //     // const imgData = canvas.toDataURL("img/png");
  //     const doc = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: [canvas.width, canvas.height],
  //     });

  //   const marginLeft = 0; // Adjust as needed
  //   const marginTop = 0; // Adjust as needed
  //   const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;
  //   const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

  //   // Calculate the aspect ratio of the content
  //   const aspectRatio = canvas.width / canvas.height;

  //   // Calculate the width and height based on the aspect ratio
  //   let imgWidth = contentWidth;
  //   let imgHeight = contentWidth / aspectRatio;

  //     // If the image height exceeds the content height, adjust accordingly
  //     if (imgHeight > contentHeight) {
  //       imgHeight = contentHeight;
  //       imgWidth = contentHeight * aspectRatio;
  //     }
  //     // Calculate the center position for the image
  //     const imgX = marginLeft + (contentWidth - imgWidth) / 2;
  //     const imgY = marginTop + (contentHeight - imgHeight) / 2;
  //     // Add the image to the PDF with adjusted position and dimensions
  //     doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);
  //     const photoX = marginLeft + 420; // Adjust as needed
  //     const photoY = doc.internal.pageSize.getHeight() - 480; // Adjust as needed
  //     // Add the photoPreview image to the PDF
  //     if (photoPreview) {
  //       doc.addImage(photoPreview, "JPEG", photoX, photoY, 170, 205);
  //     }
  //     // Calculate the position for signaturePreview at the end of the content
  //     const signatureX = marginLeft + 750; // Adjust as needed
  //     const signatureY = doc.internal.pageSize.getHeight() - 480; // Adjust as needed
  //     // Add the signaturePreview image to the PDFsss
  //     if (signaturePreview) {
  //       doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 170, 205);
  //     }
  //     setLoader(false);
  //     doc.save("Agreement.pdf");
  //   });
  // };

  //   const downlodePDF = async (photoPreview, signaturePreview) => {
  //     const capture = document.querySelector(".downLodeBox");
  //     setLoader(true);

  //     html2canvas(capture).then((canvas) => {
  //         const imgData = canvas.toDataURL("image/png");
  //         const doc = new jsPDF({
  //             orientation: "portrait",
  //             unit: "mm",
  //             format: [canvas.width, canvas.height],
  //         });

  //         const marginLeft = 0;
  //         const marginTop = 0;
  //          const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;

  //         const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

  //         const aspectRatio = canvas.width / canvas.height;
  //         let imgWidth = contentWidth;
  //         let imgHeight = contentWidth / aspectRatio;

  //         if (imgHeight > contentHeight) {
  //             imgHeight = contentHeight;
  //             imgWidth = contentHeight * aspectRatio;
  //         }

  //         const imgX = marginLeft + (contentWidth - imgWidth) / 2;
  //         const imgY = marginTop + (contentHeight - imgHeight) / 2;

  //         doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

  //         const photoX = marginLeft + 420;
  //         const photoY = doc.internal.pageSize.getHeight() - 480;
  //         if (photoPreview) {
  //             doc.addImage(photoPreview, "JPEG", photoX, photoY, 35, 75);
  //         }

  //         const signatureX = marginLeft + 480;
  //         const signatureY = doc.internal.pageSize.getHeight() - 480;
  //         if (signaturePreview) {
  //             doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 35, 75);
  //         }

  //         // Save the PDF and open it in a new tab
  //         doc.save("Agreement.pdf");
  //         setLoader(false);
  //  console.log("pdfffff",   doc.save("Agreement.pdf"))
  //         // Open the PDF in a new tab
  //         // const pdfBlob = doc.output('blob');
  //         // const pdfUrl = URL.createObjectURL(pdfBlob);
  //         // window.open(pdfUrl, '_blank');
  //     });
  // };
  const downlodePDF = async (photoPreview, signaturePreview) => {
    const capture = document.querySelector(".downLodeBox");
    setLoader(true);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [canvas.width, canvas.height],
      });

      const marginLeft = 0;
      const marginTop = 0;
      const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;

      const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

      const aspectRatio = canvas.width / canvas.height;
      let imgWidth = contentWidth;
      let imgHeight = contentWidth / aspectRatio;

      if (imgHeight > contentHeight) {
        imgHeight = contentHeight;
        imgWidth = contentHeight * aspectRatio;
      }

      const imgX = marginLeft + (contentWidth - imgWidth) / 2;
      const imgY = marginTop + (contentHeight - imgHeight) / 2;

      doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

      // const photoX = marginLeft + 420;
      // const photoY = doc.internal.pageSize.getHeight() - 480;
      // if (photoPreview) {
      //     doc.addImage(photoPreview, "JPEG", photoX, photoY, 35, 75);
      // }

      // const signatureX = marginLeft + 480;
      // const signatureY = doc.internal.pageSize.getHeight() - 480;
      // if (signaturePreview) {
      //     doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 35, 75);
      // }

      const photoWidth = 0.05 * contentWidth;
      const photoHeight = photoWidth / aspectRatio / 3;
      const photoX = marginLeft + 0.2 * contentWidth;
      const photoTopMargin = 0.08 * contentHeight;
      const photoY =
        doc.internal.pageSize.getHeight() -
        0.05 * contentHeight -
        photoHeight -
        photoTopMargin;

      if (photoPreview) {
        doc.addImage(
          photoPreview,
          "JPEG",
          photoX,
          photoY,
          photoWidth,
          photoHeight
        );
      }

      const signatureWidth = 0.05 * contentWidth;
      const signatureHeight = signatureWidth / aspectRatio / 3;
      const signatureX = marginLeft + 0.2 * contentWidth;
      const signatureTopMargin = -0.09 * contentHeight;
      const signatureY =
        doc.internal.pageSize.getHeight() -
        0.25 * contentHeight -
        signatureHeight -
        signatureTopMargin;

      if (signaturePreview) {
        doc.addImage(
          signaturePreview,
          "PNG",
          signatureX,
          signatureY,
          signatureWidth,
          signatureHeight
        );
      }

      // Save the PDF and open it in a new tab
      doc.save("Agreement.pdf");
      setLoader(false);

      // Open the PDF in a new tab
      // const pdfBlob = doc.output('blob');
      // const pdfUrl = URL.createObjectURL(pdfBlob);
      // window.open(pdfUrl, '_blank');
    });
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
    setPhotoPreview(URL.createObjectURL(selectedPhoto));
  };

  const handleSignatureChange = (e) => {
    const selectedSignature = e.target.files[0];
    setSignature(selectedSignature);
    setSignaturePreview(URL.createObjectURL(selectedSignature));
  };

  // useEffect to call
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/user/get_terms_by_id/${id}`
        );
        const data = response.data;
        console.log(data, "data hai ye");
        console.log(data?.User);
        console.log(`${appUrl} / data?.signature`);
        setInputField({
          name: data?.name,
          email: data?.email,
          startdate: data?.startdate,
          address: data?.address,
          signature: data?.signature,
          photo: data?.photo,
        });
        setPhotoPreview(data?.photo);
        setSignaturePreview(data?.signature);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputField({
      ...prevValue,
      [name]: value,
    });
  };
  console.log("onChangeHandler", onChangeHandler);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setInputField({
          ...inputField,
          [field]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Box ref={targetRef} p="20px">
        <Box width="100%" m="auto">
          <Box mx="auto" w="100%" overflow="hidden">
            <Image
              mx="auto"
              src={image}
              alt="Description of the image"
              maxW="100%"
            />
          </Box>
        </Box>

        {/* <Box display="flex" justifyContent="space-evenly">
          <Box mb={{ base: "2", lg: "0" }}>
            <Image
              w={{ base: "100%", lg: "150px" }}
              h={{ base: "auto", lg: "350px" }}
              src={notri}
              alt="Dan Abramov"
            />
          </Box>
          <Box textAlign="center">
            <Heading as="h2" mb={{ base: "2", lg: "4" }}>
              Legal Employment Contract 2023
            </Heading>

            <Text>
              THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
              Eleven Months From 2023-11-30 BETWEEN:
            </Text>

            <Text fontSize={"1.5rem"}>
              <strong>Zemex Service of </strong>
            </Text>
            <Text>
              KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN
              (RJ), INDIA(IN), 302031 of
            </Text>

            <Text fontSize={"1.5rem"}>
              <strong>(The "Employer")</strong>
            </Text>

            <Text ml={{ base: "0", lg: "10%" }}>OF THE FIRST PARTY </Text>

            <Text>-AND-</Text>
            <Text>
              S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
              <strong>(The "Employee")</strong>
            </Text>
            <Text ml={{ base: "0", lg: "10%" }}>OF THE SECOND PARTY</Text>
          </Box>
        </Box> */}
        <Box display="flex" justifyContent="space-evenly">
          <Box>
            <Image w="150px" h="350px" src={notri} alt="Dan Abramov" />
          </Box>
          <Box textAlign="center">
            <Heading fontSize="1.2rem" mb="4">
              Legal Employment Contract 2023
            </Heading>

            <Text fontSize="1rem">
              THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
              Eleven Months From 2023-11-30 BETWEEN:
            </Text>

            <Text>
              <Heading fontSize="1.2rem">Zemix Services</Heading>
            </Text>
            <Text fontSize="1rem">
              KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN
              (RJ), INDIA(IN), 302031 of
            </Text>

            {/* <Text fontSize={"1.5rem"}>
              <strong>(The "Employer")</strong>
            </Text> */}
            <Text>
              <Heading fontSize="1rem">The "Employer"</Heading>
            </Text>
            <Text fontSize="1rem">OF THE FIRST PARTY </Text>

            <Text fontSize="1rem">-AND-</Text>
            <Text>
              S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
              <strong>(The "Employee")</strong>
            </Text>
            <Text fontSize="1rem">OF THE SECOND PARTY</Text>
          </Box>
        </Box>

        <Box>
          <Heading as="h3" mb={4} size="md">
            Background
          </Heading>
          <Text fontSize="md">
            A. The Employer Is Of The Opinion That The Employee Has The
            Necessary Qualifications, Experience, And Abilities To Assist And
            Benefit The Employer In Requisiting Skills And Infrastructure For
            Successful Execution Of Form Filling Projects.
            <br />
            <br />
            B. The Employer Desires To Employ The Employee, And The Employee Has
            Agreed To Accept And Enter Such Employment Upon The Terms And
            Conditions Set Out In This Agreement.
            {/* ... (rest of the Background section) */}
          </Text>
          <Text fontSize="md">
            <br />
            Presently It Is In A Position To Procure The Business For Form
            Filling More Meaningfully Described In The Column Scope Of Work,
            Through Their Principals. The Current Project Is Carried Out Under
            The Cost Of Client And Not An Assignment As Such Acquired By
            Employee. and where as The Employee Is Engaged Inter Alias, In The
            Business Of Providing A Wide Spectrum Of Software Solutions &
            Services.
            <br />
            <br />
            IN CONSIDERATION OF The Matters Described Above and of The Mutual
            Benefits and Obligations Set Forth In This Agreement, The Receipt
            And Sufficiency of Which Consideration Is Hereby Acknowledged, The
            Parties To This Agreement Agree As Follows:
          </Text>
        </Box>

        {/* Commencement Date and Term Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            <br />
            Commencement Date and Term
          </Heading>
          <Text fontSize="md">
            Scope Of Work: The Employee Will Commence Employment With The
            Employer On 2023-11-30 (the "Commencement Date") Extending Till
            2023-12-04 (End Of "Term Date").
            <br />
            <br />
            Subject To The Probationary Period And Subject To Termination As
            Provided In This Agreement, The Employee Is Required To Feed The
            Provided Data In The Provided Portal As Per The Guidelines Within 5
            Days From The Date Of Commencement. The Parties Acknowledge That
            Various Provisions Of This Agreement Survive Past Termination Of
            Employment.
          </Text>
        </Box>

        {/* Job Title and Description Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            <br />
            1. Job Title and Description
          </Heading>
          <Text fontSize="md">
            1.1. The Initial Job Duties The Employee Will Be Expected To Perform
            Will Be Consisted Of Filling Of The Forms (Data Entry) As Per The
            Information And Data Given The Online Portal.
            <br />
            <br />
            1.2. The Employee Agrees To Be Employed On The Terms And Conditions
            Set Out In This Agreement. The Employee Agrees To Be Subject To The
            General Supervision Of And Act Pursuant To The Orders, Advice, And
            Direction Of The Employer.
            <br /> <br />
            1.3.The Employee Will Perform Any And All Duties As Requested By The
            Employer That Are Reasonable And That Are Customarily Performed By A
            Person Holding A Similar Position In The Industry Or Business Of The
            Employer.
            <br />
            <br />
            1.4.The Employer May Make Changes To The Job Title Or Duties Of The
            Employee Where The Changes Would Be Considered Reasonable For A
            Similar Position In The Industry Or Business Of The Employer.
            <br />
            <br />
            1.5.The Employee Agrees To Abide By The Employers Rules,
            Regulations, Policies And Practices, Including Those Concerning Work
            Schedules, Annual Leave And Sick Leave, As They May From Time To
            Time Be Adopted Or Modified.
            <br />
            {/* ... (rest of the Job Title and Description section) */}
          </Text>
        </Box>

        {/* Employee Remuneration Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            <br />
            2. Employee Remuneration
          </Heading>
          <Text fontSize="md">
            2.1. Remuneration: - For The Form Filling Services Rendered By The
            Employee, The Employee Shall Be Entitled For Payment Of Price 40Rs.
            (INR) Max Per Form For The Salary May Vary From 20800/- INR To
            20130/- INR Depends Upon The Accuracy.
            <br /> <br />
            2.2.Billing :- Employer Will Provide Workload Of 520 FORMS Which The
            Employee Shall Complete The Work Within 5 DAYS Under The Given
            Criteria Of This Agreement. This Agreement Has Been Signed For One
            System. The Employer Will Make The Payment For The Billing Within 3
            INTERNATIONAL WORKING Days From Date Of Raising The Project Subject
            To The Quality Check Report.
            <br />
            <br />
            2.3.Accuracy :- Employer Will Provide Adequate Feedback Within 15
            Working Days For All Data And On Completion Of Quality Check Shall
            Issue A Quality Report. Both Parties Agree To Assure Highest Quality
            Of End Service. Following Cycle For Accuracy Will Be Followed. Cut
            Off Forms - 468/520 (In Total) - Above 90% @ 40/- INR Per Form. If
            Below Cut Off Or ID Is Terminated Then The Employee Is Supposed To
            Clear Registration Amount.
            <br /> <br />
            The Q.C. Department Will Check The Forms Randomly. Until The
            Submitted Slot Is Rejected Above The Cut-Off Criteria If Employee
            Makes Any Mistake, (Which Includes But Not Limited To Spelling,
            Punctuation, Extra/Missing Space, Extra/Missing Word, Extra/Missing
            Line Etc.) In A Form That Form Will Be Rejected, Likewise Employee
            Have To Maintain Cut Off Or Accuracy.
            <br />
            <br />
            If All The Forms Are Submitted Or In Submit Mode, Then Only The Q.C.
            Report Will Be Generated Else Not. If Forms Are In Save Mode Then
            Q.C. Report Will Not Be Generated And That Thing Will Be Considered
            As Incomplete Submission Only.
            <br />
            <br />
            You Can Save The Forms, Saved Forms Are Editable/Changeable For 48
            Hours Only, Then After All Those Forms Will Automatically Submitted
            And Becomes Non-Editable.
            <br />
            <br />
            To Generate The Q.C. Report, All The Forms Should Be Submitted. If
            All The Forms Are Not Submitted Then It Will Be Considered As
            Incomplete Submission Only.
            <br />
            <br />
            <br />
            {/* ... (rest of the Employee Remuneration section) */}
          </Text>
        </Box>

        {/* Conflict of Interest Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            3. Conflict of Interest
          </Heading>
          <Text color="red" fontSize="md">
            3.1. Application Fee(s): The Registration Amount Of 6800/- INR. Will
            Be Deducted From The Salary If Generated, And If The Salary Is Not
            Generated i.e If The Employee Fails To Complete The Work, Then You
            are required to work for 5 days. If you fail to commence your work
            after accepting it or choose to cancel it, you will be obligated to
            pay the registration amount.
            </Text>
          
            <br />
            <Text>
            He/She Is Liable Pay The Same Registration Amount On Their Own. The
            Employee Must Start & Complete His/her Work Of Form-Filling Assigned
            To Them By The Employer From The Date Of Starting The Project
            (Selected By The Employee As Per His/her Own Convenience). In Case
            Of Failure In Starting Of The Work From Employee's End Or "0" Number
            Of Forms Detected Or Incomplete Submission Of Work Is Defined By The
            Employer Then Application Fee(s) + NOC Invoice Needs To Be Cleared
            By The Employee. <br /> <br />
            As The Employer Will Have To Face The Economic Crisis In The
            Business In Case Of Failure Of This Project In Any Of The Criteria
            As Per This Agreement. <br /> <br />
            The Employee Understands And Agrees That Any Attempt On The Part Of
            The Employee To Induce Other Employees Or Contractors To Leave The
            Employers Employ, Or Any Effort By The Employee To Interfere With
            The Employers Relationship With Its Other Employees And Contractors
            Would Be Harmful And Damaging To The Employer.
            <br /> <br />
            During The Term Of The Employees Active Employment With The
            Employer, The Employee Will Not, Directly Or Indirectly, Engage Or
            Participate In Any Other Business Activities That The Employer, In
            Its Reasonable Discretion, Determines To Be In Conflict With The
            Best Interests Of The Employer Without The Written Consent Of The
            Employer.
            <br /> <br />
            3.2.ID Allocation :- Employee Will Get A Single ID To Work On And
            Employee Can Work 24X7 On This ID. If The Software Portal Or The
            Server Of The Company Detects That There Are Multiple Login
            Attempts/Multiple IP Addresses Login Of The User Account Or I.D, The
            Company Will Not Be Responsible For The Corruption Of The Data In
            Both Online And Offline Modules. And The Employee€™s I.D. Will Get
            Terminated Without Any Intimation And The Employee Needs To Clear
            The Server Maintenance Charge Up to 7999/- INR.(Refundable Amount)
            For That Particular Project As Per This Agreement.
            <br /> <br />
            3.3.TAT (Turn Around Time): The Second Party Has 5 Days(Including
            Holidays) To Complete The New Work And Second Party Has To Send It
            To First Party. The First Party Shall Give An Accuracy Report Within
            2-3 Working Days For The New Work, After Submissions As Per
            Technical Specifications Which Are Included In This Agreement With
            Accuracy Parameters.
            <br /> <br />
            3.4.Employer Agrees To Provide Formats And Other Information For
            Processing The Job To Employee At The Time Of Providing The Data And
            The Employee Agrees With The Format And Other Information Which Is
            Being Processed To The Particular. <br /> <br />
            3.5.Employee Will Execute The Data Processing Work Provided By
            Employer Through Experienced Persons In Such Manner So As To Carry
            Out The Work Efficiently At Minimum Of 90% Accuracy For Out Files.
            <br /> <br />
            3.6.This Agreement Represents The Business Agreement And Operational
            Understandings Between The Parties And Shall Remain In Effect For A
            Period Of Eleven Months From The Date Of Execution Hereof. The
            Employers Specifications In Terms Of Quality And Other Parameters
            That Shall Be Issued By TheEmployer/Their Principals From Time To
            Time And Acknowledged By The Employer Shall Be Read With This
            Agreement. <br /> <br />
            Employer/Their Principals From Time To Time And Acknowledged By The
            Employer Shall Be Read With This Agreement.
            {/* ... (rest of the Conflict of Interest section) */}
          </Text>
        </Box>

        {/* Termination of Employment Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            <br />
            4. Termination of Employment
          </Heading>
          <Text fontSize="md">
            4.1. Termination: - If Employee Fails To Submit Data On Time Or, If
            Employee Fails To Give Accuracy In Output Files.
            <br />
            Client Reserves The Right To Terminate The Agreement With Immediate
            Effect. And Zemex Services Will Not Be Responsible For Any Further
            Data And Payment To The Employee. And Employee Will Be Liable To Pay
            The Maintenance Amount To The Client As Mentioned In Clause-4 In
            This Agreement And Employee Will Also Be Liable To Pay Expenses Of
            The Employer For Legal Proceedings. Where There Is Just Cause For
            Termination, The Employer May Terminate The Employee Employment
            Without Notice, As Permitted By Law.
            <br /> <br />
            4.2.No Modification Of The Terms Of This AGREEMENT Shall Be Valid
            Unless It Is In Writing And Signed By Both The Parties.
            <br />
            4.3.Force Majeure: If The Rendition Of The Form Filling Services Is
            Hampered Due To Earthquake, Flood, Tempest, Civil Riots Or Act Of
            God Then The Business Associate Shall Be Absolved Of Its Obligations
            Hereunder Till Normalcy Is Restored After The Cessation Of The
            Aforementioned Contingencies. The Employee Shall Likewise Be
            Absolved If Rendition Of The Services Is Hampered Due To A Strike
            Called By The Data Entry Operators Engaged By The Employee, Violence
            Or Political Turbulence Or For Any Other Reason Of A Similar Nature,
            Which Is Beyond The Control Of The Employee.
            <br /> <br />
            {/* ... (rest of the Termination of Employment section) */}
          </Text>
        </Box>

        {/* Non-Solicitation Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            5. Non-Solicitation
          </Heading>
          <Text fontSize="md">
            5.1. The Employee Understands And Agrees That Any Attempt On The
            Part Of The Employee To Induce Other Employees Or Contractors To
            Leave The Employers Employ Would Be Harmful And Damaging To The
            Employer.
            <br />
            <br />
            5.2.The Employee Will Not In Any Way, Directly Or Indirectly :-{" "}
            <br />
            <br />
            <Text ml={"1rem"}>
              5.2.1.Induce Or Attempt To Induce Any Employee Or Contractor Of
              The Employer To Quit Employment O Retainer With The Employer.{" "}
              <br /> <br />
              5.2.2.Discuss Employment Opportunities Or Provide Information
              About Competitive Employment To Any O The Employers Employees Or
              Contractors.
            </Text>
            <br />
            This Non-solicitation Obligation As Described In This Section Will
            Be Limited To Employees Or Contractors Who Were Employees Or
            Contractors Of The Employer During The Period That The Employee Was
            Employed By The Employer.
            <br /> <br />
            {/* ... (rest of the Non-Solicitation section) */}
          </Text>
        </Box>

        {/* Confidential Information Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            6. Confidential Information
          </Heading>
          <Text fontSize="md">
            6.1. The Employee Acknowledges That, In Any Position The Employee
            May Hold, In And As A Result Of The Employees Employment By The
            Employer, The Employee Will, Or May, Be Making Use Of, Acquiring Or
            Adding To Information Which Is Confidential To The Employer (the
            "Confidential Information").
            <br />
            <br />
            6.2.The Employee Agrees And Acknowledges That The Confidential
            Information Is Of A Proprietary And Confidential Nature And That Any
            Disclosure Of The Confidential Information To A Third Party In
            Breach Of This Agreement Cannot Be Reasonably Or Adequately
            Compensated For In Money Damages, Would Cause Irreparable Injury To
            Employer, Would Gravely Affect The Effective And Successful Conduct
            Of The Employers Business And Goodwill, And Would Be A Material
            Breach Of This Agreement.
            <br /> <br />
            {/* ... (rest of the Confidential Information section) */}
          </Text>
        </Box>

        {/* Severability Section */}
        <Box>
          <Heading as="h3" mb={4} size="md">
            7. Severability
          </Heading>
          <Text fontSize="md">
            7.1.The Employer And The Employee Acknowledge That This Agreement Is
            Reasonable, Valid And Enforceable. However, If Any Term, Covenant,
            Condition Or Provision Of This Agreement Is Held By A Court Of
            Competent Jurisdiction To Be Invalid, Void Or Unenforceable, It Is
            The Parties Intent That Such Provision Be Changed In Scope By The
            Court Only To The Extent Deemed Necessary By That Court To Render
            The Provision Reasonable And Enforceable And The Remainder Of The
            Provisions Of This Agreement Will In No Way Be Affected, Impaired Or
            Invalidated As A Result.
            <br />
            <br />
            7.2.Variation: Except As Otherwise Expressly Provided In This
            Agreement, This Agreement May Not Be Changed Or Modified In Any Way
            After It Has Been Signed, Except In Writing Signed By Or On Behalf
            Of Both Of The Parties.
            <br /> <br />
            7.3.Dispute Resolution & Jurisdiction: In The Event Of Any Dispute
            Or Difference Arising Between The Parties Hereto Relating To Or
            Arising Out Of This Agreement, Including The Implementation,
            Execution, Interpretation, Rectification, Validity, Enforceability,
            Termination Or Rescission Thereof, Including The Rights, Obligations
            Or Liabilities Of The Parties Hereto, The Same Will Be Adjudicated
            And Determined By Arbitration. The Indian Arbitration & Conciliation
            Act, 1996 Or Any Statutory Amendment Or Re-enactment Thereof In
            Force In India, Shall Govern The Reference. Both Parties Shall
            Appoint Their Respective Arbitrator, And Both Arbitrators Thus
            Appointed Should Appoint The Third Arbitrator Who Shall Function As
            The Presiding Arbitrator. The Venue Of Arbitration Shall Be Jaipur
            (Rajasthan). The Courts In The City Of Rajkot Shall Have Exclusive
            Jurisdiction To Entertain Try And Determine The Same
            <br /> <br />
            7.4.Both The Parties Hereby Agree Neither To Circumvent Or Nor To
            Disclose The Identities, Information As Well As The Essence Of The
            Project Etc. Of Each Others/Principles, Clients Etc. To Any Other
            Third Party And Neither Of Us Will Approach Each Contracts Of Each
            Other As Identified From Time To Time.
            <br />
            <br />
            {/* ... (rest of the Severability section) */}
          </Text>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="bold">
            IN WITNESS WHEREOF
          </Text>
          <Text fontSize="md">
            The Parties Hereto Have Executed These Presents On the Date Herein
            Before Written :-
          </Text>

          <Text fontWeight={"500"} fontSize="1xl" mt="4">
            A. Employer : -
          </Text>
          <Text fontSize="md">
            Name : Zemex Service <br />
            Email : helplinezxservicewww@gmail.com <br />
            Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
            RAJASTHAN(RJ), INDIA(IN) 302031
          </Text>

          <Text fontWeight={"500"} mt="4" fontSize="1 xl">
            B. Employee : -
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {/* <FormControl w="400px">
              <Text>Name : {inputField.name}</Text>
             
            </FormControl> */}
            <FormControl w="400px">
              <Text fontSize="md"> Email: {inputField.email}</Text>
            </FormControl>
            <FormControl w="400px">
              {/* <Input
            value={date}
            onChange={(e) =>setDate(e.target.value)}
            type="date"
            placeholder="Enter the Date"
            _hover={{ borderColor: "teal.500" }}
          /> */}
              <Text fontSize="md"> Start-Date: {inputField.startdate}</Text>
            </FormControl>

            <Table w="700px" style={{ marginTop: "20px" }}>
              <Tr>
                <Td>
                  <Box onChange={handleSignatureChange}>
                    <Text mb={'10px'}>Signature</Text>
                    {signaturePreview && (
                      <Image
                        src={signaturePreview}
                        alt="Signature Preview"
                        w="25%"
                        // style={{ maxWidth: "100px", marginTop: "10px",}}
                      />
                    )}
                    {console.log(signaturePreview, "signaturePreview")}
                  </Box>
                </Td>
                <Td>
                  <Box
                   ml={"-10rem"} 
                  onChange={handlePhotoChange}>
                    <Text mb={'10px'}>Photo</Text>
                    {photoPreview && (
                      <Image
                        src={photoPreview}
                        alt="Photo Preview"
                        w="20%"
                        // style={{
                        //   maxWidth: "100px",
                        //   marginTop: "10px",
                        // }}
                      />
                    )}
                  </Box>
                </Td>
              </Tr>
            </Table>
          </Box>
        </Box>
        <Flex>
        <Box mt={'1rem'} boxSize="sm">
          <Image src={LeaseAgreement} alt="Stamp" w={["60%" , "40%"]} />
        </Box>
        <Box mr={"4rem"} mt={"1.3bhai rem"} boxSize="sm">
          <Image src={sign} alt="Stamp" w="70%" />
        </Box>
        </Flex>
      </Box>
      <Box>
        <Button
          ml={"2rem"}
          mt={"-30rem"}
          bg={"lightgreen"}
          _hover={{ background: "gray", color: "white" }}
          onClick={() => toPDF()}
        >
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default StampPaperView;
