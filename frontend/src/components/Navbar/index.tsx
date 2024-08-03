'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Blog
        </Typography>
        <Box>
          <Button color='inherit' component={Link} href='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} href='/create'>
            Create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;