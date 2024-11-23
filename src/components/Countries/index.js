import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRegionData,
  selectCountry,
} from '../../redux/reducers/regionReducer';
import { fetchCovidData } from '../../redux/reducers/covidReducer';
import Error from '../Error';

function Countries() {
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.region);
  const selectedCountry = useSelector((state) => state.region.selectedCountry);

  console.log(selectedCountry);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRegionData());
      dispatch(fetchCovidData({ selectedCountry }));
    } else {
      dispatch(fetchCovidData({ selectedCountry }));
    }
  }, [selectedCountry, dispatch, status]);

  const handleSelect = (e) => {
    dispatch(selectCountry(e.target.value));
  };

  if (status === 'failed') {
    return <Error error={error} />;
  }

  return (
    <select
      className="py-2 w-64 border-b-2 border-b-slate-500"
      value={selectedCountry}
      onChange={handleSelect}
      disabled={status === 'loading'}
    >
      <option value="" disabled hidden>
        Select a country
      </option>
      {data?.map((item, index) => (
        <option value={item?.iso} key={index}>
          {item?.name}
        </option>
      ))}
    </select>
  );
}

export default Countries;
