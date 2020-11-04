import Paginate from "react-paginate";
import React from "react";

// loads a pagination component given pageCount,perPage, pageClick
export default function PaginateTool(props: any) {
  return (
    <Paginate
      previousLabel={"prev"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={props.pageCount}
      marginPagesDisplayed={0}
      pageRangeDisplayed={props.state.perPage}
      onPageChange={props.handlePageClick}
      breakLinkClassName={"page-link"}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}
