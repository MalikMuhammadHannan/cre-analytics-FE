import { Get } from '@/Axios/AxiosFunctions';
import TableStructure from '@/components/Core/TableStructure';
import RenderField from '@/components/RenderField';
import { BaseURL } from '@/config/apiUrl';
import { mortgageTableHeader2, mortgageTableHeaders } from '@/data/data';
import { formatNumber } from '@/Helper/HelperFunction';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classes from './Mortgage.module.css';
const Mortgage = ({ id }) => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector((state) => state?.authReducer);
  const getData = async () => {
    setLoading(true);
    const apiUrl = BaseURL(`mortgage/${id}`);
    const response = await Get(apiUrl, access_token);
    if (response) {
      setData(response?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const totalYears = 10;
  const result = [
    data?.primaryAndRefinanceData?.primary.reduce(
      (acc, val, i) => {
        acc[`year${i + 1}`] = val;
        return acc;
      },
      { sno: 'Primary' }
    ),
  ];
  data?.primaryAndRefinanceData?.refinanced.forEach(({ month, payments }) => {
    const obj = { sno: month };
    payments.forEach((val, idx) => {
      const yearKey = `year${totalYears - payments.length + idx + 1}`;
      obj[yearKey] = val;
    });
    result.push(obj);
  });

  return (
    <div className={classes.mortgage__wrapper}>
      {loading ? (
        <div className={classes.payment__wrapper}>
          <Skeleton
            variant='rounded'
            width={'30%'}
            height={30}
            sx={{ mb: 2, mt: 2 }}
          />

          <div className={classes.renderFields}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton variant='rounded' width={'100%'} height={55} />
              ))}
          </div>
        </div>
      ) : (
        <div className={classes.payment__wrapper}>
          <h3 className={classes.payment__heading}>Loan Payment Details</h3>
          <div className={classes.renderFields}>
            <RenderField
              label={'Interest-Only Payment'}
              value={'$' + formatNumber(data?.interestOnlyPayment)}
            />
            <RenderField
              label={'Loan Amount'}
              value={'$' + formatNumber(data?.loanAmount)}
            />
            <RenderField
              label={'Monthly Payment'}
              value={'$' + formatNumber(data?.monthlyPayment)}
            />
            <RenderField
              label={'Monthly Rate'}
              value={(data?.monthlyRate * 100).toFixed(2) + '%'}
            />
            <RenderField
              label={'Total Payments'}
              value={formatNumber(data?.totalPayments)}
            />
          </div>
        </div>
      )}

      <TableStructure
        headerTitle={'Refinance Calculation'}
        isLoading={loading}
        tableHeaders={mortgageTableHeaders}
        tableContent={data?.refinanceCalculation?.map((item) => ({
          ...item,
          month: (
            <p className={classes.month}>
              {item?.month} <sup>th</sup>
            </p>
          ),
          mortgage: `$${formatNumber(item?.mortgage)}`,
          capitalLift: `$${formatNumber(item?.capitalLift)}`,
          feesAndCosts: `$${formatNumber(item?.feesAndCosts)}`,
          refinancePMT: `$${formatNumber(item?.refinancePMT)}`,
          value: `$${formatNumber(item?.value)}`,
          capRate: (item?.capRate * 100).toFixed(2) + '%',
        }))}
        customStyle={{ height: '250px' }}
        page={false}
      />

      <TableStructure
        headerTitle={'Primary and Refinance Data'}
        isLoading={loading}
        page={false}
        tableHeaders={mortgageTableHeader2}
        tableContent={result.map((item) => ({
          ...item,
          sno: (
            <p className={classes.month}>
              {item?.sno}
              {item?.sno !== 'Primary' && <sup>th</sup>}
            </p>
          ),
          year1: item?.year1 ? `$${formatNumber(item.year1)}` : null,
          year2: item?.year2 ? `$${formatNumber(item.year2)}` : null,
          year3: item?.year3 ? `$${formatNumber(item.year3)}` : null,
          year4: item?.year4 ? `$${formatNumber(item.year4)}` : null,
          year5: item?.year5 ? `$${formatNumber(item.year5)}` : null,
          year6: item?.year6 ? `$${formatNumber(item.year6)}` : null,
          year7: item?.year7 ? `$${formatNumber(item.year7)}` : null,
          year8: item?.year8 ? `$${formatNumber(item.year8)}` : null,
          year9: item?.year9 ? `$${formatNumber(item.year9)}` : null,
          year10: item?.year10 ? `$${formatNumber(item.year10)}` : null,
        }))}
        customStyle={{ height: '250px' }}
      />
    </div>
  );
};

export default Mortgage;
