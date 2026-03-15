import Project from "../projects/project.model.js";
import Review from "../reviews/review.model.js";
import Contact from "../contact/contact.model.js";

export const getDashboardStats = async (req, res) => {
  const totalProjects = await Project.countDocuments();

  const pendingReviews = await Review.countDocuments({
    status: "pending",
  });

  const totalContacts = await Contact.countDocuments();

  res.json({
    totalProjects,
    pendingReviews,
    totalContacts,
  });
};