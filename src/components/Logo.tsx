import { Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

export default function Logo() {
  return (
    <>
      {/*<Image src={
            useColorModeValue("black_logo.png", "gray_logo.png")
        } alt='logo' width={45} height={50} />*/}
      <Text
        fontFamily={"heading"}
        fontWeight={"extrabold"}
        color={useColorModeValue("gray.800", "white")}
      >
        Yt-Download
      </Text>
    </>
  );
}
