"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupGoogle } from "@/lib/auth";
import React from "react";
import { CiLogin } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";

function LogIn({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { toast } = useToast();
  async function onSubmit() {
    try {
      await signupGoogle(
        searchParams?.code ? (searchParams.code as string) : null
      );
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }
  return (
    <div className="w-full h-full p-2 flex flex-col bg-white/80 justify-center items-center">
      <Card className="min-w-80">
        <CardHeader>
          <CiLogin className="w-10 h-10 mb-2" />
          <CardTitle>Welcome to Taskraise</CardTitle>
          <CardDescription>Please sign in or sign up below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"fancy"} onClick={onSubmit} className="w-full">
            <FaGoogle /> <p>Sign in with Google</p>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LogIn;
