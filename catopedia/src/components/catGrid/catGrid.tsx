import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { CircularProgress } from "@mui/material";
import { PAGE_SIZE_VALUES, WIDTH_VALUES } from "@constants";
import i18n from "@locales";
import { CatService } from "../../services/catServices";
import { RootState } from "../../store/store";

const PAGE_SIZE = PAGE_SIZE_VALUES.TOTAL_PAGE_SIZE;

const CatGrid = () => {
  const [page, setPage] = useState(PAGE_SIZE_VALUES.INITIAL_PAGE);
  const [columnWidth, setColumnWidth] = useState(WIDTH_VALUES.SECONDARY_WIDTH);
  const filter = useSelector((state: RootState) => state.cat.filter);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cats", page, filter],
    queryFn: () => CatService.fetchCats(page, PAGE_SIZE, filter),
    retry: PAGE_SIZE_VALUES.INDEX_LIMIT,
  });

  useEffect(() => {
    const updateColumnWidth = () => {
      if (window.innerWidth < WIDTH_VALUES.MAX_WIDTH) {
        setColumnWidth(WIDTH_VALUES.PRIMARY_WIDTH);
      } else {
        setColumnWidth(WIDTH_VALUES.SECONDARY_WIDTH);
      }
    };
    updateColumnWidth();

    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const onPageChange = (event: { page: { skip: number } }) => {
    setPage(event.page.skip / PAGE_SIZE + PAGE_SIZE_VALUES.INITIAL_PAGE);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  if (error) return <p>{i18n.t("landing_screen.error")}</p>;

  const totalPages = Math.ceil(PAGE_SIZE_VALUES.TOTAL_NUMBER / PAGE_SIZE);

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // Function to render the pagination buttons dynamically
  const renderPaginationButtons = () => {
    const buttons = [];
    const showEllipsis = totalPages > PAGE_SIZE_VALUES.ELLIPSIS_LIMIT;
    for (
      let i = PAGE_SIZE_VALUES.INITIAL_PAGE;
      i <= PAGE_SIZE_VALUES.INDEX_LIMIT && i <= totalPages;
      i++
    ) {
      buttons.push(i);
    }

    if (showEllipsis && page > PAGE_SIZE_VALUES.ELLIPSIS_PAGE) {
      buttons.push("...");
    }

    if (
      showEllipsis &&
      page > PAGE_SIZE_VALUES.INDEX_LIMIT &&
      page < totalPages - PAGE_SIZE_VALUES.INITIAL_PAGE
    ) {
      buttons.push(page);
    }

    if (
      showEllipsis &&
      page < totalPages - PAGE_SIZE_VALUES.TOTAL_PAGE_FOR_ELLIPSIS
    ) {
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="p-4 w-fit flex flex-col items-center">
      <Grid
        data={data}
        pageable={false}
        skip={(page - PAGE_SIZE_VALUES.INITIAL_PAGE) * PAGE_SIZE}
        take={PAGE_SIZE}
        onPageChange={onPageChange}
        className="border rounded-lg shadow-lg w-fit p-6"
      >
        <Column
          field="url"
          title={i18n.t("landing_screen.cat_image_title")}
          className="p-4"
          headerClassName="text-2xl text-center w-full"
          cell={(props) => (
            <div className="flex justify-center ">
              <img
                src={props.dataItem.url}
                alt="Cat"
                className="w-[20rem] h-[20rem] m-4 object-cover rounded-lg shadow-md sm:w-[25rem] sm:h-[25rem]"
              />
            </div>
          )}
          width={columnWidth}
        />
      </Grid>
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() =>
            handlePageClick(
              Math.max(
                page - PAGE_SIZE_VALUES.INITIAL_PAGE,
                PAGE_SIZE_VALUES.INITIAL_PAGE
              )
            )
          }
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {i18n.t("landing_screen.previous")}
        </button>
        {renderPaginationButtons().map((button, index) => (
          <React.Fragment key={index}>
            {button === "..." ? (
              <span className="px-4 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageClick(button as number)}
                className={`px-4 py-2 rounded-md ${
                  page === button ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {button}
              </button>
            )}
          </React.Fragment>
        ))}
        <button
          onClick={() => handlePageClick(Math.min(page + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {i18n.t("landing_screen.next")}
        </button>
      </div>
    </div>
  );
};

export default CatGrid;
