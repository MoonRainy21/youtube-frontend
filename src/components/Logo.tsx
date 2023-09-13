import { Text, useColorModeValue } from "@chakra-ui/react";

export default function Logo({ ...props }) {
  return (
    <>
      {/*<Image src={
            useColorModeValue("black_logo.png", "gray_logo.png")
        } alt='logo' width={45} height={50} />*/}
      <Text
        fontFamily={"heading"}
        fontWeight={"extrabold"}
        color={useColorModeValue("gray.800", "white")}
        {...props}
      >
        Yt-Download
      </Text>
    </>
  );
}
