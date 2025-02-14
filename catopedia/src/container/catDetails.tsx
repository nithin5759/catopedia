import React from "react";
import { FilterToggle, CatGrid } from "@components";
import i18n from "@locales";
import { imageConstants } from "@constants";

const CatDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 flex flex-col gap-4 items-center">
      <div className="flex items-center mb-4 justify-center gap-2">
        <img src={imageConstants.logo} alt="logo" className="h-12 w-12" />
        <div className="text-3xl font-bold  text-center">
          {i18n.t("landing_screen.title")}
        </div>
      </div>
      <div className="mb-6">
        <FilterToggle />
      </div>
      <CatGrid />
    </div>
  );
};

export default CatDetails;
