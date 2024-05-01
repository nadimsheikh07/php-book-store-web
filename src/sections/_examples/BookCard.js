import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Paper, Typography, CardActionArea, Rating } from '@mui/material';
// components
import Image from '../../components/image';

import { varHover, varTranHover } from '../../components/animate';

// ----------------------------------------------------------------------

BookCard.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string,
    cover_image: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default function BookCard({ item }) {
  const { name, cover_image, href } = item;

  return (
    <Link href={href} underline="none" target="_blank" rel="noopener">
      <Paper
        variant="outlined"
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

        <Typography variant="subtitle2" sx={{ p: 2, textAlign: 'center' }}>
          {name}
        </Typography>

        <Rating size="small" value={4} precision={0.1} readOnly />
      </Paper>
    </Link>
  );
}
