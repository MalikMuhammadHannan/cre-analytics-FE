import { Get } from '@/Axios/AxiosFunctions';
import TableStructure from '@/components/Core/TableStructure';
import RenderField from '@/components/RenderField';
import { BaseURL } from '@/config/apiUrl';
import {
  valuationsExitValuationHeader,
  valuationsNoiDataHeader,
  valuationsNoRefinanceYear5annualCashFlows,
  valuationsNoRefinanceYear7annualCashFlows,
  valuationsRefinanceYear5_37month,
} from '@/data/data';
import { formatNumber } from '@/Helper/HelperFunction';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Valuation.module.css';
const Valuation = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector((state) => state?.authReducer);
  const getData = async () => {
    setLoading(true);
    const apiUrl = BaseURL(`valuations/${id}`);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setData(response?.data?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
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
          <h3 className={classes.payment__heading}>
            {' '}
            Property Investment Details
          </h3>
          <div className={classes.renderFields}>
            <RenderField
              label={'Purchase Price'}
              value={
                data?.purchasePrice
                  ? '$' + formatNumber(data?.purchasePrice)
                  : 'N/A'
              }
            />
            <RenderField
              label={'Down payment'}
              value={
                data?.downPayment
                  ? '$' + formatNumber(data?.downPayment)
                  : 'N/A'
              }
            />
            <RenderField
              label={'Closing costs'}
              value={
                data?.closingCosts
                  ? '$' + formatNumber(data?.closingCosts)
                  : 'N/A'
              }
            />
            <RenderField
              label={'Reserve'}
              value={data?.reserve ? '$' + formatNumber(data?.reserve) : 'N/A'}
            />
            <RenderField
              label={'Investment'}
              value={
                data?.investment ? '$' + formatNumber(data?.investment) : 'N/A'
              }
            />
          </div>
        </div>
      )}
      <TableStructure
        headerTitle={'Exit Valuation'}
        isLoading={loading}
        tableHeaders={valuationsExitValuationHeader}
        tableContent={data?.exitValuation?.map((item) => ({
          ...item,
          year: (
            <p className={classes.month}>
              {item?.year} <sup>th</sup>
            </p>
          ),
          salePrice: item?.salePrice
            ? '$' + formatNumber(item?.salePrice)
            : 'N/A',
          excessCapitalGains: item?.excessCapitalGains
            ? '$' + formatNumber(item?.excessCapitalGains)
            : 'N/A',
          gpShare: item?.gpShare ? '$' + formatNumber(item?.gpShare) : 'N/A',
          lpPayment: item?.lpPayment
            ? '$' + formatNumber(item?.lpPayment)
            : 'N/A',
          netProceeds: item?.netProceeds
            ? '$' + formatNumber(item?.netProceeds)
            : 'N/A',
          sellingCosts: item?.sellingCosts
            ? '$' + formatNumber(item?.sellingCosts)
            : 'N/A',
          totalProceeds: item?.totalProceeds
            ? '$' + formatNumber(item?.totalProceeds)
            : 'N/A',
        }))}
        customStyle={{ height: '200px' }}
        page={false}
      />
      <TableStructure
        headerTitle={' Net Operating Income '}
        tableHeaders={valuationsNoiDataHeader}
        isLoading={loading}
        tableContent={data?.noiData?.map((item) => ({
          ...item,
          targetNoi: item?.targetNoi
            ? '$' + formatNumber(item?.targetNoi)
            : 'N/A',
          realizedNoi: item?.realizedNoi
            ? '$' + formatNumber(item?.realizedNoi)
            : 'N/A',
        }))}
        customStyle={{ height: '520px' }}
        page={false}
      />
      {/* No Refinance Year 5 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* No Refinance Year 5 */}5 YEAR HOLD NO REFINANCE
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.noRefinanceYear5?.annualizedReturn
                    ? formatNumber(data?.noRefinanceYear5?.annualizedReturn) +
                      '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.noRefinanceYear5?.averageCashOnCash
                    ? formatNumber(data?.noRefinanceYear5?.averageCashOnCash) +
                      '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.noRefinanceYear5?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(data?.noRefinanceYear5?.cashFlowFromClosing)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.noRefinanceYear5?.cashFlowTotal
                    ? '$' + formatNumber(data?.noRefinanceYear5?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.noRefinanceYear5?.irr
                    ? formatNumber(data?.noRefinanceYear5?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.noRefinanceYear5?.totalReturn
                    ? formatNumber(data?.noRefinanceYear5?.totalReturn) + '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsNoRefinanceYear5annualCashFlows}
          tableContent={data?.noRefinanceYear5?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '300px' }}
          page={false}
        />
      </div>

      {/* Refinance Event - Year 5, Month 37 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* Refinance Event - Year 5, Month 37 */}5 YEAR HOLD REFINANCE
              MONTH 37
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.refinanceYear5_37month?.annualizedReturn
                    ? formatNumber(
                        data?.refinanceYear5_37month?.annualizedReturn
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.refinanceYear5_37month?.averageCashOnCash
                    ? formatNumber(
                        data?.refinanceYear5_37month?.averageCashOnCash
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.refinanceYear5_37month?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(
                        data?.refinanceYear5_37month?.cashFlowFromClosing
                      )
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.refinanceYear5_37month?.cashFlowTotal
                    ? '$' +
                      formatNumber(data?.refinanceYear5_37month?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.refinanceYear5_37month?.irr
                    ? formatNumber(data?.refinanceYear5_37month?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.refinanceYear5_37month?.totalReturn
                    ? formatNumber(data?.refinanceYear5_37month?.totalReturn) +
                      '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsRefinanceYear5_37month}
          tableContent={data?.refinanceYear5_37month?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '300px' }}
          page={false}
        />
      </div>

      {/* No Refinance Year 7 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* No Refinance Year 7 */}7 YEAR HOLD NO REFINANCE
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.noRefinanceYear7?.annualizedReturn
                    ? formatNumber(data?.noRefinanceYear7?.annualizedReturn) +
                      '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.noRefinanceYear7?.averageCashOnCash
                    ? formatNumber(data?.noRefinanceYear7?.averageCashOnCash) +
                      '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.noRefinanceYear7?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(data?.noRefinanceYear7?.cashFlowFromClosing)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.noRefinanceYear7?.cashFlowTotal
                    ? '$' + formatNumber(data?.noRefinanceYear7?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.noRefinanceYear7?.irr
                    ? formatNumber(data?.noRefinanceYear7?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.noRefinanceYear7?.totalReturn
                    ? formatNumber(data?.noRefinanceYear7?.totalReturn) + '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsNoRefinanceYear7annualCashFlows}
          tableContent={data?.noRefinanceYear7?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '350px' }}
          page={false}
        />
      </div>

      {/* Refinance Event - Year 7, Month 37 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* Refinance Event - Year 7, Month 37 */}7 YEAR HOLD REFINANCE
              MONTH 37
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.refinanceYear7_37month?.annualizedReturn
                    ? formatNumber(
                        data?.refinanceYear7_37month?.annualizedReturn
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.refinanceYear7_37month?.averageCashOnCash
                    ? formatNumber(
                        data?.refinanceYear7_37month?.averageCashOnCash
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.refinanceYear7_37month?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(
                        data?.refinanceYear7_37month?.cashFlowFromClosing
                      )
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.refinanceYear7_37month?.cashFlowTotal
                    ? '$' +
                      formatNumber(data?.refinanceYear7_37month?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.refinanceYear7_37month?.irr
                    ? formatNumber(data?.refinanceYear7_37month?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.refinanceYear7_37month?.totalReturn
                    ? formatNumber(data?.refinanceYear7_37month?.totalReturn) +
                      '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsRefinanceYear5_37month}
          tableContent={data?.refinanceYear7_37month?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '400px' }}
          page={false}
        />
      </div>

      {/* Refinance Event - Year 7, Month 49 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* Refinance Event - Year 7, Month 49 */}7 YEAR HOLD REFINANCE
              MONTH 49
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.refinanceYear7_49month?.annualizedReturn
                    ? formatNumber(
                        data?.refinanceYear7_49month?.annualizedReturn
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.refinanceYear7_49month?.averageCashOnCash
                    ? formatNumber(
                        data?.refinanceYear7_49month?.averageCashOnCash
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.refinanceYear7_49month?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(
                        data?.refinanceYear7_49month?.cashFlowFromClosing
                      )
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.refinanceYear7_49month?.cashFlowTotal
                    ? '$' +
                      formatNumber(data?.refinanceYear7_49month?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.refinanceYear7_49month?.irr
                    ? formatNumber(data?.refinanceYear7_49month?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.refinanceYear7_49month?.totalReturn
                    ? formatNumber(data?.refinanceYear7_49month?.totalReturn) +
                      '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsRefinanceYear5_37month}
          tableContent={data?.refinanceYear7_49month?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '400px' }}
          page={false}
        />
      </div>
      {/* No Refinance Year 10 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* No Refinance Year 10 */}
              10 YEAR HOLD NO REFINANCE
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.noRefinanceYear10?.annualizedReturn
                    ? formatNumber(data?.noRefinanceYear10?.annualizedReturn) +
                      '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.noRefinanceYear10?.averageCashOnCash
                    ? formatNumber(data?.noRefinanceYear10?.averageCashOnCash) +
                      '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.noRefinanceYear10?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(data?.noRefinanceYear10?.cashFlowFromClosing)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.noRefinanceYear10?.cashFlowTotal
                    ? '$' + formatNumber(data?.noRefinanceYear10?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.noRefinanceYear10?.irr
                    ? formatNumber(data?.noRefinanceYear10?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.noRefinanceYear10?.totalReturn
                    ? formatNumber(data?.noRefinanceYear10?.totalReturn) + '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsNoRefinanceYear7annualCashFlows}
          tableContent={data?.noRefinanceYear10?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '300px' }}
          page={false}
        />
      </div>

      {/* Refinance Event - Year 10, Month 37 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* Refinance Event - Year 10, Month 37 */}
              10 YEAR HOLD REFINANCE MONTH 37
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.refinanceYear10_37month?.annualizedReturn
                    ? formatNumber(
                        data?.refinanceYear10_37month?.annualizedReturn
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.refinanceYear10_37month?.averageCashOnCash
                    ? formatNumber(
                        data?.refinanceYear10_37month?.averageCashOnCash
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.refinanceYear10_37month?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(
                        data?.refinanceYear10_37month?.cashFlowFromClosing
                      )
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.refinanceYear10_37month?.cashFlowTotal
                    ? '$' +
                      formatNumber(data?.refinanceYear10_37month?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.refinanceYear10_37month?.irr
                    ? formatNumber(data?.refinanceYear10_37month?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.refinanceYear10_37month?.totalReturn
                    ? formatNumber(data?.refinanceYear10_37month?.totalReturn) +
                      '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsRefinanceYear5_37month}
          tableContent={data?.refinanceYear10_37month?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '400px' }}
          page={false}
        />
      </div>

      {/* Refinance Event - Year 10, Month 49 */}
      <div className={classes.exit_wrapper}>
        {loading ? (
          <div className={classes.exit_wrapper}>
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
          <>
            <h3 className={classes.payment__heading}>
              {/* Refinance Event - Year 10, Month 49 */}
              10 YEAR HOLD REFINANCE MONTH 49
            </h3>
            <div className={classes.renderFields}>
              <RenderField
                label={'Annualized Return (%)'}
                value={
                  data?.refinanceYear10_month49?.annualizedReturn
                    ? formatNumber(
                        data?.refinanceYear10_month49?.annualizedReturn
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Average Cash on Cash Return (%)'}
                value={
                  data?.refinanceYear10_month49?.averageCashOnCash
                    ? formatNumber(
                        data?.refinanceYear10_month49?.averageCashOnCash
                      ) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Cash Flow from Closing ($)'}
                value={
                  data?.refinanceYear10_month49?.cashFlowFromClosing
                    ? '$' +
                      formatNumber(
                        data?.refinanceYear10_month49?.cashFlowFromClosing
                      )
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Cash Flow Over Period ($)'}
                value={
                  data?.refinanceYear10_month49?.cashFlowTotal
                    ? '$' +
                      formatNumber(data?.refinanceYear10_month49?.cashFlowTotal)
                    : 'N/A'
                }
              />
              <RenderField
                label={'Internal Rate of Return (IRR) (%)'}
                value={
                  data?.refinanceYear10_month49?.irr
                    ? formatNumber(data?.refinanceYear10_month49?.irr) + '%'
                    : 'N/A'
                }
              />
              <RenderField
                label={'Total Return on Investment (%)'}
                value={
                  data?.refinanceYear10_month49?.totalReturn
                    ? formatNumber(data?.refinanceYear10_month49?.totalReturn) +
                      '%'
                    : 'N/A'
                }
              />
            </div>
          </>
        )}
        <TableStructure
          isLoading={loading}
          tableHeaders={valuationsRefinanceYear5_37month}
          tableContent={data?.refinanceYear10_month49?.annualCashFlows?.map(
            (item) => ({
              ...item,
              year: (
                <p className={classes.month}>
                  {item?.year} <sup>th</sup>
                </p>
              ),
              cashFlow: item?.cashFlow
                ? '$' + formatNumber(item?.cashFlow)
                : 'N/A',
              aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
              cashOnCashReturn: item?.cashOnCashReturn
                ? '$' + formatNumber(item?.cashOnCashReturn)
                : 'N/A',
              noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
              propertyManagementFee: item?.propertyManagementFee
                ? '$' + formatNumber(item?.propertyManagementFee)
                : 'N/A',
              debtService: item?.debtService
                ? '$' + formatNumber(item?.debtService)
                : 'N/A',
            })
          )}
          customStyle={{ height: '400px' }}
          page={false}
        />
      </div>

      {
        /* Refinance Event - Year 10, Month 61 */
        <div className={classes.exit_wrapper}>
          {loading ? (
            <div className={classes.exit_wrapper}>
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
            <>
              <h3 className={classes.payment__heading}>
                {/* Refinance Event - Year 10, Month 61 */}
                10 YEAR HOLD REFINANCE MONTH 61
              </h3>
              <div className={classes.renderFields}>
                <RenderField
                  label={'Annualized Return (%)'}
                  value={
                    data?.refinanceYear10_month61?.annualizedReturn
                      ? formatNumber(
                          data?.refinanceYear10_month61?.annualizedReturn
                        ) + '%'
                      : 'N/A'
                  }
                />
                <RenderField
                  label={'Average Cash on Cash Return (%)'}
                  value={
                    data?.refinanceYear10_month61?.averageCashOnCash
                      ? formatNumber(
                          data?.refinanceYear10_month61?.averageCashOnCash
                        ) + '%'
                      : 'N/A'
                  }
                />
                <RenderField
                  label={'Cash Flow from Closing ($)'}
                  value={
                    data?.refinanceYear10_month61?.cashFlowFromClosing
                      ? '$' +
                        formatNumber(
                          data?.refinanceYear10_month61?.cashFlowFromClosing
                        )
                      : 'N/A'
                  }
                />
                <RenderField
                  label={'Total Cash Flow Over Period ($)'}
                  value={
                    data?.refinanceYear10_month61?.cashFlowTotal
                      ? '$' +
                        formatNumber(
                          data?.refinanceYear10_month61?.cashFlowTotal
                        )
                      : 'N/A'
                  }
                />
                <RenderField
                  label={'Internal Rate of Return (IRR) (%)'}
                  value={
                    data?.refinanceYear10_month61?.irr
                      ? formatNumber(data?.refinanceYear10_month61?.irr) + '%'
                      : 'N/A'
                  }
                />
                <RenderField
                  label={'Total Return on Investment (%)'}
                  value={
                    data?.refinanceYear10_month61?.totalReturn
                      ? formatNumber(
                          data?.refinanceYear10_month61?.totalReturn
                        ) + '%'
                      : 'N/A'
                  }
                />
              </div>
            </>
          )}

          <TableStructure
            isLoading={loading}
            tableHeaders={valuationsRefinanceYear5_37month}
            tableContent={data?.refinanceYear10_month61?.annualCashFlows?.map(
              (item) => ({
                ...item,
                year: (
                  <p className={classes.month}>
                    {item?.year} <sup>th</sup>
                  </p>
                ),
                cashFlow: item?.cashFlow
                  ? '$' + formatNumber(item?.cashFlow)
                  : 'N/A',
                aumFee: item?.aumFee ? '$' + formatNumber(item?.aumFee) : 'N/A',
                cashOnCashReturn: item?.cashOnCashReturn
                  ? '$' + formatNumber(item?.cashOnCashReturn)
                  : 'N/A',
                noi: item?.noi ? '$' + formatNumber(item?.noi) : 'N/A',
                propertyManagementFee: item?.propertyManagementFee
                  ? '$' + formatNumber(item?.propertyManagementFee)
                  : 'N/A',
                debtService: item?.debtService
                  ? '$' + formatNumber(item?.debtService)
                  : 'N/A',
              })
            )}
            customStyle={{ height: '450px' }}
            page={false}
          />
        </div>
      }
    </div>
  );
};

export default Valuation;
