import { Get, Patch, Post } from '@/Axios/AxiosFunctions';
import { apiHeader, BaseURL } from '@/config/apiUrl';
import { formatNumber, snakeCaseToLower } from '@/Helper/HelperFunction';
import {
  calculateMonthlyPayment,
  mortgageLoanPrincipal,
  reservedAmount,
} from '@/Helper/MorgageCalculation.ts';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Core/Button';
import { DropDown } from '../Core/DropDown';
import { Input } from '../Core/Input';
import RenderToast from '../Core/RenderToast';
import classes from './AddEditReport.module.css';
const AddEditReport = ({ id, setActiveTab }) => {
  const [loading, setLoading] = useState(false);
  // Property Info
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [asking_price, setAskingPrice] = useState(0);
  const [offer_perc, setOfferPerc] = useState(0);
  const [noi, setNoi] = useState(0);
  const [annual_noi_increase, setAnnualNoiIncrease] = useState(0);

  // Loan terms

  const [financing_ltv_perc, setFinancingLtvPerc] = useState(0);
  const [loan_annual_intr, setLoanAnnualIntr] = useState(0);
  const [loan_terms_inyear, setLoanTermsInyear] = useState(0);
  const [number_months_intr_only, setNumberMonthsIntrOnly] = useState(0);
  const [
    first_month_principal_and_intr_payment,
    setFirstMonthPrincipalAndIntrPayment,
  ] = useState(0);

  // Deal Costs and Reserve

  const [bank_fee_and_closing_cost, setDynamicFieldOne] = useState(
    asking_price * offer_perc * 0.25
  ); //view only dynamic_field_one
  const [reserved_dynamic_field_one, setReservedDynamicFieldOne] =
    useState(null);
  const [reserved_amount, setDynamicFieldTwo] = useState(null); //view only dynamic_field_two
  const [reserved_dynamic_field_two, setReservedDynamicFieldTwo] =
    useState(null);

  // Investor Terms
  const [preferred_ann_return_perc, setPreferredAnnReturnPerc] = useState(0);
  const [waterfall_share, setWaterfallShare] = useState(0);

  // Syndi Fees

  const [syndi_origination_fee, setSyndiOriginationFee] = useState(0);
  const [syndi_aum_ann_fee, setSyndiAumAnnFee] = useState(0); //  (1%-5%)
  const [dynamic_drop_down_one, setDynamicDropDownOne] = useState(options[0]); // subtract  (yes or no)
  const [property_manager_fee, setPropertyManagerFee] = useState(0);
  const [dynamic_drop_down_two, setDynamicDropDownTwo] = useState(options[1]); // subtract (yes or no)
  const [syndi_sale_price_fee, setSyndiSalePriceFee] = useState(0);
  const [transaction_and_bank_fee, setTransactionAndBankFee] = useState(0);
  const [realtor_fee, setRealtorFee] = useState(0);

  // Occupancy ,Yearly Projections
  const [occupancy1, setOccupancy1] = useState(0);
  const [occupancy2, setOccupancy2] = useState(0);
  const [occupancy3, setOccupancy3] = useState(0);
  const [occupancy4, setOccupancy4] = useState(0);
  const [occupancy5, setOccupancy5] = useState(0);
  const [occupancy6, setOccupancy6] = useState(0);
  const [occupancy7, setOccupancy7] = useState(0);
  const [occupancy8, setOccupancy8] = useState(0);
  const [occupancy9, setOccupancy9] = useState(0);
  const [occupancy10, setOccupancy10] = useState(0);

  //Cap rates
  const [purchase_cap_rate, setPurchaseCapRate] = useState(
    Number(noi) / (Number(asking_price) * (offer_perc / 100))
  );
  const [year_5_cap_rate, setYear5CapRate] = useState(0);
  const [year_7_cap_rate, setYear7CapRate] = useState(0);
  const [year_10_cap_rate, setYear10CapRate] = useState(0);

  //  Refinance Timing (in Months)
  const [refinance_37_rate, setRefinance37rate] = useState(0);
  const [refinance_37_term_years, setRefinance37Term] = useState(0);
  const [refinance_49_rate, setRefinance49rate] = useState(0);
  const [refinance_49_term_years, setRefinance49Term] = useState(0);
  const [refinance_61_rate, setRefinance61rate] = useState(0);
  const [refinance_61_term_years, setRefinance61Term] = useState(0);
  const { access_token } = useSelector((state) => state.authReducer);
  const getData = async () => {
    setLoading('get-data');
    const apiUrl = BaseURL(`analytics/${id}`);
    const response = await Get(apiUrl, access_token);
    if (response) {
      const data = response?.data?.data;
      setName(data?.name);
      setLocation(data?.location);
      setAskingPrice(data?.asking_price);
      setOfferPerc(data?.offer_perc);
      setNoi(data?.noi);
      setAnnualNoiIncrease(data?.annual_noi_increase);
      setFinancingLtvPerc(data?.financing_ltv_perc);
      setLoanAnnualIntr(data?.loan_annual_intr);
      setLoanTermsInyear(data?.loan_terms_inyear);
      setNumberMonthsIntrOnly(data?.number_months_intr_only);
      setFirstMonthPrincipalAndIntrPayment(
        data?.first_month_principal_and_intr_payment
      );
      setDynamicFieldOne(data?.bank_fee_and_closing_cost);
      setReservedDynamicFieldOne(data?.bank_fee_and_closing_cost);
      setDynamicFieldTwo(data?.reserved_amount);
      setReservedDynamicFieldTwo(data?.reserved_amount);
      setPreferredAnnReturnPerc(data?.preferred_ann_return_perc);
      setWaterfallShare(data?.waterfall_share);
      setSyndiOriginationFee(data?.syndi_origination_fee);
      setSyndiAumAnnFee(data?.syndi_aum_ann_fee);
      setPropertyManagerFee(data?.property_manager_fee);
      setSyndiSalePriceFee(data?.syndi_sale_price_fee);
      setTransactionAndBankFee(data?.transaction_and_bank_fee);
      setRealtorFee(data?.realtor_fee);
      setOccupancy1(data?.occupancy1);
      setOccupancy2(data?.occupancy2);
      setOccupancy3(data?.occupancy3);
      setOccupancy4(data?.occupancy4);
      setOccupancy5(data?.occupancy5);
      setOccupancy6(data?.occupancy6);
      setOccupancy7(data?.occupancy7);
      setOccupancy8(data?.occupancy8);
      setOccupancy9(data?.occupancy9);
      setOccupancy10(data?.occupancy10);
      setPurchaseCapRate(data?.purchase_cap_rate);
      setYear5CapRate(data?.year_5_cap_rate);
      setYear7CapRate(data?.year_7_cap_rate);
      setYear10CapRate(data?.year_10_cap_rate);
      setRefinance37rate(data?.refinance_37_rate);
      setRefinance37Term(data?.refinance_37_term_years);
      setRefinance49rate(data?.refinance_49_rate);
      setRefinance49Term(data?.refinance_49_term_years);
      setRefinance61rate(data?.refinance_61_rate);
      setRefinance61Term(data?.refinance_61_term_years);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  const percentageArray = [
    'offer_perc',
    'annual_noi_increase',
    'financing_ltv_perc',
    'loan_terms_inyear',
    'preferred_ann_return_perc',
    'waterfall_share',
    'syndi_origination_fee',
    'syndi_aum_ann_fee',
    'property_manager_fee',
    'syndi_sale_price_fee',
    'transaction_and_bank_fee',
    'realtor_fee',
  ];
  const handleSubmit = async () => {
    setLoading(true);
    const params = {
      name,
      location,
      asking_price,
      offer_perc,
      noi,
      annual_noi_increase,
      financing_ltv_perc,
      loan_annual_intr,
      loan_terms_inyear,
      number_months_intr_only,
      first_month_principal_and_intr_payment,
      bank_fee_and_closing_cost,
      reserved_amount,
      preferred_ann_return_perc,
      waterfall_share,
      syndi_origination_fee,
      syndi_aum_ann_fee,
      dynamic_drop_down_one: dynamic_drop_down_one.value,
      property_manager_fee,
      dynamic_drop_down_two: dynamic_drop_down_two.value,
      syndi_sale_price_fee,
      transaction_and_bank_fee,
      realtor_fee,
      occupancy1: Number(occupancy1),
      occupancy2: Number(occupancy2),
      occupancy3: Number(occupancy3),
      occupancy4: Number(occupancy4),
      occupancy5: Number(occupancy5),
      occupancy6: Number(occupancy6),
      occupancy7: Number(occupancy7),
      occupancy8: Number(occupancy8),
      occupancy9: Number(occupancy9),
      occupancy10: Number(occupancy10),
      purchase_cap_rate,
      year_5_cap_rate,
      year_7_cap_rate,
      year_10_cap_rate,
      refinance_37_rate: Number(refinance_37_rate),
      refinance_37_term_years: Number(refinance_37_term_years),
      refinance_49_rate: Number(refinance_49_rate),
      refinance_49_term_years: Number(refinance_49_term_years),
      refinance_61_rate: Number(refinance_61_rate),
      refinance_61_term_years: Number(refinance_61_term_years),
    };
    for (let key in params) {
      if (key === 'number_months_intr_only' || key === 'realtor_fee') {
        continue;
      }

      if (!params[key]) {
        RenderToast({
          type: 'error',
          message: `${snakeCaseToLower(key)} can't be empty!`,
        });
        return false;
      }
    }
    const api = id ? BaseURL(`analytics/${id}`) : BaseURL('analytics/create');
    const response = id
      ? await Patch(api, params, apiHeader(access_token))
      : await Post(api, params, apiHeader(access_token));
    if (response) {
      RenderToast({
        type: 'success',
        message: `Report ${id ? 'Updated' : 'Created'} SuccessFully!`,
      });
      if (!id) {
        navigate(`/report`);
      }
      if (id) {
        setActiveTab({
          label: 'Mortgage',
          value: 'mortgage',
        });
      }
    }
    setLoading(false);
  };

  const handleResetAll = () => {
    // Property Info

    setName('');
    setLocation('');
    setAskingPrice('');
    setOfferPerc('');
    setNoi('');
    setAnnualNoiIncrease('');

    // Loan terms

    setFinancingLtvPerc('');
    setLoanAnnualIntr('');
    setLoanTermsInyear('');
    setNumberMonthsIntrOnly('');
    setFirstMonthPrincipalAndIntrPayment('');

    // Deal Costs and Reserve

    setDynamicFieldOne('');
    setReservedDynamicFieldOne('');
    setDynamicFieldTwo('');
    setReservedDynamicFieldTwo('');

    // Investor Terms

    setPreferredAnnReturnPerc('');
    setWaterfallShare('');

    // Syndi Fees

    setSyndiOriginationFee('');
    setSyndiAumAnnFee('');
    setPropertyManagerFee('');
    setSyndiSalePriceFee('');
    setTransactionAndBankFee('');
    setRealtorFee('');

    // Occupancy ,Yearly Projections

    setOccupancy1('');
    setOccupancy2('');
    setOccupancy3('');
    setOccupancy4('');
    setOccupancy5('');
    setOccupancy6('');
    setOccupancy7('');
    setOccupancy8('');
    setOccupancy9('');
    setOccupancy10('');

    //Cap rates

    setPurchaseCapRate('');
    setYear5CapRate('');
    setYear7CapRate('');
    setYear10CapRate('');

    //  Refinance Timing (in Months)

    setRefinance37rate('');
    setRefinance37Term('');
    setRefinance49rate('');
    setRefinance49Term('');
    setRefinance61rate('');
    setRefinance61Term('');
  };
  const handleReset22 = () => {
    setName('');
    setLocation('');
    setAskingPrice('');
    setOfferPerc('');
    setNoi('');
    setAnnualNoiIncrease('');
    setFinancingLtvPerc('');
    setLoanAnnualIntr('');
    setLoanTermsInyear('');
    setNumberMonthsIntrOnly('');
    setFirstMonthPrincipalAndIntrPayment('');
    setDynamicFieldOne('');
    setReservedDynamicFieldOne('');
    setDynamicFieldTwo('');
    setReservedDynamicFieldTwo('');
  };
  const handleResetShort = () => {
    setName('');
    setLocation('');
    setAskingPrice('');
    setOfferPerc('');
    setNoi('');
    setAnnualNoiIncrease('');
  };

  useEffect(() => {
    setDynamicFieldOne(reserved_dynamic_field_one);
  }, [reserved_dynamic_field_one]);
  useEffect(() => {
    setDynamicFieldOne(asking_price * (offer_perc / 100) * (2.5 / 100));
  }, [asking_price, offer_perc]);

  useEffect(() => {
    setPurchaseCapRate(
      (Number(noi) / (Number(asking_price) * (offer_perc / 100))) * 100
    );
  }, [noi, asking_price, offer_perc]);

  useEffect(() => {
    if (
      asking_price &&
      offer_perc &&
      financing_ltv_perc &&
      loan_annual_intr &&
      loan_terms_inyear
    ) {
      const calc_principal = mortgageLoanPrincipal(
        asking_price,
        offer_perc,
        financing_ltv_perc
      );

      const calc_monthlyPmt = calculateMonthlyPayment(
        calc_principal,
        loan_annual_intr,
        loan_terms_inyear
      );

      setDynamicFieldTwo(
        reservedAmount(asking_price, offer_perc, calc_monthlyPmt)
      );
    }
  }, [
    asking_price,
    offer_perc,
    financing_ltv_perc,
    loan_annual_intr,
    loan_terms_inyear,
  ]);
  useEffect(() => {
    setDynamicFieldTwo(reserved_dynamic_field_two);
  }, [reserved_dynamic_field_two]);
  return loading == 'get-data' ? (
    <div className={classes.container}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div className={classes.input_container}>
            <h3 className={classes.header}>
              <Skeleton
                variant='rounded'
                width={'30%'}
                height={30}
                sx={{ mb: 2, mt: 2 }}
              />
            </h3>
            <div className={classes.input__wrapper}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton variant='rounded' width={'100%'} height={55} />
                ))}
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className={classes.container}>
      <div className={classes.input_container}>
        <h3 className={classes.header}>Property Info</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={name}
            setter={setName}
            placeholder={'Enter property name'}
            label={'Property Name'}
          />
          <Input
            value={location}
            setter={setLocation}
            placeholder={'Enter property location'}
            label={'Property Location'}
          />
          <Input
            value={asking_price}
            setter={setAskingPrice}
            placeholder={'Enter asking price'}
            label={"Seller's Asking Price"}
            regexType={'number'}
            rightIcon={<span>$</span>}
          />
          <Input
            value={offer_perc}
            setter={setOfferPerc}
            placeholder={'Enter offer percentage'}
            label={'Anticipated Offer Percentage'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>NOI (Net Operating Income) </h3>
        <div className={classes.input__wrapper}>
          <Input
            value={noi}
            setter={setNoi}
            placeholder={'Enter your NOI(Net Operating Income)'}
            label={'Actual NOI (Yearly)'}
            regexType={'number'}
            rightIcon={<span>$</span>}
          />
          <Input
            value={annual_noi_increase}
            setter={setAnnualNoiIncrease}
            placeholder={'Enter expected annual NOI increase %'}
            label={'NOI Growth Rate (Annual)'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>
      <div className={classes.input_container}>
        <h3 className={classes.header}>Financing Details</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={financing_ltv_perc}
            setter={setFinancingLtvPerc}
            placeholder={'Enter your LTV'}
            label={'Loan-to-Value Ratio (%)'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={loan_annual_intr}
            setter={setLoanAnnualIntr}
            placeholder={'Enter the expected annual interest rate'}
            label={'Loan Interest Rate (Annual) %'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={loan_terms_inyear}
            setter={setLoanTermsInyear}
            placeholder={'Enter the expected loan term in years'}
            label={'Loan Period (Years)'}
            regexType={'number'}
          />
          <Input
            value={number_months_intr_only}
            setter={setNumberMonthsIntrOnly}
            placeholder={
              'Enter the number of months for interest-only payments'
            }
            label={'Interest-Only Period (Months)'}
            regexType={'number'}
          />
          <Input
            value={first_month_principal_and_intr_payment}
            setter={setFirstMonthPrincipalAndIntrPayment}
            placeholder={'Enter first month principal and interest payment'}
            label={'First Loan Payment Month'}
            regexType={'number'}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>Deal Costs and Reserve</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={'$' + formatNumber(bank_fee_and_closing_cost)}
            setter={setDynamicFieldOne}
            disabled
            label={'Transaction Costs (2.5% of Purchase Price)'}
            placeholder={'Calculated Transaction Costs'}
            regexType={'number'}
            rightIcon={<span>$</span>}
          />
          <Input
            value={reserved_dynamic_field_one}
            setter={setReservedDynamicFieldOne}
            label={'Manual Override of Transaction Costs'}
            placeholder={'Enter your manual override of Transaction Costs'}
            regexType={'number'}
            rightIcon={<span>$</span>}
          />
          <Input
            value={'$' + formatNumber(reserved_amount)}
            setter={setDynamicFieldTwo}
            disabled
            label={'Total Reserve Fund (6 Months P&I + 2.5%)'}
            placeholder='Calculated as 6 months P&I payment + 2.5% of purchase price'
            regexType={'number'}
            rightIcon={<span>$</span>}
          />
          <Input
            value={reserved_dynamic_field_two}
            setter={setReservedDynamicFieldTwo}
            label={'Manual Override of Reserve Fund'}
            regexType={'number'}
            placeholder='Enter custom reserve fund value (overrides calculated amount)'
            rightIcon={<span>$</span>}
          />
        </div>
      </div>
      <div className={classes.input_container}>
        <h3 className={classes.header}>Investor Terms</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={preferred_ann_return_perc}
            setter={setPreferredAnnReturnPerc}
            placeholder='Enter the preferred annual return percentage'
            label={'Annual Preferred Return %'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={waterfall_share}
            setter={setWaterfallShare}
            placeholder='Enter capital gains share after prefs'
            label={'Equity Split After Pref Return (%)'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>Acquisition Fees</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={syndi_origination_fee}
            setter={setSyndiOriginationFee}
            placeholder='Enter fee percentage based on total property value'
            label={'Syndicator Origination Fee (%)'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={syndi_aum_ann_fee}
            setter={setSyndiAumAnnFee}
            placeholder='Enter fee percentage based on total property value'
            // label={'Broker Origination Fee (%)'}
            label={'Syndicator’s AUM fee (annual %)'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <DropDown
            value={dynamic_drop_down_one}
            setter={setDynamicDropDownOne}
            options={options}
            label={'Deduct AUM Fee from NOI'}
            regexType={'number'}
          />
          <Input
            value={property_manager_fee}
            setter={setPropertyManagerFee}
            label={"Property Manager's Fee (% of Rental Income)"}
            placeholder='Enter fee as % of rental income (NOI ≈ 20% of gross)'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <DropDown
            value={dynamic_drop_down_two}
            setter={setDynamicDropDownTwo}
            options={options}
            label={'Apply PM Fee Against NOI'}
            regexType={'number'}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>Exit Fees</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={transaction_and_bank_fee}
            setter={setTransactionAndBankFee}
            placeholder='Enter % for legal and bank fees on sale'
            label={'Sale Transaction Charges (%)'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={realtor_fee}
            setter={setRealtorFee}
            label={'Realtor Commission (%)'}
            placeholder="Enter realtor's fee as a % of sale price"
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={syndi_sale_price_fee}
            setter={setSyndiSalePriceFee}
            label={'Syndicator’s Sale Commission (%)'}
            placeholder='Enter fee % based on property sale price'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>Occupancy Rate</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={occupancy1}
            setter={setOccupancy1}
            label={'Year 1 (%)'}
            placeholder={'Enter occupancy rate for year 1'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy2}
            setter={setOccupancy2}
            label={'Year 2 (%)'}
            placeholder={'Enter occupancy rate for year 2'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy3}
            setter={setOccupancy3}
            label={'Year 3 (%)'}
            placeholder={'Enter occupancy rate for year 3'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy4}
            setter={setOccupancy4}
            label={'Year 4 (%)'}
            placeholder={'Enter occupancy rate for year 4'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy5}
            setter={setOccupancy5}
            label={'Year 5 (%)'}
            placeholder={'Enter occupancy rate for year 5'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy6}
            setter={setOccupancy6}
            label={'Year 6 (%)'}
            placeholder={'Enter occupancy rate for year 6'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy7}
            setter={setOccupancy7}
            label={'Year 7 (%)'}
            placeholder={'Enter occupancy rate for year 7'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy8}
            setter={setOccupancy8}
            label={'Year 8 (%)'}
            placeholder={'Enter occupancy rate for year 8'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy9}
            setter={setOccupancy9}
            label={'Year 9 (%)'}
            placeholder={'Enter occupancy rate for year 9'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={occupancy10}
            setter={setOccupancy10}
            label={'Year 10 (%)'}
            placeholder={'Enter occupancy rate for year 10'}
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>Cap rates</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={purchase_cap_rate ? purchase_cap_rate?.toFixed(2) : 0}
            setter={setPurchaseCapRate}
            label={'Purchase Capitalization Rate (%)'}
            placeholder='Enter CAP rate used for purchase valuation'
            disabled
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={year_5_cap_rate}
            setter={setYear5CapRate}
            label={'CAP Rate at Year 5 (%)'}
            placeholder='Enter CAP rate for property value at Year 5'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={year_7_cap_rate}
            setter={setYear7CapRate}
            label={'CAP Rate at Year 7 (%)'}
            placeholder='Enter CAP rate for property value at Year 7'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={year_10_cap_rate}
            setter={setYear10CapRate}
            label={'CAP Rate at Year 10 (%)'}
            placeholder='Enter CAP rate for property value at Year 10'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>

      <div className={classes.input_container}>
        <h3 className={classes.header}>Refinance Timing (in Months)</h3>
        <div className={classes.input__wrapper}>
          <Input
            value={refinance_37_rate}
            setter={setRefinance37rate}
            label={'Refinance Rate (Month 37) %'}
            placeholder='Enter refinance interest rate at month 37'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={refinance_37_term_years}
            setter={setRefinance37Term}
            label={'Refinance Term (Month 37) %'}
            placeholder='Enter the term (in years) for the refinance loan at month 37'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={refinance_49_rate}
            setter={setRefinance49rate}
            label={'Refinance Rate (Month 49) %'}
            placeholder='Enter refinance interest rate at month 49'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={refinance_49_term_years}
            setter={setRefinance49Term}
            label={'Refinance Term (Month 49) %'}
            placeholder='Enter the term (in years) for the refinance loan at month 49'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={refinance_61_rate}
            setter={setRefinance61rate}
            label={'Refinance Rate (Month 61) %'}
            placeholder='Enter refinance interest rate at month 61'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
          <Input
            value={refinance_61_term_years}
            setter={setRefinance61Term}
            label={'Refinance Term (Month 61) %'}
            placeholder='Enter the term (in years) for the refinance loan at month 61'
            regexType={'number'}
            rightIcon={<span>%</span>}
          />
        </div>
      </div>
      <div className={classes.button_container}>
        <Button
          label='Reset short'
          variant='bordered'
          onClick={handleResetShort}
        />
        <Button label='Reset 22' variant='bordered' onClick={handleReset22} />
        <Button label='Reset All' variant='bordered' onClick={handleResetAll} />
        <Button label={id ? 'Update' : 'Create'} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddEditReport;

const options = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
