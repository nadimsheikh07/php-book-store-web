import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// next
import Head from 'next/head';
// @mui
import { Container, Typography, Stack, Link, Box, Divider } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { ComponentHero, ComponentCard } from '../sections/_examples';
import { foundation, mui, extra } from '../sections/_examples/config-navigation';
import axiosInstance from 'src/utils/axios';
import React from 'react';
import BookCard from 'src/sections/_examples/BookCard';

// ----------------------------------------------------------------------

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function Home() {

  const [books, setBooks] = React.useState([]);

  const getBookData = async () => {
    await axiosInstance.get("/api/books").then((response) => {
      const { status, data } = response
      console.log('response', response);

      if (status == 200) {
        setBooks(data.data)
      }
    });
  }


  React.useEffect(() => {
    getBookData()
  }, [])

  return (
    <>
      <Head>
        <title> Components Overview | PHP BOOK STORE</title>
      </Head>

      <ComponentHero />

      <Container sx={{ pt: 10, pb: 15 }}>

        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">Extra Components</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Some custom components / use 3rd party dependencies (chart, map, editor…).
            </Typography>
          </Stack>

          <Grid>
            {books.map((item) => (
              <BookCard key={item.name} item={item} />
            ))}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

Grid.propTypes = {
  children: PropTypes.node,
};

function Grid({ children }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap={2.5}
    >
      {children}
    </Box>
  );
}
