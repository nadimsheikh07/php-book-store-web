// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Dashboard',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_AFTER_LOGIN,
  },
];

export default navConfig;
