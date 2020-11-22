import React from "react";
import Select from "react-select";
import * as constants from "../utility/data";

// renders the content of cityDetail
export default function CovidHeader(props: any) {
  return (
    <React.Fragment>
      <h1 className="my-4">Covid-19 </h1>
      <h6>
        Get the latest updates on Covid-19 statistics in almost any country.
      </h6>
      <div className="row">
        <Select
          className="col-md-3"
          onChange={(x: any) => props.sortData(x ? x.value : 1)}
          options={constants.covidSortOptions}
          placeholder="Sort by: Country"
          isClearable
          isSearchable={false}
        />
        <Select
          className="col-md-3"
          onChange={(x: any) => props.handleSortChange(x)}
          placeholder="Order: Ascend"
          options={constants.covidOrderOptions}
          isSearchable={false}
        />
        <form className="col-md-5" onSubmit={(e) => props.handleSubmit(e)}>
          <input
            type="text"
            value={props.searchVal}
            placeholder="Search:"
            className="form-control"
            name="searchVal"
            onChange={(e) => props.handleChange(e)}
            disabled={props.searchActive}
          />
        </form>
        <button
          className={`col-md-1 rounded btn-danger ${
            props.searchActive ? "" : "d-none"
          }`}
          onClick={() => props.getData()}
        >
          Cancel
        </button>
      </div>
      <div className="row mt-1 mb-3">
        <Select
          className="col-md-3"
          onChange={(x: any) => {
            props.handleViewChange(x);
          }}
          options={constants.pageViewOptions}
          placeholder="Items Per Page: 9"
          isClearable
          isSearchable={false}
        />
        <Select
          className="col-md-5"
          onChange={(x: any) => props.handleFilter(x)}
          placeholder="Filter: Stats"
          value={props.filters}
          options={constants.covidFilterOptions}
          isMulti
          isSearchable={false}
        />
      </div>
    </React.Fragment>
  );
}
