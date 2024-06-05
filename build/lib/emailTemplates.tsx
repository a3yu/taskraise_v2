export const EmailTemplateOrderComplete = (
  orgName: string,
  orderTitle: string
) => (
  <div>
    <h3>{orgName},</h3>
    <p>
      Your order titled: <span className="font-semibold">{orderTitle}</span> has
      been marked as complete.
    </p>
    <br />
    <p>Keep up the great work! - TaskRaise Team</p>
  </div>
);

export const EmailTemplateOrderClaimed = (
  name: string,
  orderTitle: string,
  organizationName: string
) => (
  <div>
    <h3>{name},</h3>
    <p>
      Your order titled: <span className="font-semibold">{orderTitle}</span> has
      been claimed by {organizationName}. Complete payment at{" "}
      <a href={process.env.NEXT_PUBLIC_URL + "/home"}>
        {process.env.NEXT_PUBLIC_URL + "/home"}
      </a>
      .
    </p>
    <br />
    <p>Thank you! - TaskRaise Team</p>
  </div>
);

export const EmailTemplateOrderPayedFor = (
  orderTitle: string,
  organizationName: string
) => (
  <div>
    <h3>Hey, {organizationName}!</h3>
    <p>
      The order titled: <span className="font-semibold">{orderTitle}</span> has
      been claimed by payed for. Find your customer&apos;s contact info at:{" "}
      <a href={process.env.NEXT_PUBLIC_URL + "/dashboard"}>
        {process.env.NEXT_PUBLIC_URL + "/dashboard"}
      </a>
      .
    </p>
    <br />
    <p>Thank you! - TaskRaise Team</p>
  </div>
);
