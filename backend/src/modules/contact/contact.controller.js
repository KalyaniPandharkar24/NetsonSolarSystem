import Contact from "./contact.model.js";
import { sendContactEmails } from "./contact.service.js";

/* ================= SUBMIT CONTACT (PUBLIC) ================= */
export const submitContact = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      type = "general",
      service,
      message,
      city,
      bill,
      propertyType,
      roofType,
      address,
      date,
    } = req.body;
    const sanitize = (value) =>
      typeof value === "string" ? value.trim() : "";
    const safeName = sanitize(name);
    const safePhone = sanitize(phone);
    const safeEmail = sanitize(email);

    const normalizedType =
      type === "quote" || type === "site_visit"
        ? type
        : "general";

    if (!safeName || !safePhone) {
      return res.status(400).json({
        message: "Name and phone are required",
      });
    }

    if (normalizedType === "general" && !safeEmail) {
      return res.status(400).json({
        message: "Email is required for this Enquiry",
      });
    }

    const normalizedService =
      service ||
      (normalizedType === "quote"
        ? "Solar Quote"
        : normalizedType === "site_visit"
        ? "Free Site Visit"
        : "");

    const payload = {
      name: safeName,
      phone: safePhone,
      email: safeEmail,
      type: normalizedType,
      service: sanitize(normalizedService),
      message: sanitize(message),
      city: sanitize(city),
      bill: sanitize(bill),
      propertyType: sanitize(propertyType),
      roofType: sanitize(roofType),
      address: sanitize(address),
      date: sanitize(date),
    };

    const contact = await Contact.create(payload);

    await sendContactEmails(payload);

    res.status(200).json({
      message: "Contact request submitted successfully",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET ALL CONTACTS (ADMIN) ================= */
export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

/* ================= MARK CONTACTED ================= */
export const markContacted = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, {
    status: "contacted",
  });

  res.json({ message: "Marked as contacted" });
};

/* ================= DELETE CONTACT ================= */
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
};
