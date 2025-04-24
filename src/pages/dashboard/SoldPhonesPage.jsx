import React from 'react'
import { SoldPhoneTable } from '../../components/phones/SoldPhoneTable';
import { useGetSoldPhones } from '../../hooks/api/useSoldPhones';
import { Typography } from '@mui/material';

export const SoldPhonesPage = () => {
  const { soldPhones, loading } = useGetSoldPhones();

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Celulares Vendidos
      </Typography>

      <div style={{ height: 400, minWidth: 600 }}>
        <SoldPhoneTable phones={soldPhones} loading={loading} />
      </div>
    </div>
  );
}
