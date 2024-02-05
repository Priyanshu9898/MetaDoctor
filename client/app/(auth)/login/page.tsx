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
});

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
                      <Input placeholder="example@domain.com" {...field} />
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
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                className="p-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none  from-pink-500 to-orange-500  dark:from-blue-500 dark:to-purple-600 bg-gradient-to-br hover:bg-gradient-to-bl dark:bg-gradient-to-br"
              >
                {loading && (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  </>
                )}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-start justify-center">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-500">
            Don't Have an Account??{" "}
            <Link
              href="/register"
              className="text-decoration-line text-black dark:text-gray-200"
            >
              SignUp
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
