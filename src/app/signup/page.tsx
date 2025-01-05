"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { SignupSchema } from "@/lib/auth/index.auth";
import { ROUTES } from "@/routes";
import { ISignupRequest } from "@/services/apis/auth.api";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignupPresenter } from "./signup.presenter";

export default function SignUp() {
  return (
    <Container minHeight="100vh">
      <AbsoluteCenter>
        <Box minW="md">
          <VStack gap="5">
            <Heading textStyle="5xl" fontWeight="bold" color="teal">
              Sign up
            </Heading>

            <SignUpForm />
          </VStack>
        </Box>
      </AbsoluteCenter>
    </Container>
  );
}

function SignUpForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [navigateToPage, setNavigateToPage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupRequest>({
    resolver: joiResolver(SignupSchema),
  });

  useEffect(() => {
    if (navigateToPage) {
      router.push(navigateToPage);
    }
  }, [navigateToPage, router]);

  return (
    <Box width="full" borderWidth="1px" shadow="md" borderRadius="md">
      <form
        onSubmit={handleSubmit(async (payload) => {
          setIsSignup(true);
          const result = await SignupPresenter(payload);
          setNavigateToPage(result);
          setIsSignup(false);
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
            loading={isSignup}
            loadingText="Signing up..."
          >
            Sign up
          </Button>

          <Text fontWeight="sm">
            Have an account?{" "}
            <Link variant="underline" href={ROUTES.HOME} colorPalette="teal">
              Sign in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}
