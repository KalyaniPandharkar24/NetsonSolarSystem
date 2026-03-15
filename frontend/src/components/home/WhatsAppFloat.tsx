import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppFloat = () => {
  const phoneNumber = "919XXXXXXXXX"; // replace with real number
  const message = encodeURIComponent(
    "Hello Netson Solar System, I would like to know more about solar installation."
  );

  return (
    <Box
      onClick={() =>
        window.open(
          `https://wa.me/${phoneNumber}?text=${message}`,
          "_blank"
        )
      }
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
        zIndex: 2000,
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <WhatsAppIcon sx={{ color: "#fff", fontSize: 32 }} />
    </Box>
  );
};

export default WhatsAppFloat;
