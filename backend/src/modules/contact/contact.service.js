import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const INQUIRY_LABELS = {
  general: "General Inquiry",
  quote: "Solar Quote",
  site_visit: "Free Site Visit",
};

const renderField = (label, value) => {
  if (!value) {
    return "";
  }

  return `<p><b>${label}:</b> ${value}</p>`;
};

const buildDetailsHtml = (data) => {
  const inquiryType =
    INQUIRY_LABELS[data.type] || INQUIRY_LABELS.general;

  return [
    renderField("Inquiry Type", inquiryType),
    renderField("Service", data.service),
    renderField("Name", data.name),
    renderField("Phone", data.phone),
    renderField("Email", data.email || "Not provided"),
    renderField("Preferred Visit Date", data.date),
    renderField("Address", data.address),
    renderField("City / Pincode", data.city),
    renderField("Monthly Bill", data.bill),
    renderField("Property Type", data.propertyType),
    renderField("Roof Type", data.roofType),
    renderField("Message", data.message || "None"),
  ]
    .filter(Boolean)
    .join("");
};

export const sendContactEmails = async (data) => {
  const inquiryLabel =
    INQUIRY_LABELS[data.type] || INQUIRY_LABELS.general;
  const detailsHtml = buildDetailsHtml(data);

  try {
    const ownerMail = {
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL,
      subject: `New ${inquiryLabel} - Netson Solar Website`,
      html: `
        <h2 style="color:#16A34A;">New Website Enquiry</h2>
        ${detailsHtml}
        <hr />
        <p style="color:#6b7280;">
          Sent from Netson Solar System website contact form.
        </p>
      `,
    };

    const mailJobs = [transporter.sendMail(ownerMail)];

    if (data.email) {
      const userMail = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: `Thank you for your ${inquiryLabel.toLowerCase()} request`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #E5E7EB; border-radius:8px; overflow:hidden;">
            <div style="background:#16A34A; color:white; padding:16px;">
              <h2 style="margin:0;">Netson Solar System</h2>
              <p style="margin:0; font-size:14px;">Clean Energy Solutions</p>
            </div>

            <div style="padding:20px;">
              <p>Hello <b>${data.name}</b>,</p>

              <p>
                Thank you for contacting <b>Netson Solar System</b>.
                Our team will review your request and contact you shortly.
              </p>

              <h3 style="color:#16A34A;">Your Request Details</h3>
              ${detailsHtml}

              <hr />

              <p>Need a faster response? Contact us directly:</p>
              <p>
                <a
                  href="https://wa.me/918010966816"
                  style="background:#16A34A; color:white; padding:10px 14px; text-decoration:none; border-radius:6px;"
                >
                  Chat on WhatsApp
                </a>
              </p>

              <p>
                Phone: +91 80109 66816<br />
                Maharashtra, India
              </p>

              <p style="color:#6b7280;">
                We appreciate your interest in clean solar energy.
              </p>
            </div>

            <div style="background:#F1F5F9; padding:12px; text-align:center; font-size:12px; color:#64748B;">
              Copyright ${new Date().getFullYear()} Netson Solar System. All rights reserved.
            </div>
          </div>
        `,
      };

      mailJobs.push(transporter.sendMail(userMail));
    }

    await Promise.all(mailJobs);
    console.log("Contact emails sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Failed to send contact emails");
  }
};
