import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import * as Popover from "@radix-ui/react-popover";
import classes from "./PlacesInput.module.css";
import { useEffect, useState } from "react";
import { Command } from "cmdk";

export default function PlacesInput({
  setCoordinates,
  setAddress,
  address,
  label,
  placeholder = "Search address",
  setPlaceDetail,
  leftIcon,
}) {
  const [open, setOpen] = useState(false);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  //   handleSelect
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const zipcode = await getZipCode(results[0], false);
    const { lat, lng } = await getLatLng(results[0]);
    let country = "";
    let city = "";
    let state = "";
    let countryCode = "";
    let stateCode = "";
    let zipCode = "";

    let addrComp = results[0].address_components;
    for (let i = 0; i < addrComp.length; ++i) {
      if (addrComp[i].types.includes("administrative_area_level_1")) {
        state = addrComp[i].long_name;
        stateCode = addrComp[i].short_name;
      } else if (addrComp[i].types.includes("locality"))
        city = addrComp[i].long_name;
      else if (addrComp[i].types.includes("country")) {
        country = addrComp[i].long_name;
        countryCode = addrComp[i].short_name;
      }
      //we can break early if we find all three data
      if (state != "" && city != "" && country != "") break;
    }
    setPlaceDetail &&
      setPlaceDetail({ state, city, country, zipcode, stateCode, countryCode });
    setCoordinates && setCoordinates({ lat, lng });
    setAddress(val);
  };
  useEffect(() => {
    setValue(address, false);
    clearSuggestions();
  }, [address]);

  return (
    <Popover.Root open={open} modal={false} onOpenChange={setOpen}>
      <div>
        {label && <label className={classes.labelText}>{label}</label>}
        <Popover.Trigger className={classes.popoverTrigger}>
          <span
            onClick={() => setOpen(!open)}
            style={{
              color: value ? "var(--text-color)" : "var(--placeholder-color)",
              opacity: value ? 1 : 0.5,
            }}
          >
            {value || placeholder}
            {leftIcon && <span>{leftIcon}</span>}
          </span>
        </Popover.Trigger>
      </div>
      <Popover.Content className={classes.popoverContent}>
        <Command className={classes.cmdkDialog}>
          <Command.Input
            placeholder="Search for a place..."
            className={classes.cmdkInput}
            onValueChange={(value) => {
              setValue(value);
              if (value == "") {
                setPlaceDetail && setPlaceDetail(null);
                setCoordinates && setCoordinates(null);
                setAddress && setAddress("");
                setValue("", false);
                clearSuggestions();
              }
            }}
            value={value}
          />
          <Command.List>
            {!ready && <Command.Loading>Hang on…</Command.Loading>}
            <Command.Empty className={classes.cmdkItem}>
              No results found.
            </Command.Empty>
            {status === "OK" &&
              data.length > 0 &&
              data.map(({ place_id, description }) => (
                <Command.Item
                  className={classes.cmdkItem}
                  key={place_id}
                  onSelect={() => {
                    handleSelect(description);
                    setOpen(false); // Close after selection
                  }}
                >
                  {description}
                </Command.Item>
              ))}
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover.Root>
  );
}
