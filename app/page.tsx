"use client";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Stats,
  Snippet,
  CurrentRefinements,
  Configure,
  DynamicWidgets,
} from "react-instantsearch";
import Client from "@searchkit/instantsearch-client";
import { MdClose, MdOutlineSettings } from "react-icons/md";
import style from "../styles/home.module.css";
import { useEffect, useState } from "react";
import { facets } from "@/utils/facetsOption";
import CustomCheckBox from "../components/CustomCheckBox";
import { availablefacets } from "@/utils/options";
import { AvailabilityDates } from "@/components/DateDemo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const searchClient = Client({
  url: "/api/search",
});

const HitView = (props: any) => {
  //console.log(props?.hit, "perwoieoi");

  return (
    <div className="">
      <div className="hit__details">
        <h2 className="text-lg font-semibold capitalize ">
          <Highlight attribute="GOOD_CAUSE_STATUS" hit={props.hit} />
        </h2>
        <Snippet
          className="lowercase "
          attribute="MA_COVERAGE_GROUP"
          hit={props.hit}
        />
      </div>
    </div>
  );
};

const Panel = ({ header, children }: any) => (
  <div className="mt-5 panel">
    <h5 className="font-semibold ">{header}</h5>
    {children}
  </div>
);

export default function Web() {
  const [isOpen, setIsOpen] = useState(false);
  const [facetsList, setFacetsList] = useState(facets);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isApplyDateFilter, setIsApplyDateFilter] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date(new Date()));
  const [startTimestamp, setStartTimestamp] = useState<Number>();
  const [endTimestamp, setEndTimestamp] = useState<Number>();
  useEffect(() => {
    setStartTimestamp(Math.floor(new Date(startDate).getTime() / 1000));
    setEndTimestamp(Math.floor(new Date(endDate).getTime() / 1000));
  }, [startDate, endDate]);

  const toggleFacet = (title: string, key: string) => {
    setFacetsList((prevFacets) => {
      const index = prevFacets.findIndex((facet) => facet.title === title);

      if (index === -1) {
        // If the title does not exist, add the new facet
        return [...prevFacets, { title: title, key: key }];
      } else {
        // If the title exists, remove the existing facet
        return prevFacets.filter((facet) => facet.title !== title);
      }
    });
  };

  return (
    <div className=" max-w-[80rem] mx-auto pt-10 px-10">
      <InstantSearch indexName="pdrf_json" searchClient={searchClient} routing>
        <Configure hitsPerPage={15} />

        <div className="">
          <div className="search-panel ">
            <div className="search-panel__filters ">
              <div className="py-2 border-b setting_heading border-b-purple-400">
                <h3 className="font-semibold ">Settings</h3>
                <div>
                  <MdOutlineSettings
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="setting_icon"
                  />
                </div>
              </div>
              {isOpen && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center bg-black/40">
                  <div className=" overflow-hidden z-30 bg-white h-[100%]  w-[100%] relative">
                    <div className="flex flex-row justify-between p-2 mt-1 border-t border-b border-purple-600 ">
                      <h4 className="font-semibold ">Update facets</h4>
                      <MdClose
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="text-lg cursor-pointer "
                      />
                    </div>
                    <div className="px-1  h-[90%] text-sm   ">
                      {availablefacets?.map((item, index) => (
                        <div className="flex flex-row items-center my-1 ">
                          <CustomCheckBox
                            isChecked={facetsList?.some(
                              (it) => it.title === item
                            )}
                            handleChecked={() => {
                              toggleFacet(item, item);
                            }}
                          />
                          <h3 className=" w-[4rem]">{item}</h3>
                        </div>
                      ))}

                      <div className="pl-2 ">
                        <h3 className="font-medium ">Referral Person</h3>
                        <div className="pl-2 ">
                          <div className="flex flex-row items-center my-1 ">
                            <CustomCheckBox
                              isChecked={facetsList?.some(
                                (it) =>
                                  it.title === "Referral Person ADDRESS_TYPE"
                              )}
                              handleChecked={() => {
                                toggleFacet(
                                  "Referral Person ADDRESS_TYPE",
                                  "ReferralPerson.Address.ADDR_TYPE"
                                );
                              }}
                            />
                            <h3 className=" w-[4rem]">ADDRESS_TYPE</h3>
                          </div>
                          <div className="flex flex-row items-center my-1 ">
                            <CustomCheckBox
                              isChecked={facetsList?.some(
                                (it) =>
                                  it.title === "Referral Person PROGRAM_TYPE"
                              )}
                              handleChecked={() => {
                                toggleFacet(
                                  "Referral Person PROGRAM_TYPE",
                                  "ReferralPerson.PROGRAM_TYPE"
                                );
                              }}
                            />
                            <h3 className=" w-[4rem]">PROGRAM_TYPE</h3>
                          </div>
                          <div className="flex flex-row items-center my-1 ">
                            <CustomCheckBox
                              isChecked={facetsList?.some(
                                (it) =>
                                  it.title === "Referral Person CLIENT_STATUS"
                              )}
                              handleChecked={() => {
                                toggleFacet(
                                  "Referral Person CLIENT_STATUS",
                                  "ReferralPerson.CLIENT_STATUS"
                                );
                              }}
                            />
                            <h3 className=" w-[4rem]">CLIENT_STATUS</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="absolute bottom-0 left-0 right-0 ">
                      <div className="flex flex-row items-center justify-between px-3 py-2 ">
                        <button
                          onClick={() => setIsOpen((prev) => !prev)}
                          className=" bg-gray-300 px-4 rounded py-0.5 text-gray-600"
                        >
                          Cancel
                        </button>
                        <button className=" bg-blue-300 px-4 rounded py-0.5 text-blue-700">
                          Apply
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              )}

              <DynamicWidgets facets={["*"]}>
                {facetsList?.map((item, index) => (
                  <div key={index}>
                    <Panel header={item.title}>
                      <RefinementList attribute={item?.key} />
                    </Panel>
                  </div>
                ))}

                {/* <Panel header="FILTER BY DATES">
                  <RangeInput attribute="ReferralPerson.HEIGHT_FEET_NUMB" />
                </Panel> */}
              </DynamicWidgets>
              {/* <Configure
                numericRefinements={{
                  END_VALIDITY_DTTM: {
                    ">=": [Number(startDate)], // Filter items created after January 1, 2023
                    // "<=": [Number(toDate)], // and before July 1, 2023
                  },
                }}
              /> */}

              {isApplyDateFilter && (
                <Configure
                  numericRefinements={{
                    END_VALIDITY_DTTM: {
                      ">=": [startTimestamp],
                      "<=": [endTimestamp],
                    },
                  }}
                />
              )}

              <Panel header="FILTER BY DATES">
                <div className="flex flex-row justify-between py-2 ">
                  <div className="w-[40%] ">
                    <p className="text-sm font-semibold ">From</p>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="w-full py-1 pl-2 my-1 text-sm border-2 border-gray-300 rounded-md outline-none"
                    />
                  </div>
                  <div className="w-[40%] ">
                    <p className="text-sm font-semibold ">To</p>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      className="w-full py-1 pl-2 my-1 text-sm border-2 border-gray-300 rounded-md outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setIsApplyDateFilter(!isApplyDateFilter)}
                  className="flex items-center self-end justify-center w-1/2 pt-0.5 pb-1 text-gray-800 mt-3 text-sm bg-gray-300 rounded "
                >
                  {isApplyDateFilter ? "Clear filter" : " Apply Filter"}
                </button>
                {/* <div className="flex flex-col mt-2 gap-y-2 ">
                  <input
                    type="date"
                    className="outline-none "
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                    }}
                  />
                  <input
                    type="date"
                    value={toDate}
                    className="outline-none "
                    onChange={(e) => {
                      setToDate(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => setIsApplyDateFilter(!isApplyDateFilter)}
                    className="flex items-center self-end justify-center w-1/2 pt-0.5 pb-1 text-gray-800 mt-3 text-sm bg-gray-300 rounded "
                  >
                    Apply Filter
                  </button>
                </div> */}
              </Panel>
            </div>
            <div className="search-panel__results">
              <div className="">
                <SearchBox />
              </div>
              <div className="mt-2 mb-3 ">
                <div className="py-2 ">
                  <CurrentRefinements />
                </div>
                <Stats />
              </div>
              {/* <QueryRulesBanner /> */}

              <div className="">
                <Hits hitComponent={HitView} />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
