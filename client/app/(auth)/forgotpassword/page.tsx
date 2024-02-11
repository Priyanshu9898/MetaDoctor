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
import { RegisterType } from "@/constants/Auth";
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
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your Name.",
  }),
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
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format.",
    }),
});

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Register to Railway Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Name</Label>
                    <FormControl>
                      <div className="relative">
                        <FiUser className="absolute left-2 top-[50%] transform -translate-y-[50%]" />
                        <Input
                          placeholder="Enter Your Full Name"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <div className="relative">
                        <FiMail className="absolute left-2 top-[50%] transform -translate-y-[50%]" />
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label>Phone Number</Label>
                    <FormControl>
                      <div className="relative">
                        <FiPhone className="absolute left-2 top-[50%] transform -translate-y-[50%]" />
                        <Input
                          placeholder="+1234567890"
                          {...field}
                          className="pl-10"
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
                        <FiLock className="absolute left-2 top-[50%] transform -translate-y-[50%]" />
                        <Input
                          placeholder="Enter Your Password"
                          type={passwordShown ? "text" : "password"}
                          {...field}
                          className="pl-10"
                        />
                        <div
                          className="absolute right-2 top-[50%] transform -translate-y-[50%] cursor-pointer"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm Password</Label>
                    <FormControl>
                      <div className="relative">
                        <FiLock className="absolute left-2 top-[50%] transform -translate-y-[50%]" />
                        <Input
                          placeholder="Enter Your Password Again"
                          type={confirmPasswordShown ? "text" : "password"}
                          {...field}
                          className="pl-10"
                        />
                        <div
                          className="absolute right-2 top-[50%] transform -translate-y-[50%] cursor-pointer"
                          onClick={() =>
                            setConfirmPasswordShown(!confirmPasswordShown)
                          }
                        >
                          {confirmPasswordShown ? <FiEyeOff /> : <FiEye />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                className="w-full p-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none  from-pink-500 to-orange-500  dark:from-blue-500 dark:to-purple-600 bg-gradient-to-br hover:bg-gradient-to-bl dark:bg-gradient-to-br"
              >
                {loading && (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  </>
                )}
                Register
              </Button>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-500 text-center">
                Already Have an Account??{" "}
                <Link
                  href="/login"
                  className="text-decoration-line text-black dark:text-gray-200"
                >
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterPage;
