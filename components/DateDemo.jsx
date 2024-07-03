import { createConnector } from "react-instantsearch-dom";

const defaultAvailabilityDates = ["2023-06-30", "2024-03-01"];
const demo = createConnector({
  displayName: "BEGIN_VALIDITY_DTTM ",
  getProvidedProps: (props, searchState) => {
    return {
      BEGIN_VALIDITY_DTTM:
        searchState.availabilityDates || defaultAvailabilityDates,
    };
  },
  refine: (props, searchState, nextValue) => {
    return {
      ...searchState,
      BEGIN_VALIDITY_DTTM: nextValue,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    const { availabilityDates = defaultAvailabilityDates } = searchState;
    return searchParameters
      .addNumericRefinement(
        "BEGIN_VALIDITY_DTTM ",
        "<=",
        new Date(availabilityDates[0]).getTime()
      )
      .addNumericRefinement(
        "BEGIN_VALIDITY_DTTM ",
        ">=",
        new Date(availabilityDates[1]).getTime()
      );
  },
});

export const AvailabilityDates = demo(({ availabilityDates, refine }) => {
  return (
    <div>
      <input
        type="date"
        value={availabilityDates[0]}
        onChange={(e) => {
          refine([e.target.value, availabilityDates[1]]);
        }}
      ></input>
      <input
        type="date"
        value={availabilityDates[1]}
        onChange={(e) => {
          refine([availabilityDates[0], e.target.value]);
        }}
      ></input>
    </div>
  );
});
