import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import SuryaGharDialog from "../common/SuryaGharDialog";
import QuoteSiteVisitDialog from "../common/QuoteSiteVisitDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) =>
    location.pathname === path;

  useEffect(() => {
    const updateNavbarState = () => {
      const hero = document.querySelector<HTMLElement>(
        "[data-navbar-hero='true']"
      );

      if (!hero) {
        setScrolled(window.scrollY > 40);
        return;
      }

      const navbarHeight =
        navbarRef.current?.offsetHeight ?? 0;
      const heroBottom = hero.getBoundingClientRect().bottom;

      setScrolled(heroBottom <= navbarHeight);
    };

    updateNavbarState();

    window.addEventListener("scroll", updateNavbarState);
    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener(
        "scroll",
        updateNavbarState
      );
      window.removeEventListener(
        "resize",
        updateNavbarState
      );
    };
  }, [location.pathname]);

  return (
    <>
      <Box
        ref={navbarRef}
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1300,
          transition: "all .35s ease",
          bgcolor: scrolled
            ? "rgba(255,255,255,0.95)"
            : "transparent",
          backdropFilter: scrolled
            ? "blur(12px)"
            : "none",
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.08)"
            : "none",
        }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: 1.6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 900,
              fontSize: "1.7rem",
              letterSpacing: 1,
              color: scrolled ? "#0B1F3A" : "#FFFFFF",
              transition: "color .3s",
            }}
          >
            NETSON{" "}
            <span style={{ color: "#16A34A" }}>
              SOLAR
            </span>
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: scrolled
                    ? isActive(item.path)
                      ? "#16A34A"
                      : "#0B1F3A"
                    : "#FFFFFF",
                  fontWeight: isActive(item.path)
                    ? 700
                    : 500,
                  px: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: scrolled
                      ? "#F1F5F9"
                      : "rgba(255,255,255,0.12)",
                    color: "#16A34A",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              onClick={() => setOpen(true)}
              sx={{
                color: "#16A34A",
                fontWeight: 700,
                px: 2,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#ECFDF5",
                },
              }}
            >
              Surya Ghar
            </Button>
          </Stack>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setQuoteOpen(true)}
              sx={{
                bgcolor: "#F59E0B",
                color: "#000",
                fontWeight: 800,
                px: 3.5,
                py: 1.3,
                borderRadius: 999,
                textTransform: "none",
                boxShadow:
                  "0 12px 30px rgba(245,158,11,0.45)",
                "&:hover": {
                  bgcolor: "#D97706",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Get Quote
            </Button>

            <Box
              component={Link}
              to="/admin/login"
              aria-label="Admin login"
              tabIndex={-1}
              sx={{
                position: "absolute",
                left: "calc(100% + 6px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: 8,
                height: 20,
                display: "block",
                zIndex: 2,
                borderRadius: 999,
                opacity: 0,
                textDecoration: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          </Box>
        </Box>
      </Box>

      <SuryaGharDialog
        open={open}
        onClose={() => setOpen(false)}
      />

      <QuoteSiteVisitDialog
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        mode="quote"
      />
    </>
  );
};

export default Navbar;
