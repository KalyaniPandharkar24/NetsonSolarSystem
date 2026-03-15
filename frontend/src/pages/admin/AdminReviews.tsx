import { useEffect, useState } from "react";
import axios from "../../api/axios";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Tabs,
  Tab,
  Box,
} from "@mui/material";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  const token = localStorage.getItem("adminToken");

  const fetchReviews = async () => {
    const res = await axios.get("/reviews/pending", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReviews(res.data);
  };

  const fetchApproved = async () => {
    const res = await axios.get("/reviews/");
    setApprovedReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
    fetchApproved();
  }, []);

  const action = async (url: string) => {
    await axios.put(url, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReviews();
    fetchApproved();
  };

  const remove = async (id: string) => {
    await axios.delete(`/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReviews();
    fetchApproved();
  };

  return (
    <>
      <Typography variant="h4" fontWeight={800} mb={4}>
        Reviews Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Pending Reviews" />
          <Tab label="Approved Reviews" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <>
          <Typography variant="h6" fontWeight={600} mt={3} mb={2}>
            Pending Reviews ({reviews.length})
          </Typography>

          <Grid container spacing={3}>
            {reviews.map((r) => (
              <Grid item xs={12} md={6} key={r._id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    "&:hover": { boxShadow: 8 },
                  }}
                >
                  <CardContent>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" fontWeight={700}>
                        {r.name}
                      </Typography>

                      <Chip
                        label={`⭐ ${r.rating}`}
                        color="warning"
                      />
                    </Stack>

                    <Typography sx={{ my: 2 }}>
                      {r.message}
                    </Typography>

                    {r.image && (
                      <img
                        src={`http://localhost:5000${r.image}`}
                        width="100%"
                        style={{
                          borderRadius: 10,
                          marginBottom: 12,
                        }}
                        alt="review"
                      />
                    )}

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          action(`/reviews/approve/${r._id}`)
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          action(`/reviews/reject/${r._id}`)
                        }
                      >
                        Reject
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(r._id)}
                      >
                        Delete
                      </Button>
                    </Stack>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {tab === 1 && (
        <>
          <Typography variant="h6" fontWeight={600} mt={3} mb={2}>
            Approved Reviews ({approvedReviews.length})
          </Typography>

          <Grid container spacing={3}>
            {approvedReviews.map((r) => (
              <Grid item xs={12} md={6} key={r._id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    "&:hover": { boxShadow: 8 },
                  }}
                >
                  <CardContent>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" fontWeight={700}>
                        {r.name}
                      </Typography>

                      <Chip
                        label={`⭐ ${r.rating}`}
                        color="warning"
                      />
                    </Stack>

                    <Typography sx={{ my: 2 }}>
                      {r.message}
                    </Typography>

                    {r.image && (
                      <img
                        src={`http://localhost:5000${r.image}`}
                        width="100%"
                        style={{
                          borderRadius: 10,
                          marginBottom: 12,
                        }}
                        alt="review"
                      />
                    )}

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(r._id)}
                      >
                        Delete
                      </Button>
                    </Stack>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}