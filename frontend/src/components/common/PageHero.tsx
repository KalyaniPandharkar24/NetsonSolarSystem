import { Box, Container, Typography } from "@mui/material";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <Box
      data-navbar-hero="true"
      sx={{
        position: "relative",
        height: {
          xs: 260,
          sm: 320,
          md: 420,
          lg: 480,
        },
        display: "flex",
        alignItems: "center",
        color: "#fff",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d')",
        backgroundSize: "cover",
        backgroundPosition: "50% 80%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, mb: 2 }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h6"
            sx={{ opacity: 0.9, maxWidth: 650 }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PageHero;
