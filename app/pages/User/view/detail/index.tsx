import { useLoaderData, useNavigate } from 'react-router';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

// 🔹 Component
export default function UserDetail() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useLoaderData() as any;
  const navigate = useNavigate();

  if (!user) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: '80vh' }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar src={user.image} alt={user.firstName} sx={{ width: 100, height: 100, border: '2px solid #ddd' }} />
          <Box>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back to List
        </Button>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Info label="Age" value={user.age} />
            <Info label="Gender" value={user.gender} />
            <Info label="Phone" value={user.phone} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Info label="Birth Date" value={user.birthDate} />
            <Info label="Blood Group" value={user.bloodGroup} />
            <Info label="University" value={user.university} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Address
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Company
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.company.name} — {user.company.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Department: {user.company.department}
        </Typography>
      </CardContent>
    </Card>
  );
}

// 🔹 Reusable Info row component
function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <Stack direction="row" spacing={1} mb={1}>
      <Typography variant="body2" fontWeight="bold" width={120}>
        {label}:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value || '-'}
      </Typography>
    </Stack>
  );
}
