import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import SuryaGharDialog from "../common/SuryaGharDialog";
import QuoteSiteVisitDialog from "../common/QuoteSiteVisitDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/", sectionId: "home" },
    { label: "Services", path: "/services", sectionId: "services" },
    { label: "Projects", path: "/projects", sectionId: "projects" },
    { label: "Contact", path: "/contact", sectionId: "contact" },
  ];

  const isActive = (path: string, sectionId?: string) => {
    if (location.pathname === "/" && sectionId) {
      return activeSection === sectionId;
    }

    return location.pathname === path;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("quote") === "1") {
      setQuoteOpen(true);
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);

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

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("home");
      return;
    }

    const sectionIds = navItems.map((item) => item.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const navbarHeight = navbarRef.current?.offsetHeight ?? 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio || 0) -
              (a.intersectionRatio || 0)
          );

        const top = visible[0];
        if (!top) return;

        setActiveSection(top.target.id || "home");
      },
      {
        rootMargin: `-${navbarHeight + 12}px 0px -55% 0px`,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
                  color: isActive(item.path, item.sectionId)
                    ? "#16A34A"
                    : scrolled
                    ? "#0B1F3A"
                    : "#FFFFFF",
                  fontWeight: isActive(item.path, item.sectionId)
                    ? 600
                    : 500,
                  fontSize: "0.93rem",
                  px: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  position: "relative",
                  backgroundColor: "transparent",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 5,
                    height: 2,
                    borderRadius: 999,
                    backgroundColor: isActive(item.path, item.sectionId)
                      ? "#16A34A"
                      : "transparent",
                    transform: isActive(item.path, item.sectionId)
                      ? "scaleX(1)"
                      : "scaleX(0)",
                    transformOrigin: "center",
                    transition:
                      "transform .28s ease, background-color .28s ease",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#16A34A",
                    fontWeight: 700,
                    transform: "translateY(-1px)",
                  },
                  "&:hover::after": {
                    backgroundColor: isActive(item.path, item.sectionId)
                      ? "#16A34A"
                      : "transparent",
                    transform: isActive(item.path, item.sectionId)
                      ? "scaleX(1)"
                      : "scaleX(0)",
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
