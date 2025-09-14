import { Post } from "@/Axios/AxiosFunctions";
import { BaseURL } from "@/config/apiUrl";
import { countryCodes, stateCodes } from "@/data/constants";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Button } from "../Core/Button";
import { DropDown } from "../Core/DropDown";
import { Input } from "../Core/Input";
import Tooltip from "../Tooltip";
import classes from "./AddressInput.module.css";

const AddressInput = ({ setAddress, data }) => {
  const [country, setCountry] = useState(data?.country || "");
  const [state, setState] = useState(data?.state || "");
  const [zipCode, setZipCode] = useState(data?.zipCode || "");
  const [suggestions, setSuggestions] = useState([]);
  const [addressVal, setAddressVal] = useState(
    data?.address || data?.address2 || ""
  );
  const [addressLoading, setAddressLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const validateAddress = async () => {
    const params = {
      address: addressVal,
      country: country || "",
      state: state || "",
      zipCode,
    };
    const apiUrl = BaseURL(`users/address-validation`);
    setAddressLoading(true);
    const response = await Post(apiUrl, params);
    if (response) {
      const { data } = response?.data;
      setSuggestions(data);
      setIsOpen(true);
    }
    setAddressLoading(false);
  };
  return (
    <>
      <div className={classes.addressWrapper}>
        <DropDown
          label={"Country"}
          placeholder={"Enter Country"}
          value={countryCodes?.find((ele) => ele?.code === country)}
          setter={(e) => {
            if (e?.code !== country) {
              setState("");
              setZipCode("");
            }
            setCountry(e?.code);
          }}
          options={countryCodes}
          optionValue={"code"}
          optionLabel={"name"}
        />
        <DropDown
          label={"State"}
          placeholder={"Enter State"}
          setter={(e) => setState(e?.code)}
          value={stateCodes[country]?.find((ele) => ele?.code === state)}
          options={stateCodes[country] || []}
          optionValue={"code"}
          optionLabel={"name"}
        />
        <Input
          setter={setZipCode}
          value={zipCode}
          placeholder={"Zip Code"}
          label={"Zip Code"}
        />
        <div className={classes.addressField}>
          <div className={classes.inputField}>
            <Input
              placeholder={"Select Address"}
              value={addressVal}
              setter={setAddressVal}
              inputStyle={{
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
              label={"Address"}
              label2={
                <Tooltip icon={<IoMdInformationCircleOutline />}>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "white",
                      marginBottom: "0px",
                    }}
                  >
                    Enter the address you want to validate. The address should
                    contain the street address, city, state, and zip code.
                  </p>
                </Tooltip>
              }
            />
          </div>
          <Button
            label={addressLoading ? "Searching..." : "Search"}
            onClick={validateAddress}
            customStyle={{
              padding: "13px 25px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
            disabled={addressLoading}
          />
          {suggestions?.length > 0 && isOpen && (
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
              <div className={classes.addressSuggestions}>
                {suggestions?.map((suggestion) => (
                  <p
                    className={classes.address}
                    onClick={() => {
                      setAddress(suggestion);
                      setAddressVal(
                        suggestion?.address || suggestion?.address2
                      );
                      setIsOpen(false);
                    }}
                  >
                    {suggestion?.address + " " + suggestion?.address2}
                  </p>
                ))}
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressInput;
