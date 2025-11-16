import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const UserDashBoard = () => {
  const boxColorsSet1 = [" #ffe6ff", "#EBE9EB", "#e6ffe6"];

  const boxContentSet1 = [
    "Entire Assignment",
    "Submitted Assignment",
    "Pending Assignment",
  ];

  return (
    <Flex  alignItems="center" >
      <Flex gap="15%" textAlign="center">
        {boxColorsSet1.map((color, index) => (
          <Box
            key={index}
            backgroundColor={color}
            border="#ebe9eb"
            margin="20px"
            padding="40px"
            fontWeight="800"
            borderRadius="10px"
            width="150px"
            height="150px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <span style={{ marginTop: "5px", marginBottom: "5px", height: "10px", fontSize: "20px", marginRight: "0%" }}>
              100
            </span>
            <p style={{ color: "gray", fontWeight: "600", flexDirection: "row", marginLeft: "0px", textAlign: "center", marginTop: "10px" }}>
              {boxContentSet1[index]}
            </p>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default UserDashBoard;
