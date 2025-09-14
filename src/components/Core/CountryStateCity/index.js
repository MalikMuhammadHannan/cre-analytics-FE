"use client";
import React from "react";
import { Country, State, City } from "country-state-city";
import { Col } from "react-bootstrap";
import classes from "./CountryStateCity.module.css";
import { DropDown } from "../DropDown";
import { Input } from "../Input";
import { BiBorderRadius } from "react-icons/bi";

const CountryStateCity = ({
  selectedCountry,
  setSelectedCountry,
  countryLabel = "Country",
  countryPlaceholder = "Select Country",
  countryStyle,
  selectedState,
  setSelectedState,
  stateLabel = "State",
  statePlaceholder = "Select State",
  selectedCity,
  setSelectedCity,
  cityLabel = "City",
  cityPlaceholder = "Select City",
  style,
  label,
  columnWidth = 6,
}) => {
  const getStatesOfCountry = (country) => {
    if (typeof country == "string") {
      return State?.getStatesOfCountry(
        Country.getAllCountries()?.find((item) => item?.name == country)
          ?.isoCode,
      );
    } else {
      return State?.getStatesOfCountry(country?.isoCode);
    }
  };
  const getCitiesOfState = (state, country) => {
    if (typeof state == "string") {
      return City.getCitiesOfState(
        Country.getAllCountries()?.find((item) => item?.name == country)
          ?.isoCode,
        State?.getStatesOfCountry(
          Country.getAllCountries()?.find((item) => item?.name == country)
            ?.isoCode,
        )?.find((item) => item?.name == state)?.isoCode,
      );
    } else {
      return City.getCitiesOfState(state?.countryCode, state?.isoCode);
    }
  };
  return (
    <>
      <style>{`
            .DropdownOptionContainer__indicator {
              padding:5px;
            }
      `}</style>
      {setSelectedCountry && (
        <Col md={columnWidth} className={classes.mb16}>
          <DropDown
            options={Country.getAllCountries()}
            label={countryLabel}
            // options={Country.getAllCountries()}
            getOptionLabel={(options) => {
              return options["name"];
            }}
            getOptionValue={(options) => {
              return options["name"];
            }}
            value={
              typeof selectedCountry == "string"
                ? Country.getAllCountries()?.find(
                    (item) => item?.name == selectedCountry,
                  )
                : selectedCountry
            }
            setter={(e) => {
              setSelectedState("");
              setSelectedCity("");
              setSelectedCountry(e);
            }}
            customStyle={{
              // height: '53px',
              border: "1px solid var(--border-color)",
              padding: "7px",

              ...countryStyle,
            }}
            placeholder={countryPlaceholder}
            isSearchable={true}
          />
        </Col>
      )}
      {setSelectedState && (
        <Col md={columnWidth} className={classes.mb16}>
          {getStatesOfCountry(selectedCountry)?.length === 0 &&
          selectedCountry ? (
            <Input
              placeholder={statePlaceholder}
              label={stateLabel}
              value={selectedState}
              setter={setSelectedState}
              inputStyle={{
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
              }}
            />
          ) : (
            <DropDown
              options={getStatesOfCountry(selectedCountry)}
              optionValue={"name"}
              optionLabel={"name"}
              value={
                typeof selectedState == "string"
                  ? State?.getStatesOfCountry(
                      Country.getAllCountries()?.find(
                        (item) => item?.name == selectedCountry,
                      )?.isoCode,
                    )?.find((item) => item?.name == selectedState)
                  : selectedState
              }
              setter={(e) => {
                setSelectedState(e);
                setSelectedCity("");
              }}
              placeholder={statePlaceholder}
              label={stateLabel}
              customStyle={{
                border: "1px solid var(--border-color)",
                padding: "7px",
              }}
            />
          )}
        </Col>
      )}
      {setSelectedCity && (
        <Col md={columnWidth} className={classes.mb16}>
          {(getCitiesOfState(selectedState, selectedCountry)?.length === 0 &&
            selectedState) ||
          (getStatesOfCountry(selectedCountry)?.length === 0 &&
            selectedCountry) ? (
            <Input
              value={selectedCity}
              setter={setSelectedCity}
              label={cityLabel}
              placeholder={cityPlaceholder}
              inputStyle={{
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
              }}
            />
          ) : (
            <DropDown
              options={getCitiesOfState(selectedState, selectedCountry)}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={
                typeof selectedCity == "string"
                  ? City.getCitiesOfState(
                      Country.getAllCountries()?.find(
                        (item) => item?.name == selectedCountry,
                      )?.isoCode,
                      State?.getStatesOfCountry(
                        Country.getAllCountries()?.find(
                          (item) => item?.name == selectedCountry,
                        )?.isoCode,
                      )?.find((item) => item?.name == selectedState)?.isoCode,
                    )?.find((item) => item?.name == selectedCity)
                  : selectedCity
              }
              setter={setSelectedCity}
              placeholder={cityPlaceholder}
              customStyle={{
                border: "1px solid var(--border-color)",
                padding: "7px",
              }}
              label={cityLabel}
            />
          )}
        </Col>
      )}
    </>
  );
};
export default CountryStateCity;
