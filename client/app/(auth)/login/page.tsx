"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginType } from "@/constants/Auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email.",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev: LoginType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login to Meta Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <div className="relative">
                        <FiMail className="absolute left-2 top-[12px]" />
                        <Input
                          placeholder="example@domain.com"
                          {...field}
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <div className="relative">
                        <FiLock className="absolute left-2 top-[10px]" />
                        <Input
                          placeholder="Enter your password"
                          type={passwordShown ? "text" : "password"}
                          {...field}
                          className="pl-8"
                        />
                        <div
                          className="absolute right-2 top-[12px] cursor-pointer"
                          onClick={() => setPasswordShown(!passwordShown)}
                        >
                          {passwordShown ? <FiEyeOff /> : <FiEye />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center">
                <div className="flex flex-row justify-center items-start">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Label htmlFor="rememberMe" className="ml-2">
                    Remember Me
                  </Label>
                </div>

                <Link
                  href="/forgotpassword"
                  className="text-decoration-line text-black dark:text-gray-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full space-y-3 p-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none  from-pink-500 to-orange-500  dark:from-blue-500 dark:to-purple-600 bg-gradient-to-br hover:bg-gradient-to-bl dark:bg-gradient-to-br"
              >
                {loading && (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  </>
                )}
                Login
              </Button>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-500 text-center">
                Don't Have an Account??{" "}
                <Link
                  href="/register"
                  className="text-decoration-line text-black dark:text-gray-200"
                >
                  SignUp
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
