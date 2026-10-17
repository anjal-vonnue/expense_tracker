import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExpense } from "@/context/ExpenseContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Spinner } from "./ui/spinner";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  useDocumentTitle("Sign Up | Expense Tracker");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [passError, setPassError] = useState<string | null>("");
  const [confirmPassError, setConfirmPassError] = useState<string | null>(null);

  const { isLoading, register, registerError, setRegisterError } = useExpense();
  const navigate = useNavigate();

  const handleSumbit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const data = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPass: confirmPass.trim(),
    };

    console.log("signup data: ", data);

    if (password.trim()) {
      if (password.trim().length < 8) {
        setPassError("Must be at least 8 characters long.");
        return;
      }
    }

    if (password.trim() !== confirmPass.trim()) {
      setConfirmPassError("password must be equal");
      return;
    }

    try {
      console.log("above register");

      await register(data.name, data.email, data.confirmPass);
      console.log("below register");

      navigate("/");
      console.log("naviage below");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSumbit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setRegisterError(null);
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setRegisterError(null);
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setRegisterError(null);
                  setConfirmPassError(null);
                }}
              />
              <FieldDescription className={passError ? "text-red-500" : ""}>
                {passError ? passError : "Must be at least 8 characters long."}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setRegisterError(null);
                  setConfirmPassError(null);
                }}
              />
              <FieldDescription
                className={confirmPassError ? "text-red-500" : ""}
              >
                {confirmPassError
                  ? confirmPassError
                  : "Please confirm your password."}
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                {registerError && (
                  <p className="text-center pt-5 text-red-500">
                    {registerError}
                  </p>
                )}
                <Button type="submit">
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Spinner />
                      loading...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to={"/login"}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
