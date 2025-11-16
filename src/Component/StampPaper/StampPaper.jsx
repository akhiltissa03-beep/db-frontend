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
  useToast,
} from "@chakra-ui/react";
// import image from "./SVG STAM.svg";
import image from "../../Images/SVG STAM.svg";
import notri from "../../Images/notriimage.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const StampPaper = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

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


  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  // Get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0]; // Format: YYYY-MM-DD


  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // formData.append("name", name);
      // formData.append("address", address);
      formData.append("email", email);
      formData.append("signature", signature);
      formData.append("photo", photo);
      formData.append("startdate", date);

      const config = {
        method: "post",
        url: `${apiUrl}/user/add_terms`,
        data: formData,
      };

      const response = await axios(config);
      console.log(response, "resp");
      toast({
        position: "top",
        title: "Form Submitted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // navigate("/stampPapersubmission");
    } catch (err) {
      alert("Complete all the feild");
    }
  };

  return (
    <>
      <Box m={["1rem", "7rem"]}>
        {/* <Box textAlign="center">
          <Image
            mx="auto" // Center the image horizontally
            boxSize={{ base: "100%" }}
            objectFit="contain"
            src={image}
            alt="Description of the image"
            mb={{ base: "2", lg: "0" }}
          />

          <Heading as="h2" mb={{ base: "2", lg: "4" }}>
            Legal Employment Contract 2023
          </Heading>

          <Text>
            THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
            Eleven Months From 2023-11-30 BETWEEN:
          </Text>

          <Text fontSize={"1.5rem"}>
            <strong>Alphabet Services of </strong>
          </Text>
          <Text>
            KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN (RJ),
            INDIA(IN), 302031 of
          </Text>

          <Text fontSize={"1.5rem"}>
            <strong>(The "Employer")</strong>
          </Text>

          <Text ml={{ base: "0", lg: "40em" }}>OF THE FIRST PARTY </Text>

          <Text>-AND-</Text>
          <Text>
            S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
            <strong>(The "Employee")</strong>
          </Text>
          <Text ml={{ base: "0", lg: "43em" }}>OF THE SECOND PARTY</Text>
        </Box> */}
        <Box display="flex" flexDirection="column" textAlign="center">
          <Box
            mx="auto"
            boxSize={{ base: "100%" }}
            display={"flex"}
            justifyContent={"center"}
            objectFit="contain"
            mb={{ base: "2", lg: "0" }}
          >
            <Image src={image} alt="Description of the image" />
          </Box>
        </Box>
      
         <Box display="flex" justifyContent="space-evenly">
      <Box  mb={{ base: "2", lg: "0" }}>
        <Image
          w={{ base: '100%', lg: '150px' }}
          h={{ base: 'auto', lg: '350px' }}
          src={notri} alt="Dan Abramov"
        />
      </Box>
      <Box textAlign="center">
        <Heading as="h2" mb={{ base: "2", lg: "4" }}>
          Legal Employment Contract {new Date().getFullYear()}
        </Heading>

        <Text>
          THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
          Eleven Months From {new Date(new Date().setMonth(new Date().getMonth() + 11)).toISOString().split("T")[0]}{" "} BETWEEN:
        </Text>

        <Text fontSize={"1.5rem"}>
          <strong>Alphabet Services of </strong>
        </Text>
        <Text>
          KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN (RJ),
          INDIA(IN), 302031 of
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
    </Box>

        <Box>
          <Heading as="h3" mb={4}>
            Background
          </Heading>
          <Text>
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
          <Text>
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
          <Heading as="h3" mb={4}>
            <br />
            Commencement Date and Term
          </Heading>
          <Text>
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
          <Heading as="h3" mb={4}>
            <br />
            1. Job Title and Description
          </Heading>
          <Text>
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
          <Heading as="h3" mb={4}>
            <br />
            2. Employee Remuneration
          </Heading>
          <Text>
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
          <Heading as="h3" mb={4}>
            3. Conflict of Interest
          </Heading>
          <Text>
            3.1. Application Fee(s): The Registration Amount Of 5400/- INR. Will
            Be Deducted From The Salary If Generated, And If The Salary Is Not
            Generated i.e If The Employee Fails To Complete The Work, Then
            <br />
            <br />
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
          <Heading as="h3" mb={4}>
            <br />
            4. Termination of Employment
          </Heading>
          <Text>
            4.1. Termination: - If Employee Fails To Submit Data On Time Or, If
            Employee Fails To Give Accuracy In Output Files.
            <br />
            Client Reserves The Right To Terminate The Agreement With Immediate
            Effect. And Alphabet Servicess Will Not Be Responsible For Any Further
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
          <Heading as="h3" mb={4}>
            5. Non-Solicitation
          </Heading>
          <Text>
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
          <Heading as="h3" mb={4}>
            6. Confidential Information
          </Heading>
          <Text>
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
          <Heading as="h3" mb={4}>
            7. Severability
          </Heading>
          <Text>
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
            The Presiding Arbitrator. The Venue Of Arbitration Shall Be Nashik
            (Maharashtra). The Courts In The City Of Rajkot Shall Have Exclusive
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
          <Text fontSize={"1.3rem"} fontWeight="bold">
            IN WITNESS WHEREOF
          </Text>
          <Text>
            The Parties Hereto Have Executed These Presents On the Date Herein
            Before Written :-
          </Text>

          <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
            A. Employer : -
          </Text>
          <Text>
            Name : Alphabet Services <br />
            Email : helplinezxservicewww@gmail.com <br />
            Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
            RAJASTHAN(RJ), INDIA(IN) 302031
          </Text>

          <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
            B. Employee : -
          </Text>
        </Box>
         <FormControl w={["350px", "400px"]}>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email "
            _hover={{ borderColor: "teal.500" }}
          />
        </FormControl>
        <FormControl w={["350px", "400px"]}>
          <FormLabel>Start-Date</FormLabel>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="Enter the Date"
            min={todayFormatted}
            max={tomorrowFormatted}
            _hover={{ borderColor: "teal.500" }}
          
          />
          {/* <Select width={{base:"300px" , md:"400px"}}>
        <option value="">Today</option>
        <option value="option2">Tomorrow</option>
      </Select> */}
        </FormControl>

        {/* <FormControl>
      <FormLabel>Date</FormLabel>
      <Select width={{base:"300px" , md:"400px"}}>
        <option value="">Today</option>
        <option value="option2">Tomorrow</option>
      </Select>
    </FormControl> */}

        {/* Upload Signature and Photo Section */}
        <Table w={["300px", "700px"]} style={{ marginTop: "20px" }}>
          <Tr>
            <Td>Upload Signature</Td>
            {/* <Td>
              <Input
                onChange={(e) => setSignature(e.target.files[0])}
                type="file"
              />
            </Td> */}
            <Td>
              <Input onChange={handleSignatureChange} type="file" />
              {signaturePreview && (
                <Image
                  width={"4rem"}
                  height={"4rem"}
                  src={signaturePreview}
                  alt="Signature Preview"
                />
              )}
            </Td>
          </Tr>
          <Tr>
            <Td>Upload Your Photo</Td>
            {/* <Td>
              <Input
                onChange={(e) => setPhoto(e.target.files[0])}
                type="file"
              />
            </Td> */}
            <Td>
              <Input onChange={handlePhotoChange} type="file" />
              {photoPreview && (
                <Image
                  width={"4rem"}
                  height={"4rem"}
                  src={photoPreview}
                  alt="Photo Preview"
                />
              )}
            </Td>
          </Tr>
        </Table>
        <Button
          onClick={handleSubmit}
          mt={"1rem"}
          ml={"1.6rem"}
          bg={"#DD372D"}
          _hover={{ background: "gray", color: "white" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default StampPaper;


// import {
//   Box,
//   Heading,
//   Text,
//   Image,
//   Table,
//   Tr,
//   Td,
//   Input,
//   Button,
//   FormControl,
//   FormLabel,
//   useToast,
// } from "@chakra-ui/react";
// // import image from "./SVG STAM.svg";
// // import image from "../../Images/SVG STAM.svg";
// import image from "../Images/SVG STAM.svg";
// import notri from "../Images/notriimage.svg";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StampPaper = () => {

//   const apiUrl =import.meta.env.VITE_APP_API_URL;
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [signature, setSignature] = useState(null);
//   const toast = useToast();
//   const navigate = useNavigate();
//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("address", address);
//       formData.append("email", email);
//       formData.append("signature", signature);
//       formData.append("photo", photo);

//       const config = {
//         method: "post",
//         url:  `${apiUrl}/user/add_terms`,
//         data: formData,
//       };

//       const response = await axios(config);
//       console.log(response, "resp");
//       toast({
//         title: 'Form Submitted Successfully',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//       navigate("/stamppaersubmission");
      
//     } catch (err) {
//       console.log("err in fetching", err);
//     }
//   };

//   return (
//     <>
//       <Box m={["1rem", "7rem"]}>
//         {/* <Box textAlign="center">
//           <Image
//             mx="auto" // Center the image horizontally
//             boxSize={{ base: "100%" }}
//             objectFit="contain"
//             src={image}
//             alt="Description of the image"
//             mb={{ base: "2", lg: "0" }}
//           />
//            <Box boxSize="sm">
//           <Image src={notri} alt="Dan Abramov" />
//         </Box>

//           <Heading as="h2" mb={{ base: "2", lg: "4" }}>
//             Legal Employment Contract 2023
//           </Heading>

//           <Text>
//             THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
//             Eleven Months From 2023-11-30 BETWEEN:
//           </Text>

//           <Text fontSize={"1.5rem"}>
//             <strong>Alphabet Services of </strong>
//           </Text>
//           <Text>
//             KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN (RJ),
//             INDIA(IN), 302031 of
//           </Text>

//           <Text fontSize={"1.5rem"}>
//             <strong>(The "Employer")</strong>
//           </Text>

//           <Text ml={{ base: "0", lg: "40em" }}>OF THE FIRST PARTY </Text>

//           <Text>-AND-</Text>
//           <Text>
//             S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
//             <strong>(The "Employee")</strong>
//           </Text>
//           <Text ml={{ base: "0", lg: "43em" }}>OF THE SECOND PARTY</Text>
//         </Box> */}
//         <Box display="flex" flexDirection="column" textAlign="center">
//           <Box
//             mx="auto"
//             boxSize={{ base: "100%" }}
//             objectFit="contain"
//             mb={{ base: "2", lg: "0" }}
//           >
//             <Image src={image} alt="Description of the image" />
//           </Box>
//         </Box>
      
//          <Box display="flex" justifyContent="space-evenly">
//       <Box  mb={{ base: "2", lg: "0" }}>
//         <Image
//           w={{ base: '100%', lg: '150px' }}
//           h={{ base: 'auto', lg: '350px' }}
//           src={notri} alt="Dan Abramov"
//         />
//       </Box>
//       <Box textAlign="center">
//         <Heading as="h2" mb={{ base: "2", lg: "4" }}>
//           Legal Employment Contract 2023
//         </Heading>

//         <Text>
//           THIS DIGITAL EMPLOYMENT CONTRACT (this "Agreement") Valid Till
//           Eleven Months From 2023-11-30 BETWEEN:
//         </Text>

//         <Text fontSize={"1.5rem"}>
//           <strong>Alphabet Services of </strong>
//         </Text>
//         <Text>
//           KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR, RAJASTHAN (RJ),
//           INDIA(IN), 302031 of
//         </Text>

//         <Text fontSize={"1.5rem"}>
//           <strong>(The "Employer")</strong>
//         </Text>

//         <Text ml={{ base: "0", lg: "10%" }}>OF THE FIRST PARTY </Text>

//         <Text>-AND-</Text>
//         <Text>
//           S/O &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;... &nbsp;...
//           <strong>(The "Employee")</strong>
//         </Text>
//         <Text ml={{ base: "0", lg: "10%" }}>OF THE SECOND PARTY</Text>
//       </Box>
//     </Box>

//         <Box>
//           <Heading as="h3" mb={4}>
//             Background
//           </Heading>
//           <Text>
//             A. The Employer Is Of The Opinion That The Employee Has The
//             Necessary Qualifications, Experience, And Abilities To Assist And
//             Benefit The Employer In Requisiting Skills And Infrastructure For
//             Successful Execution Of Form Filling Projects.
//             <br />
//             <br />
//             B. The Employer Desires To Employ The Employee, And The Employee Has
//             Agreed To Accept And Enter Such Employment Upon The Terms And
//             Conditions Set Out In This Agreement.
//             {/* ... (rest of the Background section) */}
//           </Text>
//           <Text>
//             <br />
//             Presently It Is In A Position To Procure The Business For Form
//             Filling More Meaningfully Described In The Column Scope Of Work,
//             Through Their Principals. The Current Project Is Carried Out Under
//             The Cost Of Client And Not An Assignment As Such Acquired By
//             Employee. and where as The Employee Is Engaged Inter Alias, In The
//             Business Of Providing A Wide Spectrum Of Software Solutions &
//             Services.
//             <br />
//             <br />
//             IN CONSIDERATION OF The Matters Described Above and of The Mutual
//             Benefits and Obligations Set Forth In This Agreement, The Receipt
//             And Sufficiency of Which Consideration Is Hereby Acknowledged, The
//             Parties To This Agreement Agree As Follows:
//           </Text>
//         </Box>

//         {/* Commencement Date and Term Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             <br />
//             Commencement Date and Term
//           </Heading>
//           <Text>
//             Scope Of Work: The Employee Will Commence Employment With The
//             Employer On 2023-11-30 (the "Commencement Date") Extending Till
//             2023-12-04 (End Of "Term Date").
//             <br />
//             <br />
//             Subject To The Probationary Period And Subject To Termination As
//             Provided In This Agreement, The Employee Is Required To Feed The
//             Provided Data In The Provided Portal As Per The Guidelines Within 5
//             Days From The Date Of Commencement. The Parties Acknowledge That
//             Various Provisions Of This Agreement Survive Past Termination Of
//             Employment.
//           </Text>
//         </Box>

//         {/* Job Title and Description Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             <br />
//             1. Job Title and Description
//           </Heading>
//           <Text>
//             1.1. The Initial Job Duties The Employee Will Be Expected To Perform
//             Will Be Consisted Of Filling Of The Forms (Data Entry) As Per The
//             Information And Data Given The Online Portal.
//             <br />
//             <br />
//             1.2. The Employee Agrees To Be Employed On The Terms And Conditions
//             Set Out In This Agreement. The Employee Agrees To Be Subject To The
//             General Supervision Of And Act Pursuant To The Orders, Advice, And
//             Direction Of The Employer.
//             <br /> <br />
//             1.3.The Employee Will Perform Any And All Duties As Requested By The
//             Employer That Are Reasonable And That Are Customarily Performed By A
//             Person Holding A Similar Position In The Industry Or Business Of The
//             Employer.
//             <br />
//             <br />
//             1.4.The Employer May Make Changes To The Job Title Or Duties Of The
//             Employee Where The Changes Would Be Considered Reasonable For A
//             Similar Position In The Industry Or Business Of The Employer.
//             <br />
//             <br />
//             1.5.The Employee Agrees To Abide By The Employers Rules,
//             Regulations, Policies And Practices, Including Those Concerning Work
//             Schedules, Annual Leave And Sick Leave, As They May From Time To
//             Time Be Adopted Or Modified.
//             <br />
//             {/* ... (rest of the Job Title and Description section) */}
//           </Text>
//         </Box>

//         {/* Employee Remuneration Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             <br />
//             2. Employee Remuneration
//           </Heading>
//           <Text>
//             2.1. Remuneration: - For The Form Filling Services Rendered By The
//             Employee, The Employee Shall Be Entitled For Payment Of Price 40Rs.
//             (INR) Max Per Form For The Salary May Vary From 20800/- INR To
//             20130/- INR Depends Upon The Accuracy.
//             <br /> <br />
//             2.2.Billing :- Employer Will Provide Workload Of 520 FORMS Which The
//             Employee Shall Complete The Work Within 5 DAYS Under The Given
//             Criteria Of This Agreement. This Agreement Has Been Signed For One
//             System. The Employer Will Make The Payment For The Billing Within 3
//             INTERNATIONAL WORKING Days From Date Of Raising The Project Subject
//             To The Quality Check Report.
//             <br />
//             <br />
//             2.3.Accuracy :- Employer Will Provide Adequate Feedback Within 15
//             Working Days For All Data And On Completion Of Quality Check Shall
//             Issue A Quality Report. Both Parties Agree To Assure Highest Quality
//             Of End Service. Following Cycle For Accuracy Will Be Followed. Cut
//             Off Forms - 468/520 (In Total) - Above 90% @ 40/- INR Per Form. If
//             Below Cut Off Or ID Is Terminated Then The Employee Is Supposed To
//             Clear Registration Amount.
//             <br /> <br />
//             The Q.C. Department Will Check The Forms Randomly. Until The
//             Submitted Slot Is Rejected Above The Cut-Off Criteria If Employee
//             Makes Any Mistake, (Which Includes But Not Limited To Spelling,
//             Punctuation, Extra/Missing Space, Extra/Missing Word, Extra/Missing
//             Line Etc.) In A Form That Form Will Be Rejected, Likewise Employee
//             Have To Maintain Cut Off Or Accuracy.
//             <br />
//             <br />
//             If All The Forms Are Submitted Or In Submit Mode, Then Only The Q.C.
//             Report Will Be Generated Else Not. If Forms Are In Save Mode Then
//             Q.C. Report Will Not Be Generated And That Thing Will Be Considered
//             As Incomplete Submission Only.
//             <br />
//             <br />
//             You Can Save The Forms, Saved Forms Are Editable/Changeable For 48
//             Hours Only, Then After All Those Forms Will Automatically Submitted
//             And Becomes Non-Editable.
//             <br />
//             <br />
//             To Generate The Q.C. Report, All The Forms Should Be Submitted. If
//             All The Forms Are Not Submitted Then It Will Be Considered As
//             Incomplete Submission Only.
//             <br />
//             <br />
//             <br />
//             {/* ... (rest of the Employee Remuneration section) */}
//           </Text>
//         </Box>

//         {/* Conflict of Interest Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             3. Conflict of Interest
//           </Heading>
//           <Text>
//             3.1. Application Fee(s): The Registration Amount Of 5400/- INR. Will
//             Be Deducted From The Salary If Generated, And If The Salary Is Not
//             Generated i.e If The Employee Fails To Complete The Work, Then
//             <br />
//             <br />
//             He/She Is Liable Pay The Same Registration Amount On Their Own. The
//             Employee Must Start & Complete His/her Work Of Form-Filling Assigned
//             To Them By The Employer From The Date Of Starting The Project
//             (Selected By The Employee As Per His/her Own Convenience). In Case
//             Of Failure In Starting Of The Work From Employee's End Or "0" Number
//             Of Forms Detected Or Incomplete Submission Of Work Is Defined By The
//             Employer Then Application Fee(s) + NOC Invoice Needs To Be Cleared
//             By The Employee. <br /> <br />
//             As The Employer Will Have To Face The Economic Crisis In The
//             Business In Case Of Failure Of This Project In Any Of The Criteria
//             As Per This Agreement. <br /> <br />
//             The Employee Understands And Agrees That Any Attempt On The Part Of
//             The Employee To Induce Other Employees Or Contractors To Leave The
//             Employers Employ, Or Any Effort By The Employee To Interfere With
//             The Employers Relationship With Its Other Employees And Contractors
//             Would Be Harmful And Damaging To The Employer.
//             <br /> <br />
//             During The Term Of The Employees Active Employment With The
//             Employer, The Employee Will Not, Directly Or Indirectly, Engage Or
//             Participate In Any Other Business Activities That The Employer, In
//             Its Reasonable Discretion, Determines To Be In Conflict With The
//             Best Interests Of The Employer Without The Written Consent Of The
//             Employer.
//             <br /> <br />
//             3.2.ID Allocation :- Employee Will Get A Single ID To Work On And
//             Employee Can Work 24X7 On This ID. If The Software Portal Or The
//             Server Of The Company Detects That There Are Multiple Login
//             Attempts/Multiple IP Addresses Login Of The User Account Or I.D, The
//             Company Will Not Be Responsible For The Corruption Of The Data In
//             Both Online And Offline Modules. And The Employee€™s I.D. Will Get
//             Terminated Without Any Intimation And The Employee Needs To Clear
//             The Server Maintenance Charge Up to 7999/- INR.(Refundable Amount)
//             For That Particular Project As Per This Agreement.
//             <br /> <br />
//             3.3.TAT (Turn Around Time): The Second Party Has 5 Days(Including
//             Holidays) To Complete The New Work And Second Party Has To Send It
//             To First Party. The First Party Shall Give An Accuracy Report Within
//             2-3 Working Days For The New Work, After Submissions As Per
//             Technical Specifications Which Are Included In This Agreement With
//             Accuracy Parameters.
//             <br /> <br />
//             3.4.Employer Agrees To Provide Formats And Other Information For
//             Processing The Job To Employee At The Time Of Providing The Data And
//             The Employee Agrees With The Format And Other Information Which Is
//             Being Processed To The Particular. <br /> <br />
//             3.5.Employee Will Execute The Data Processing Work Provided By
//             Employer Through Experienced Persons In Such Manner So As To Carry
//             Out The Work Efficiently At Minimum Of 90% Accuracy For Out Files.
//             <br /> <br />
//             3.6.This Agreement Represents The Business Agreement And Operational
//             Understandings Between The Parties And Shall Remain In Effect For A
//             Period Of Eleven Months From The Date Of Execution Hereof. The
//             Employers Specifications In Terms Of Quality And Other Parameters
//             That Shall Be Issued By TheEmployer/Their Principals From Time To
//             Time And Acknowledged By The Employer Shall Be Read With This
//             Agreement. <br /> <br />
//             Employer/Their Principals From Time To Time And Acknowledged By The
//             Employer Shall Be Read With This Agreement.
//             {/* ... (rest of the Conflict of Interest section) */}
//           </Text>
//         </Box>

//         {/* Termination of Employment Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             <br />
//             4. Termination of Employment
//           </Heading>
//           <Text>
//             4.1. Termination: - If Employee Fails To Submit Data On Time Or, If
//             Employee Fails To Give Accuracy In Output Files.
//             <br />
//             Client Reserves The Right To Terminate The Agreement With Immediate
//             Effect. And Alphabet Servicess Will Not Be Responsible For Any Further
//             Data And Payment To The Employee. And Employee Will Be Liable To Pay
//             The Maintenance Amount To The Client As Mentioned In Clause-4 In
//             This Agreement And Employee Will Also Be Liable To Pay Expenses Of
//             The Employer For Legal Proceedings. Where There Is Just Cause For
//             Termination, The Employer May Terminate The Employee Employment
//             Without Notice, As Permitted By Law.
//             <br /> <br />
//             4.2.No Modification Of The Terms Of This AGREEMENT Shall Be Valid
//             Unless It Is In Writing And Signed By Both The Parties.
//             <br />
//             4.3.Force Majeure: If The Rendition Of The Form Filling Services Is
//             Hampered Due To Earthquake, Flood, Tempest, Civil Riots Or Act Of
//             God Then The Business Associate Shall Be Absolved Of Its Obligations
//             Hereunder Till Normalcy Is Restored After The Cessation Of The
//             Aforementioned Contingencies. The Employee Shall Likewise Be
//             Absolved If Rendition Of The Services Is Hampered Due To A Strike
//             Called By The Data Entry Operators Engaged By The Employee, Violence
//             Or Political Turbulence Or For Any Other Reason Of A Similar Nature,
//             Which Is Beyond The Control Of The Employee.
//             <br /> <br />
//             {/* ... (rest of the Termination of Employment section) */}
//           </Text>
//         </Box>

//         {/* Non-Solicitation Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             5. Non-Solicitation
//           </Heading>
//           <Text>
//             5.1. The Employee Understands And Agrees That Any Attempt On The
//             Part Of The Employee To Induce Other Employees Or Contractors To
//             Leave The Employers Employ Would Be Harmful And Damaging To The
//             Employer.
//             <br />
//             <br />
//             5.2.The Employee Will Not In Any Way, Directly Or Indirectly :-{" "}
//             <br />
//             <br />
//             <Text ml={"1rem"}>
//               5.2.1.Induce Or Attempt To Induce Any Employee Or Contractor Of
//               The Employer To Quit Employment O Retainer With The Employer.{" "}
//               <br /> <br />
//               5.2.2.Discuss Employment Opportunities Or Provide Information
//               About Competitive Employment To Any O The Employers Employees Or
//               Contractors.
//             </Text>
//             <br />
//             This Non-solicitation Obligation As Described In This Section Will
//             Be Limited To Employees Or Contractors Who Were Employees Or
//             Contractors Of The Employer During The Period That The Employee Was
//             Employed By The Employer.
//             <br /> <br />
//             {/* ... (rest of the Non-Solicitation section) */}
//           </Text>
//         </Box>

//         {/* Confidential Information Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             6. Confidential Information
//           </Heading>
//           <Text>
//             6.1. The Employee Acknowledges That, In Any Position The Employee
//             May Hold, In And As A Result Of The Employees Employment By The
//             Employer, The Employee Will, Or May, Be Making Use Of, Acquiring Or
//             Adding To Information Which Is Confidential To The Employer (the
//             "Confidential Information").
//             <br />
//             <br />
//             6.2.The Employee Agrees And Acknowledges That The Confidential
//             Information Is Of A Proprietary And Confidential Nature And That Any
//             Disclosure Of The Confidential Information To A Third Party In
//             Breach Of This Agreement Cannot Be Reasonably Or Adequately
//             Compensated For In Money Damages, Would Cause Irreparable Injury To
//             Employer, Would Gravely Affect The Effective And Successful Conduct
//             Of The Employers Business And Goodwill, And Would Be A Material
//             Breach Of This Agreement.
//             <br /> <br />
//             {/* ... (rest of the Confidential Information section) */}
//           </Text>
//         </Box>

//         {/* Severability Section */}
//         <Box>
//           <Heading as="h3" mb={4}>
//             7. Severability
//           </Heading>
//           <Text>
//             7.1.The Employer And The Employee Acknowledge That This Agreement Is
//             Reasonable, Valid And Enforceable. However, If Any Term, Covenant,
//             Condition Or Provision Of This Agreement Is Held By A Court Of
//             Competent Jurisdiction To Be Invalid, Void Or Unenforceable, It Is
//             The Parties Intent That Such Provision Be Changed In Scope By The
//             Court Only To The Extent Deemed Necessary By That Court To Render
//             The Provision Reasonable And Enforceable And The Remainder Of The
//             Provisions Of This Agreement Will In No Way Be Affected, Impaired Or
//             Invalidated As A Result.
//             <br />
//             <br />
//             7.2.Variation: Except As Otherwise Expressly Provided In This
//             Agreement, This Agreement May Not Be Changed Or Modified In Any Way
//             After It Has Been Signed, Except In Writing Signed By Or On Behalf
//             Of Both Of The Parties.
//             <br /> <br />
//             7.3.Dispute Resolution & Jurisdiction: In The Event Of Any Dispute
//             Or Difference Arising Between The Parties Hereto Relating To Or
//             Arising Out Of This Agreement, Including The Implementation,
//             Execution, Interpretation, Rectification, Validity, Enforceability,
//             Termination Or Rescission Thereof, Including The Rights, Obligations
//             Or Liabilities Of The Parties Hereto, The Same Will Be Adjudicated
//             And Determined By Arbitration. The Indian Arbitration & Conciliation
//             Act, 1996 Or Any Statutory Amendment Or Re-enactment Thereof In
//             Force In India, Shall Govern The Reference. Both Parties Shall
//             Appoint Their Respective Arbitrator, And Both Arbitrators Thus
//             Appointed Should Appoint The Third Arbitrator Who Shall Function As
//             The Presiding Arbitrator. The Venue Of Arbitration Shall Be Nashik
//             (Maharashtra). The Courts In The City Of Rajkot Shall Have Exclusive
//             Jurisdiction To Entertain Try And Determine The Same
//             <br /> <br />
//             7.4.Both The Parties Hereby Agree Neither To Circumvent Or Nor To
//             Disclose The Identities, Information As Well As The Essence Of The
//             Project Etc. Of Each Others/Principles, Clients Etc. To Any Other
//             Third Party And Neither Of Us Will Approach Each Contracts Of Each
//             Other As Identified From Time To Time.
//             <br />
//             <br />
//             {/* ... (rest of the Severability section) */}
//           </Text>
//         </Box>
//         <Box>
//           <Text fontSize={"1.3rem"} fontWeight="bold">
//             IN WITNESS WHEREOF
//           </Text>
//           <Text>
//             The Parties Hereto Have Executed These Presents On the Date Herein
//             Before Written :-
//           </Text>

//           <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
//             A. Employer : -
//           </Text>
//           <Text>
//             Name : Alphabet Services <br />
//             Email : helplinezxservicewww@gmail.com <br />
//             Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
//             RAJASTHAN(RJ), INDIA(IN) 302031
//           </Text>

//           <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
//             B. Employee : -
//           </Text>
//         </Box>
//         <FormControl w={["350px", "400px"]}>
//           <FormLabel>Name</FormLabel>
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Enter Name"
//             _hover={{ borderColor: "teal.500" }}
//           />
//         </FormControl>
//         <FormControl w={["350px", "400px"]}>
//           <FormLabel>Email</FormLabel>
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Enter Your Email "
//             _hover={{ borderColor: "teal.500" }}
//           />
//         </FormControl>
//         <FormControl w={["350px", "400px"]}>
//           <FormLabel>Address</FormLabel>
//           <Input
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             type="text"
//             placeholder="Enter your Address"
//             _hover={{ borderColor: "teal.500" }}
//           />
//         </FormControl>

//         {/* Upload Signature and Photo Section */}
//         <Table w={["300px", "700px"]} style={{ marginTop: "20px" }}>
//           <Tr>
//             <Td>Upload Signature</Td>
//             <Td>
//               <Input
//                 onChange={(e) => setSignature(e.target.files[0])}
//                 type="file"
//               />
//             </Td>
//           </Tr>
//           <Tr>
//             <Td>Upload Your Photo</Td>
//             <Td>
//               <Input
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 type="file"
//               />
//             </Td>
//           </Tr>
//         </Table>
//         <Button
//           onClick={handleSubmit}
//           mt={"1rem"}
//           ml={"1.6rem"}
//           bg={"#DD372D"}
//           _hover={{ background: "gray", color: "white" }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </>
//   );
// };

// export default StampPaper;



