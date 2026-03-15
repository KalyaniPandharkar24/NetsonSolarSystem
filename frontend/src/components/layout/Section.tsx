import { Box } from "@mui/material";

interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        px: { xs: 2, md: 4 },

        // ⭐ TOP padding only
        pt: { xs: 8, md: 12 },

        // ⭐ NO bottom padding → fixes footer gap
        pb: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default Section;