import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { routes } from "~/router/routes";

export default function SignIn() {
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const submit = useSubmit();
  const loading = navigation.state === "submitting";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    submit(formData, { method: "post", action: routes.auth.signIn });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 400, borderRadius: 3, boxShadow: 3 }}
      >
        <CardContent>
          <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />

              {actionData?.error && (
                <Alert severity="error" variant="outlined">
                  {actionData.error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
