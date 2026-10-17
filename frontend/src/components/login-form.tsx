import { cn } from "cn";

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
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { Spinner } from "./ui/spinner";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  useDocumentTitle("Login | Expense Tracker");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { isLoading, error, setErrorFn, login } = useExpense();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    console.log("loginData: ", data);

    try {
      await login(data.email, data.password);
      navigate("/");
      console.log("naviage below");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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
                    setErrorFn(null);
                  }}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorFn(null);
                  }}
                />
              </Field>
              <Field>
                {error && (
                  <p className="text-center pt-5 text-red-500">{error}</p>
                )}

                <Button type="submit">
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Spinner />
                      loading...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to={"/signup"}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
