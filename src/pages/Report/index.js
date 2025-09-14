import { Delete, Get } from '@/Axios/AxiosFunctions';
import { Button } from '@/components/Core/Button';
import SearchInput from '@/components/Core/SearchInput';
import SideBarSkeleton from '@/components/Core/SideBarSkeleton';
import TableStructure from '@/components/Core/TableStructure';
import { BaseURL } from '@/config/apiUrl';
import useDebounce from '@/CustomHooks/useDebounce';
import { formatNumber } from '@/Helper/HelperFunction';
import AreYouSureModal from '@/modals/AreYouSureModal';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Report.module.css';
const Report = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const debounce = useDebounce(search, 500);
  const [modalShow, setModalShow] = useState(false);
  const { access_token } = useSelector((state) => state?.authReducer);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const getData = async (_page = page) => {
    setLoading('get-data');
    const apiUrl = BaseURL(`analytics/all?search=${search}&page=${_page}`);
    const response = await Get(apiUrl, access_token);
    if (response) {
      setData(response?.data?.data?.data);
      setTotalRecord(response?.data?.data?.totalCount);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading('delete');
    const apiUrl = BaseURL(`analytics/${selectedItem._id}`);
    const response = await Delete(apiUrl, access_token);
    if (response) {
      setData((prev) => prev.filter((item) => item._id !== selectedItem._id));
      setTotalRecord(totalRecord - 1);
      setModalShow(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(1);
  }, [debounce]);
  return (
    <SideBarSkeleton headerHeading={'Report'}>
      <div className={classes.search}>
        <SearchInput
          setter={setSearch}
          value={search}
          placeholder='Search By Property Name or Location'
        />
      </div>
      <TableStructure
        headerHandlers={{
          add: (
            <Button
              label={'Start new Analysis'}
              variant='bordered'
              leftIcon={<MdAdd size={20} />}
              onClick={() => navigate('/report/add')}
            />
          ),
        }}
        tableContent={data.map((item) => ({
          ...item,
          location: (
            <a
              href={item?.location}
              className={classes.location}
              target='_blank'
              rel='noreferrer'
            >
              {item?.location}
            </a>
          ),
          asking_price: `$ ${formatNumber(item?.asking_price)}`,
          offer_perc: `${item?.offer_perc}%`,
          financing_ltv_perc: `${item?.financing_ltv_perc}%`,
          loan_annual_intr: `${item?.loan_annual_intr}%`,
          noi: `$ ${formatNumber(item?.noi)}`,
          reserved_amount: `$ ${formatNumber(item?.reserved_amount)}`,
          action: (
            <div className={classes.action}>
              <MdEdit
                size={16}
                title='Edit'
                onClick={() => navigate(`/report/${item._id}`)}
              />
              <FaEye
                size={16}
                title='View'
                onClick={() => navigate(`/report/${item._id}?type=view`)}
              />
              <RiDeleteBin6Line
                size={16}
                title='Delete'
                onClick={() => {
                  setModalShow(true);
                  setSelectedItem(item);
                }}
              />
            </div>
          ),
        }))}
        page={page}
        setPage={(e) => {
          setPage(e);
          getData(e);
        }}
        totalRecord={totalRecord}
        isLoading={loading === 'get-data'}
        tableHeaders={tableHeader}
        noDataMessage='No Report Found'
      />
      {modalShow && (
        <AreYouSureModal
          setShow={setModalShow}
          show={modalShow}
          onClick={handleDelete}
          isApiCall={loading === 'delete'}
          subTitle='Once you delete this report can’t be recovered'
        />
      )}
    </SideBarSkeleton>
  );
};

export default Report;
const tableHeader = [
  {
    label: 'Property Name',
    value: 'name',
  },
  {
    label: 'Location',
    value: 'location',
  },

  {
    label: 'Asking Price',
    value: 'asking_price',
  },
  {
    label: 'Offer Percent',
    value: 'offer_perc',
  },
  {
    label: 'Financing LTV Percent',
    value: 'financing_ltv_perc',
  },
  {
    label: 'Loan Interest (%)	',
    value: 'loan_annual_intr',
  },
  {
    label: 'Net Operating Income',
    value: 'noi',
  },
  {
    label: 'Reserved Amount',
    value: 'reserved_amount',
  },
  {
    label: '',
    value: 'action',
  },
];
