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
import React, { useEffect, useState } from 'react';
import BookCard from 'src/sections/_examples/BookCard';

// ----------------------------------------------------------------------

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function Home() {

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/books?page=${page}&page_size=${pageSize}`);
      const { data } = response.data;
      setBooks((prevBooks) => [...prevBooks, ...data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchBooks();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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

          {loading && <Typography>Loading...</Typography>}
          {!loading && !hasMore && <Typography>No more books to load</Typography>}
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
