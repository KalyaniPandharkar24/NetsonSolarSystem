import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

import faqImage from "../../assets/FAQ.jpg";

const faqs = [
  {
    question: "Why should I switch to solar energy?",
    answer:
      "Solar energy reduces electricity bills, increases property value, and provides clean renewable power with minimal maintenance.",
  },
  {
    question: "How much does a solar system cost?",
    answer:
      "Costs depend on system size and usage. Residential installations typically start from ₹60,000 per kW.",
  },
  {
    question: "Will solar work during cloudy days or at night?",
    answer:
      "Solar panels generate less power during cloudy conditions and none at night, but grid connection or battery storage ensures continuous supply.",
  },
  {
    question:
      "Can Netson Solar handle everything from permissions to installation?",
    answer:
      "Yes. We manage approvals, documentation, installation, and commissioning for a hassle-free experience.",
  },
  {
    question: "How can I get started?",
    answer:
      "Simply contact us for a site survey. Our team will design a customized solution and guide you through the process.",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

const handleChange =
  (panel: string) =>
  (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="lg">

        {/* FLEX LAYOUT — GUARANTEED SIDE-BY-SIDE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6,
          }}
        >

          {/* LEFT — FAQ */}
          <Box sx={{ flex: 7 }}>
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 3,
                p: { xs: 3, md: 5 },
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
                sx={{ fontSize: { xs: 26, md: 32 } }}
              >
                Frequently Asked Questions
              </Typography>

              {faqs.map((faq, index) => {
                const panel = `panel-${index}`;
                const isOpen = expanded === panel;

                return (
                  <Accordion
                    key={panel}
                    expanded={isOpen}
                    onChange={handleChange(panel)}
                    elevation={0}
                    sx={{
                      borderBottom:
                        index !== faqs.length - 1
                          ? "1px solid #E5E7EB"
                          : "none",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ px: 0 }}
                    >
                      <Typography fontWeight={600} fontSize={17}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 0, pb: 2 }}>
                      <Typography
                        color="text.secondary"
                        fontSize={15}
                        lineHeight={1.7}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Box>

          {/* RIGHT — IMAGE */}
          <Box
            sx={{
              flex: 5,
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={faqImage}
              alt="FAQ Illustration"
              sx={{
                width: "100%",
                maxWidth: 420,
              }}
            />
          </Box>

        </Box>

      </Container>
    </Box>
  );
};

export default FAQSection;