import { useEffect, useState } from "react";
import axios from "../../api/axios";

import {
  Container,
  Typography,
  Card,
  Avatar,
  Rating,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import ReviewModal from "../reviews/ReviewModal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

type Review = {
  _id: string;
  name: string;
  message: string;
  rating: number;
  image?: string;
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);

  const fetchReviews = () => {
    axios.get("/reviews").then((res) => {
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.reviews || [];
      setReviews(data);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <Box
      sx={{
        py: 14,
        background:
          "linear-gradient(to bottom, #F8FAFC 0%, #FFFFFF 40%, #F8FAFC 100%)",
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}

        <Box textAlign="center" mb={10}>
  
  <Typography
    sx={{
      textTransform: "uppercase",
      color: "#16A34A",
      fontWeight: 700,
      letterSpacing: 3,
      fontSize: "0.8rem",
      mb: 1,
    }}
  >
    Testimonials
  </Typography>

  <Typography
    sx={{
      fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
      fontWeight: 800,
      color: "#0F172A",
      lineHeight: 1.2,
    }}
  >
    What Our Customers Say
  </Typography>

  {/* green divider */}

  <Box
    sx={{
      width: 60,
      height: 4,
      bgcolor: "#16A34A",
      borderRadius: 2,
      mx: "auto",
      mt: 2,
      mb: 3,
    }}
  />

  {/* rating row */}

  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={1}
  >

    <Rating value={averageRating} precision={0.1} readOnly />

    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#0F172A",
      }}
    >
      {averageRating.toFixed(1)}
    </Typography>

    <Typography
      sx={{
        fontSize: "0.95rem",
        color: "#64748B",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      ({reviews.length} reviews)
    </Typography>

  </Stack>

</Box>

        {/* SLIDER */}

        <Box
          sx={{
            position: "relative",
            px: { xs: 0, md: 4 },
          }}
        >
          <Swiper
            className="reviews-slider"
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={40}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop
          >
            {reviews.map((r) => (
              <SwiperSlide key={r._id}>

                <Card className="reviews-card">

                  {/* IMAGE */}

                  <Box className="reviews-image-wrapper">

                    {r.image ? (
                      <img
                        src={`http://localhost:5000${r.image}`}
                        alt={r.name}
                        className="reviews-image"
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          bgcolor: "#16A34A",
                          fontSize: "2rem",
                        }}
                      >
                        {r.name.charAt(0)}
                      </Avatar>
                    )}

                  </Box>

                  {/* CONTENT */}

                  <Box className="reviews-content">

                    <Rating
                      value={r.rating}
                      readOnly
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: "#FACC15",
                        },
                      }}
                    />

                    <Typography className="reviews-message">
                      “{r.message}”
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" spacing={2} alignItems="center">

                      <Avatar
                        sx={{
                          bgcolor: "#16A34A",
                          width: 44,
                          height: 44,
                        }}
                      >
                        {r.name.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography fontWeight={700}>
                          {r.name}
                        </Typography>

                        <Typography className="reviews-verified">
                          ✓ Verified Customer
                        </Typography>
                      </Box>

                    </Stack>

                  </Box>

                </Card>

              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* CTA */}

        <Box textAlign="center" mt={10}>

          <Typography
            sx={{
              mb: 3,
              color: "#475569",
              fontSize: "0.95rem",
            }}
          >
            Have you worked with us? Share your experience.
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              px: 7,
              py: 1.6,
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: 3,
              backgroundColor: "#16A34A",
              boxShadow: "0 10px 24px rgba(22,163,74,0.25)",
              "&:hover": {
                backgroundColor: "#15803D",
                boxShadow: "0 12px 28px rgba(22,163,74,0.35)",
              },
            }}
          >
            WRITE A REVIEW
          </Button>

        </Box>

        <ReviewModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={fetchReviews}
        />

      </Container>
    </Box>
  );
}