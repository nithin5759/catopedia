import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "@reducers";
import i18n from "@locales";
import { RootState } from "../../store/store";
import Switch from "@mui/material/Switch"; 
import { FormControlLabel } from "@mui/material";

const FilterToggle = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.cat.filter);

  return (
    <div className="flex items-center space-x-2">
      <FormControlLabel
        control={
          <Switch
            checked={filter}
            onChange={() => dispatch(toggleFilter())}
            color="primary"
          />
        }
        label={i18n.t("landing_screen.show")}
        labelPlacement="start"
      />
    </div>
  );
};

export default FilterToggle;
