import { FormEvent, ChangeEvent, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export default function Home() {
  const [link, setLink] = useState("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);

  return (
    <Container minHeight={"80vh"} marginTop={"10vh"}>
      <Container
        bg={useColorModeValue("white", "whiteAlpha.100")}
        border={"1px"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          Enter the link you want to download!
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            setError(false);
            setState("submitting");

            // remove this code and implement your submit logic right here
            setTimeout(() => {
              if (link === "fail@example.com") {
                setError(true);
                setState("initial");
                return;
              }

              setState("success");
            }, 1000);
          }}
        >
          <FormControl>
            <Input
              variant={"solid"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"hyperlink"}
              type={"hyperlink"}
              required
              placeholder={"Video Link"}
              aria-label={"Video Link"}
              value={link}
              disabled={state !== "initial"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLink(e.target.value)
              }
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={state === "success" ? "green" : "blue"}
              isLoading={state === "submitting"}
              w="100%"
              type={state === "success" ? "button" : "submit"}
            >
              {state === "success" ? <CheckIcon /> : "Submit"}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
          margin={"10px"}
        >
          {error
            ? "Oh no an error occured! 😢 Please try again later."
            : "Welcome to Yt-Download"}
        </Text>
      </Container>
    </Container>
  );
}
