import { useEffect, useState } from "react";
import axios from "../../api/axios";

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Paper,
  Box,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const EnquiryLabel = (contact: any) => {
  if (contact.service) return contact.service;
  if (contact.type === "quote") return "Solar Quote";
  if (contact.type === "site_visit") return "Free Site Visit";
  return "-";
};

const EnquiryTypeLabel = (type?: string) => {
  if (type === "quote") return "Solar Quote";
  if (type === "site_visit") return "Free Site Visit";
  return "General Enquiry";
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [selected, setSelected] = useState<any>(null);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const token = localStorage.getItem("adminToken");

  const fetchContacts = async () => {
    const res = await axios.get("/contact", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markContacted = async (id: string) => {
    await axios.put(`/contact/${id}/contacted`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setToast({
      open: true,
      msg: "Marked as contacted",
      type: "success",
    });

    fetchContacts();
  };

  const remove = async (id: string) => {
    await axios.delete(`/contact/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setToast({
      open: true,
      msg: "Enquiry deleted",
      type: "error",
    });

    fetchContacts();
  };

  let filtered = contacts.filter((c) =>
    `${c.name} ${c.email || ""} ${c.phone} ${EnquiryLabel(c)} ${c.type || ""} ${c.address || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  filtered = filtered.sort((a, b) =>
    sort === "latest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Contact Inquiries
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="Search by name, email, phone or service"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </TextField>
      </Stack>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f1f5f9" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Service</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c._id} hover>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.email || "-"}</TableCell>
                <TableCell>{EnquiryLabel(c)}</TableCell>
                <TableCell>
                  <Chip
                    label={c.status === "new" ? "New" : "Contacted"}
                    color={c.status === "new" ? "error" : "success"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => setSelected(c)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  {c.status === "new" && (
                    <IconButton
                      color="success"
                      onClick={() => markContacted(c._id)}
                    >
                      <DoneIcon />
                    </IconButton>
                  )}

                  <IconButton
                    color="error"
                    onClick={() => remove(c._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Enquiry Details</DialogTitle>

        <DialogContent dividers>
          {selected && (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {selected.name}
              </Typography>

              <Typography color="text.secondary" mb={2}>
                {selected.email || "No email provided"} • {selected.phone}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography>
                <b>Service Requested:</b> {EnquiryLabel(selected)}
              </Typography>

              {selected.type && (
                <Typography mt={1}>
                  <b>Enquiry Type:</b> {EnquiryTypeLabel(selected.type)}
                </Typography>
              )}

              {selected.date && (
                <Typography mt={1}>
                  <b>Preferred Visit Date:</b> {selected.date}
                </Typography>
              )}

              {selected.address && (
                <Typography mt={1}>
                  <b>Address:</b> {selected.address}
                </Typography>
              )}

              {selected.city && (
                <Typography mt={1}>
                  <b>City / Pincode:</b> {selected.city}
                </Typography>
              )}

              {selected.bill && (
                <Typography mt={1}>
                  <b>Monthly Bill:</b> {selected.bill}
                </Typography>
              )}

              {selected.propertyType && (
                <Typography mt={1}>
                  <b>Property Type:</b> {selected.propertyType}
                </Typography>
              )}

              {selected.roofType && (
                <Typography mt={1}>
                  <b>Roof Type:</b> {selected.roofType}
                </Typography>
              )}

              <Typography mt={2}>
                <b>Message:</b>
              </Typography>

              <Paper
                sx={{
                  p: 2,
                  mt: 1,
                  bgcolor: "#f8fafc",
                  borderRadius: 2,
                }}
              >
                {selected.message || "No message provided"}
              </Paper>

              <Typography mt={3} color="text.secondary">
                Submitted on {new Date(selected.createdAt).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type as any} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
