import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Stack,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";

type Message = {
  from: "bot" | "user";
  text: string;
};

const knowledgeBase = [
  { keywords: ["cost", "price", "money"], reply: "Solar systems start from ₹60,000 per kW depending on usage." },
  { keywords: ["subsidy", "government"], reply: "Yes 🌿 We assist with MNRE subsidy and approvals." },
  { keywords: ["time", "install"], reply: "Installation takes 3–7 working days after approvals." },
  { keywords: ["saving", "bill"], reply: "Customers save 60–90% on electricity bills." },
  { keywords: ["battery"], reply: "Battery is optional. Grid systems work without it." },
  { keywords: ["life", "years"], reply: "Solar panels last 25–30 years." },
  { keywords: ["maintenance"], reply: "Very low maintenance — occasional cleaning only." },
  { keywords: ["contact"], reply: "Contact us via WhatsApp or Contact page for a free site visit." },
];

const suggestions = ["Cost", "Subsidy", "Savings", "Battery", "Maintenance"];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi 👋 I’m Netson Solar Assistant. Ask me anything about solar systems." },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getReply = (text: string) => {
    const lower = text.toLowerCase();
    for (const item of knowledgeBase) {
      if (item.keywords.some((k) => lower.includes(k))) return item.reply;
    }
    return "Ask about cost, subsidy, savings, battery, or installation 🌞";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { from: "user", text };
    const botMsg: Message = { from: "bot", text: getReply(text) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: 60,
            height: 60,
            bgcolor: "#16A34A",
            color: "#fff",
            zIndex: 3000,
            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            "&:hover": { bgcolor: "#15803D" },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chat Window */}
      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: 320,
            height: 460,
            zIndex: 3000,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.6,
              bgcolor: "#16A34A",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#15803D" }}>
                <SmartToyIcon fontSize="small" />
              </Avatar>
              <Typography fontWeight={600} fontSize={14}>
                Netson Solar Assistant
              </Typography>
            </Box>

            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, px: 2, py: 2, overflowY: "auto", bgcolor: "#F0FDF4" }}>
            <Stack spacing={2}>
              {messages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {/* Bot Avatar */}
                  {msg.from === "bot" && (
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#16A34A", fontSize: 14 }}>
                      🤖
                    </Avatar>
                  )}

                  {/* Message Bubble */}
                  <Box
                    sx={{
                      px: 2,
                      py: 1.3,
                      borderRadius: 2,
                      maxWidth: "75%",
                      fontSize: 14,
                      lineHeight: 1.5,
                      bgcolor: msg.from === "user" ? "#DCFCE7" : "#FFFFFF",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              ))}
              <div ref={endRef} />
            </Stack>
          </Box>

         {/* ===== FOOTER ===== */}
<Box
  sx={{
    p: 1.5,
    borderTop: "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF",
  }}
>
  {/* Suggestions */}
  <Box sx={{ mb: 1 }}>
    <Stack
      direction="row"
      spacing={1}
      flexWrap="wrap"
      useFlexGap
    >
      {suggestions.map((s) => (
        <Chip
          key={s}
          label={s}
          size="small"
          clickable
          onClick={() => sendMessage(s)}
          sx={{
            backgroundColor: "#DCFCE7",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#BBF7D0" },
          }}
        />
      ))}
    </Stack>
  </Box>

  {/* Input Row */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      backgroundColor: "#F9FAFB",
      borderRadius: 2,
      p: 0.6,
      border: "1px solid #E5E7EB",
    }}
  >
    <TextField
      variant="standard"
      placeholder="Type your question…"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
      fullWidth
      InputProps={{ disableUnderline: true }}
      sx={{ px: 1, fontSize: 14 }}
    />

    <Button
      variant="contained"
      onClick={() => sendMessage(input)}
      sx={{
        borderRadius: 1.5,
        px: 2,
        height: 36,
        backgroundColor: "#16A34A",
        boxShadow: "none",
        "&:hover": { backgroundColor: "#15803D" },
      }}
    >
      Send
    </Button>
  </Box>
</Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;