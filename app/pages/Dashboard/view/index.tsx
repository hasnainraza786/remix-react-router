import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { routes } from '~/router/routes';

export default function ReactRouterIntroPage() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: '900px',
        mx: 'auto',
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        React Router — From Library to Framework
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        React Router has evolved from being just a routing library into a **framework-level tool** that now supports
        file-based routing, layouts, server-side rendering, middleware, and full-stack rendering patterns similar to
        frameworks like Next.js.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Comparison Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
              React Router as a Library
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              • Used only for client-side routing • Needed manual configuration of routes • No concept of layouts or
              middleware • Worked purely in the browser (CSR)
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
              React Router as a Framework
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              • Supports **file-based routing** • Introduces **layouts** and **middleware** • Handles **SSR + CSR**
              automatically • Includes built-in **data loading and actions**
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Comparison with Next.js */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          ⚖️ React Router vs Next.js
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Both now offer full-stack capabilities — routing, SSR, and server functions — but React Router gives more
          **flexibility** and **control over file structure** and **middleware flow**, while Next.js offers a more
          **opinionated, convention-driven** framework.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Topics List */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          📘 Topics Covered
        </Typography>
        <List>
          {[
            {
              title: '1. File-Based Routing',
              path: routes.fileBaseRouting,
            },
            { title: '2. Layout Structure', path: routes.layoutStructure },
            { title: '3. Middleware', path: routes.middlewareStructure },
            {
              title: '4. Rendering Structure',
              path: routes.renderingStructure,
            },
          ].map((topic, i) => (
            <ListItem
              key={i}
              component="a"
              href={topic.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </ListItemIcon>
              <ListItemText
                primary={topic.title}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
        🚀 This guide will walk you through each concept step by step — from understanding file-based routing to
        mastering middleware and the rendering process in React Router.
      </Typography>
    </Box>
  );
}
