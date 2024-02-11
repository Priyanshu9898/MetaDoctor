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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ChevronLeft, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/login");
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
          <CardDescription className="text-center w-full">
            Your New Password must be different from the old passwords.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                          type="password"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                Submit
              </Button>

              <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-500 text-center">
                <Link
                  href="/login"
                  className="text-decoration-line text-black dark:text-gray-200 flex flex-row items-center justify-center"
                >
                  <ChevronLeft className="mr-2" />
                  Back to Login
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
