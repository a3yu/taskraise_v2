"use server";
import { Resend } from "resend";
import * as React from "react";
import {
  EmailTemplateOrderClaimed,
  EmailTemplateOrderComplete,
  EmailTemplateOrderPayedFor,
} from "./emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function orderCompletedForOrganization(
  email: string,
  orderTitle: string,
  orgName: string
) {
  const { data, error } = await resend.emails.send({
    from: "Taskraise <system@taskraise.com>",
    to: [email],
    subject: "Order Marked as Complete",
    react: EmailTemplateOrderComplete(
      orgName,
      orderTitle
    ) as React.ReactElement,
  });
  if (error) {
    throw Error("Could not send email");
  }
}

export async function orderClaimedForCustomer(
  email: string,
  name: string,
  orderTitle: string,
  organizationName: string
) {
  const { data, error } = await resend.emails.send({
    from: "Taskraise <system@taskraise.com>",
    to: [email],
    subject: "Order Claimed",
    react: EmailTemplateOrderClaimed(
      name,
      orderTitle,
      organizationName
    ) as React.ReactElement,
  });
  if (error) {
    throw Error("Could not send email");
  }
}

export async function orderPayedFor(
  email: string,
  orderTitle: string,
  organizationName: string
) {
  const { data, error } = await resend.emails.send({
    from: "Taskraise <system@taskraise.com>",
    to: [email],
    subject: "Order Payed For",
    react: EmailTemplateOrderPayedFor(
      orderTitle,
      organizationName
    ) as React.ReactElement,
  });
  if (error) {
    throw Error("Could not send email");
  }
}
