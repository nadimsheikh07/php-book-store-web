import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Paper, Typography, CardActionArea, Rating, Stack, Button } from '@mui/material';
// components
import Image from '../../components/image';

import { varHover, varTranHover } from '../../components/animate';
import { useState } from 'react';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

BookCard.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string,
    cover_image: PropTypes.string,
    name: PropTypes.string,
    rate: PropTypes.string,
  }),
};

export default function BookCard({ item }) {
  const { id, name, cover_image, rate, href } = item;
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const addToCart = async (id) => {
    setLoading(true);
    try {

      const response = await axiosInstance.post(`api/cart`, {
        book_id: id,
        quantity: 1
      });

      const { message } = response.data;


      enqueueSnackbar(message, { variant: 'success' });

    } catch (error) {
      console.error('Error fetching books:', error);
      enqueueSnackbar('Unable to add!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href={href} underline="none" target="_blank" rel="noopener">
      <Paper
        variant="outlined"
        textAlign="center"
        alignContent="center"
        sx={{ borderColor: (theme) => alpha(theme.palette.grey[500], 0.12) }}
      >
        <CardActionArea
          component={m.div}
          whileHover="hover"
          sx={{
            p: 2.5,
            color: 'text.secondary',
            bgcolor: 'background.neutral',
          }}
        >
          <m.div variants={varHover(1.1)} transition={varTranHover()}>
            <Image src={cover_image} alt={name} />
          </m.div>
        </CardActionArea>

        <Typography variant="p" sx={{ p: 2, textAlign: 'center' }}>
          {name}
        </Typography>

        <Stack sx={{ p: 2, textAlign: 'center' }}>
          <Rating size="small" value={4} precision={0.1} readOnly />

          <Typography variant="p" sx={{ p: 2, textAlign: 'center' }}>
            ${rate}
          </Typography>

          <Button onClick={() => addToCart(id)}>Add to cart</Button>

        </Stack>
      </Paper>
    </Link>
  );
}
