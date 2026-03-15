import Review from "./review.model.js";


// ==============================
// CREATE REVIEW (Public)
// ==============================
export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// GET APPROVED REVIEWS (Public)
// ==============================
export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" })
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// GET PENDING REVIEWS (Admin)
// ==============================
export const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "pending" })
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// APPROVE REVIEW
// ==============================
export const approveReview = async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, {
    status: "approved",
  });

  res.json({ message: "Review approved" });
};


// ==============================
// REJECT REVIEW
// ==============================
export const rejectReview = async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, {
    status: "rejected",
  });

  res.json({ message: "Review rejected" });
};


// ==============================
// DELETE REVIEW
// ==============================
export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);

  res.json({ message: "Review deleted" });
};