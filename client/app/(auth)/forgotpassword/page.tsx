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
import { FiMail } from "react-icons/fi";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email.",
    })
    .email({
      message: "Invalid email address.",
    }),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsDialogOpen(true);
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center w-full">
            Enter Your Email and We will send you instructions to reset your
            password.
          </CardDescription>
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

              {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <div className="flex items-center justify-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="lucide lucide-mail-check stroke-current text-pink-500 dark:text-blue-500"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          <path d="m16 19 2 2 4-4" />
                        </svg>
                      </div>
                      <DialogTitle className="text-center font-bold text-2xl">
                        Reset Email sent
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        We have just sent an email with a password reset link to{" "}
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          {form.getValues("email")}
                        </span>
                        . .
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center gap-x-10 mt-4">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          className="space-y-3 p-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none  from-pink-500 to-orange-500  dark:from-blue-500 dark:to-purple-600 bg-gradient-to-br hover:bg-gradient-to-bl dark:bg-gradient-to-br"
                        >
                          Got it
                        </Button>
                      </DialogClose>
                      <Button
                        type="button"
                        variant="secondary"
                        className="space-y-3 p-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none  from-pink-500 to-orange-500  dark:from-blue-500 dark:to-purple-600 bg-gradient-to-br hover:bg-gradient-to-bl dark:bg-gradient-to-br"
                      >
                        Send Again
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

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

export default ForgotPassword;
