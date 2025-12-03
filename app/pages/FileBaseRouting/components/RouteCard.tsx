import { Paper, Stack, Typography } from "@mui/material";
import { colorSchemes } from "~/theme/color-schemes";

function RouteCard({
  file,
  path,
  description,
}: {
  file: string;
  path: string;
  description: string;
}) {
  const {
    light: { palette },
  } = colorSchemes;
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 2,
        mb: 2.5,
        borderLeft: `5px solid ${palette.primary.main}`,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          {path}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          File: <code>{file}</code>
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Stack>
    </Paper>
  );
}

export default RouteCard;
