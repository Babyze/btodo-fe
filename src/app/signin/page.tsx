"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { ISigninRequest } from "@/services/apis/auth.api";
import {
  AbsoluteCenter,
  Box,
  Container,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SigninPresenter } from "./signin.presenter";
import { SigninSchema } from "@/lib/auth/index.auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  return (
    <Container minHeight="100vh">
      <AbsoluteCenter>
        <Box minW="md">
          <VStack gap="5">
            <Heading textStyle="5xl" fontWeight="bold" color="teal">
              bTodo.
            </Heading>

            <SignInForm />
          </VStack>
        </Box>
      </AbsoluteCenter>
    </Container>
  );
}

function SignInForm() {
  const [isSigning, setIsSigning] = useState(false);
  const [navigateToPage, setNavigateToPage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninRequest>({
    resolver: joiResolver(SigninSchema),
  });

  useEffect(() => {
    if (navigateToPage) {
      router.refresh();
    }
  }, [navigateToPage, router]);

  return (
    <Box width="full" borderWidth="1px" shadow="md" borderRadius="md">
      <form
        onSubmit={handleSubmit(async (payload) => {
          setIsSigning(true);
          const result = await SigninPresenter(payload);
          setNavigateToPage(result);
          setIsSigning(false);
        })}
      >
        <VStack p="5" gap="5">
          <Field
            label="Email"
            fontWeight="bold"
            invalid={!!errors.email}
            errorText="Please enter valid email address"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              variant="outline"
              focusRingColor="teal"
              {...register("email", { required: true })}
            />
          </Field>

          <Field
            label="Password"
            fontWeight="bold"
            invalid={!!errors.password}
            errorText="Please enter password"
          >
            <PasswordInput
              placeholder="******"
              variant="outline"
              focusRingColor="teal"
              {...register("password", { required: true })}
            />
          </Field>

          <Button
            type="submit"
            width="full"
            colorPalette="teal"
            fontWeight="xl"
            loading={isSigning}
            loadingText="Signing..."
          >
            Sign in
          </Button>

          <Text fontWeight="sm">
            Don&apos;t have an account?{" "}
            <Link
              variant="underline"
              href="https://chakra-ui.com"
              colorPalette="teal"
            >
              Sign up
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}
