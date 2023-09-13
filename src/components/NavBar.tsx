import Logo from "@/components/Logo";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(27,32,43,0.8)")}
        px={4}
        style={{ position: "fixed", width: "100%", height: "64px"}}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link href="/">
            <Logo />
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Text
                    fontFamily={"heading"}
                    fontWeight={"extrabold"}
                    color={useColorModeValue("gray.800", "white")}
                  >
                    History
                  </Text>
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <MenuItem>Download History</MenuItem>
                </MenuList>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box h={16} />
    </>
  );
}
