import { NextRequest, NextResponse } from "next/server";
import API from "@searchkit/api";

///https://8a39c3a521e545e8b2621f31370a6de3.us-east-2.aws.elastic-cloud.com:443

///key NC0xTVU1QUIyeHZkS05vTFI2S3U6TkI1cWVfRjhSSDYxNEN2V2N4Nnk3dw==

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const apiClient = API(
  {
    connection: {
      host: "https://3.234.18.177:9200/",
      auth: {
        username: "elastic",
        password: "I5225p8ZRyhfMJU3ICZM",
      },
      withCredentials: false,
    },
    search_settings: {
      highlight_attributes: ["GOOD_CAUSE_STATUS"],
      snippet_attributes: ["MA_COVERAGE_GROUP:200"],
      search_attributes: [
        { field: "GOOD_CAUSE_STATUS", weight: 3 },
        { field: "MA_COVERAGE_GROUP", weight: 3 },
        { field: "CASE_TYPE", weight: 3 },
        { field: "REFERRAL_STATUS", weight: 3 },
        { field: "ReferralPerson.Address.ADDR_TYPE", weight: 3 },
        { field: "ReferralPerson.PROGRAM_TYPE", weight: 3 },
        { field: "STATUS", weight: 3 },
      ],
      result_attributes: ["GOOD_CAUSE_STATUS", "MA_COVERAGE_GROUP"],
      facet_attributes: [
        {
          attribute: "CASE_TYPE",
          field: "CASE_TYPE.keyword",
          type: "string",
        },
        {
          attribute: "GOOD_CAUSE_STATUS",
          field: "GOOD_CAUSE_STATUS.keyword",
          type: "string",
        },
        {
          attribute: "REFERRAL_STATUS",
          field: "REFERRAL_STATUS.keyword",
          type: "string",
        },
        {
          attribute: "CLOSURE_REASON",
          field: "CLOSURE_REASON.keyword",
          type: "string",
        },
        {
          attribute: "COOPERATION",
          field: "COOPERATION.keyword",
          type: "string",
        },
        {
          attribute: "MA_COVERAGE_GROUP",
          field: "MA_COVERAGE_GROUP.keyword",
          type: "string",
        },
        {
          attribute: "OTHER_INAPPR_REASON_DESC",
          field: "OTHER_INAPPR_REASON_DESC.keyword",
          type: "string",
        },
        {
          attribute: "OTHER_REJECT_REASON_DESC",
          field: "OTHER_REJECT_REASON_DESC.keyword",
          type: "string",
        },
        {
          attribute: "PROGRAM_CASE_NUMB",
          field: "PROGRAM_CASE_NUMB.keyword",
          type: "string",
        },
        {
          attribute: "PROGRAM_OFFICE",
          field: "PROGRAM_OFFICE.keyword",
          type: "string",
        },
        {
          attribute: "REFERRAL_REASON",
          field: "REFERRAL_REASON.keyword",
          type: "string",
        },
        {
          attribute: "ReferralPerson.Address.ADDR_TYPE",
          field: "ReferralPerson.Address.ADDR_TYPE.keyword",
          type: "string",
        },
        {
          attribute: "ReferralPerson.PROGRAM_TYPE",
          field: "ReferralPerson.PROGRAM_TYPE.keyword",
          type: "string",
        },
        {
          attribute: "ReferralPerson.CLIENT_STATUS",
          field: "ReferralPerson.CLIENT_STATUS.keyword",
          type: "string",
        },
        {
          attribute: "STATUS",
          field: "STATUS.keyword",
          type: "string",
        },
        {
          attribute: "ReferralPerson.HEIGHT_FEET_NUMB",
          field: "ReferralPerson.HEIGHT_FEET_NUMB.keyword",
          type: "numeric",
        },
        {
          attribute: "BEGIN_VALIDITY_DTTM",
          field: "BEGIN_VALIDITY_DTTM.keyword",
          type: "date",
        },
      ],

      filter_attributes: [
        {
          attribute: "END_VALIDITY_DTTM",
          field: "END_VALIDITY_DTTM",
          type: "date",
        },
      ],
      query_rules: [
        {
          id: "default-state",
          conditions: [[]],
          actions: [
            {
              action: "RenderFacetsOrder",
              facetAttributesOrder: [
                "CASE_TYPE",
                "GOOD_CAUSE_STATUS",
                "REFERRAL_STATUS",
                "CLOSURE_REASON",
                "COOPERATION",
                "MA_COVERAGE_GROUP",
                "OTHER_INAPPR_REASON_DESC",
                "OTHER_REJECT_REASON_DESC",
                "PROGRAM_CASE_NUMB",
                "PROGRAM_OFFICE",
                "REFERRAL_REASON",
                "ReferralPerson.Address.ADDR_TYPE",
                "ReferralPerson.PROGRAM_TYPE",
                "ReferralPerson.CLIENT_STATUS",
                "STATUS",
                "ReferralPerson.HEIGHT_FEET_NUMB",
              ],
            },
          ],
        },
        {
          id: "GOOD_CAUSE_STATUS-search",
          conditions: [
            [
              {
                context: "query",
                value: "ReferralPerson.ALIAS_FIRST_NAME",
                match_type: "exact",
              },
              {
                context: "query",
                value: "ReferralPerson.FIRST_NAME",
                match_type: "exact",
              },
              {
                context: "query",
                value: "ReferralPerson.LAST_NAME",
                match_type: "exact",
              },
              {
                context: "query",
                value: "ReferralPerson.ALIAS_LAST_NAME",
                match_type: "exact",
              },
            ],
          ],
          actions: [
            {
              action: "QueryRewrite",
              query: "",
            },
            // {
            //   action: 'QueryFilter',
            //   query: 'price:[0 TO 500] AND categories:TVs'
            // },
            {
              action: "QueryBoost",
              query: "GOOD_CAUSE_STATUS:PENDING",
              weight: 10,
            },
          ],
        },
        {
          id: "tv-categories-facet",
          conditions: [
            [
              {
                context: "filterPresent",
                values: [
                  {
                    attribute: "categories.lvl1",
                    value: "TV & Home Theater > TVs",
                  },
                ],
              },
            ],
          ],
          actions: [
            {
              action: "RenderFacetsOrder",
              facetAttributesOrder: [
                "categories.lvl0",
                "categories.lvl1",
                "categories.lvl2",
                "brand",
                "price",
              ],
            },
          ],
        },
        {
          id: "tv-categories-banner",
          conditions: [
            [
              {
                context: "filterPresent",
                values: [
                  {
                    attribute: "categories.lvl1",
                    value: "TV & Home Theater > TVs",
                  },
                ],
              },
            ],
          ],
          actions: [
            {
              action: "RenderUserData",
              userData: JSON.stringify({
                title: "We have TVs!",
                body: "Check out our TVs",
                url: "https://www.samsung.com",
              }),
            },
          ],
        },
      ],
    },
  },
  { debug: true }
);

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  try {
    const results = await apiClient.handleRequest(data);

    //console.log(results);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error establishing connection:", error);
  }
}
