import { useState } from 'react';
import { Country, State, City } from 'country-state-city';

const useLocationData = () => {
  const countries=Country.getAllCountries();
  const countryNames=countries.map(country=>country.name);
  const countryCodes=countries.map(country=>country.isoCode);

  const [selectedCountryCode,setSelectedCountryCode]=useState('');
  const [states,setStates]=useState([]);
  const [selectedStateCode,setSelectedStateCode]=useState('');
  const [city,setCity]=useState([]);

  const handleCountryChange=(e)=>{
    const countryCode=e.target.value;
    setSelectedCountryCode(countryCode);

    if(countryCode){
      const statesData=State.getStatesOfCountry(countryCode);
      setStates(statesData);
      setCity([]);
    }
  }

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedStateCode(stateCode);

    if (stateCode && selectedCountryCode) {
      const citiesData = City.getCitiesOfState(selectedCountryCode, stateCode);
      setCity(citiesData);
    }
  };

  return {
    countries,
    countryNames,
    countryCodes,
    states,
    city,
    handleCountryChange,
    handleStateChange,
  };
}

export default useLocationData