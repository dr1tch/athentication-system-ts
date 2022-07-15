import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Private = React.memo(() => {
  return (
    <Box
      padding={"2rem"}
      justifyContent="center"
      display={"flex"}
      flexDirection="column"
      justifyItems={"center"}
    >
      <Heading fontSize="4xl" mb={4}>
        Private
      </Heading>
      <Heading fontSize="2xl" mb={4}>
        This is the Private page
      </Heading>
    </Box>
  );
});

export default Private;
