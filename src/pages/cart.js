import Head from 'next/head';
import { Box, Switch, Container, Typography, Stack, Card, CardHeader, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Button } from '@mui/material';
import { _pricingPlans } from '../_mock/arrays';
import { PricingPlanCard } from '../sections/pricing';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import MainCustomerLayout from 'src/layouts/mainCustomer/MainCustomerLayout';
import { useSnackbar } from 'src/components/snackbar';

CartPage.getLayout = (page) => <MainCustomerLayout>{page}</MainCustomerLayout>;

export default function CartPage() {

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`api/carts`);
      setCarts(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`api/carts/${id}`);
      const { status } = response
      const { message } = response.data

      if (status == 200) {
        enqueueSnackbar(message, { variant: 'success' });
        fetchCart()
      }

    } catch (error) {
      console.error('Error fetching books:', error);
      enqueueSnackbar('Unable to remove!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <>
      <Head>
        <title> Cart | PHP BOOK STORE</title>
      </Head>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Process your book purchase
        </Typography>


        <Container sx={{ my: 10 }}>
          <Stack spacing={3}>

            <Card>
              <CardHeader title="Cart" />


              <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
                <Scrollbar>
                  <Table sx={{ minWidth: 650 }}>

                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Book</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Rate</TableCell>
                        <TableCell align="right">Delete</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>


                      {carts && carts.map(cart => {
                        return (
                          <TableRow key="ddd">
                            <TableCell align="right">{cart?.book?.name}</TableCell>
                            <TableCell>{cart?.quantity}</TableCell>
                            <TableCell align="right">{cart?.book?.rate}</TableCell>
                            <TableCell align="right">
                              <Button color="error" onClick={() => deleteCart(cart.id)}>Delete</Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}


                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

            </Card>
          </Stack>
        </Container>

      </Container>
    </>
  );
}
