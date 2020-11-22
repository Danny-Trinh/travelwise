import React from "react";
import Select from "react-select";
import * as constants from "../utility/data";

// renders the content of cityDetail
export default function AirportDetailContent(props: any) {
  return (
    <React.Fragment>
      <h1 className="my-4">Cities </h1>
      <h6>
        Search for your destination to get comprehensive danger scores in a
        number of categories.
      </h6>
      <p>Note: Lower score is better, 0 means N/A.</p>
      <div className="row">
        <Select
          className="col-md-3"
          onChange={(x: any) => props.sortData(x ? x.value : 1)}
          options={constants.citySortOptions}
          placeholder="Sort by: City"
          isClearable
          isSearchable={false}
        />
        <Select
          className="col-md-3"
          onChange={(e: any) => props.handleSortChange(e)}
          placeholder="Order: Ascend"
          options={constants.cityOrderOptions}
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
          onChange={(e: any) => props.handleViewChange(e)}
          options={constants.pageViewOptions}
          placeholder="Items Per Page: 9"
          isClearable
          isSearchable={false}
        />
        <Select
          className="col-md-5"
          onChange={(x: any) => props.handleFilter(x)}
          placeholder="Filter: Country"
          value={props.filters}
          options={constants.cityFilterOptions}
          isMulti
        />
      </div>
    </React.Fragment>
  );
}
