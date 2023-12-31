import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import "dotenv/config";
import { ChangeEvent, FormEvent, useState } from "react";

import axiosBackend from "@/helper/axiosBackend";

export default function Home() {
  const [link, setLink] = useState("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);
  const [totpSecret, setTotpSecret] = useState<string>(
    process.env.NEXT_PUBLIC_TOTP_SECRET ?? ""
  );

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
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            setError(false);
            setState("submitting");

            // Check if the totpSecret is instance of Base32
            if (!/^[A-Z2-7]+=*$/i.test(totpSecret)) {
              setError(true);
              setState("initial");
              return;
            }
            const axiosResponse = await (
              await axiosBackend(totpSecret)
            ).get("/yt/audio", {
              params: {
                id: link,
              },
              responseType: "blob",
            });

            const aElement = document.createElement("a");
            const blobFile = window.URL.createObjectURL(
              new Blob([axiosResponse.data])
            );
            aElement.href = blobFile;

            const contentDisposition: string =
              axiosResponse.headers["content-disposition"];
            if (contentDisposition) {
              const filename = contentDisposition
                .split(";")[1]
                .trim()
                .split("=");
              // TODO: build a decent filename parser
              // We need a endpoint that returns the filename
              const fileNameTrim = (name: string): string => {
                if (name.startsWith("utf-8")) {
                  name = name.substring(7);
                }
                return name
                  .replace(/"/g, "")
                  .replace(/'/g, "")
                  .replace('"', "");
              };
              aElement.download = fileNameTrim(filename[1]);
              // console.log(filename[1]);
              // console.log(aElement.download);
            } else {
              console.log("content-disposition is undefined");
            }

            // document body 위에 생성한 a태그를 부착 시킨다.
            document.body.appendChild(aElement);

            // 부착 시킨 a태그를 Click!(이벤트 발생 시키기) 그러면 다운로드가 된다.
            aElement.click();
            setTimeout(() => {
              // 이제 더이상 필요 없으니 생성한 a태그를 1초후 삭제 시켜준다.
              aElement.remove();
              setState("success");
            }, 1000);
          }}
        >
          <Input
            variant={"solid"}
            id={"totpSecret"}
            type={"password"}
            aria-label={"totpSecret"}
            placeholder="Enter your password"
            _placeholder={{
              color: "gray.400",
            }}
            borderColor={useColorModeValue("gray.300", "gray.700")}
            borderWidth={1}
            required
            value={totpSecret}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTotpSecret(e.target.value)
            }
            width={"130px"}
          />
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
            : (state === "submitting" && "Downloading...") ||
              (state === "success" && "Downloaded!") ||
              (state === "initial" && "Welcome to YT-Downloader!")}
        </Text>
      </Container>
    </Container>
  );
}
