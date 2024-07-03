export const mySettings = {
  highlight_attributes: [
    "MA_COVERAGE_GROUP",
    "ReferralPerson.FIRST_NAME",
    "ReferralPerson.LAST_NAME",
    "Employer.OTHER_PARTY_NAME",
    "Insurance.POLICY_HOLDER_NAME",
  ], // Fields where search terms should be highlighted
  snippet_attributes: [], // Optionally specify attributes for snippets

  search_attributes: [
    { field: "MA_COVERAGE_GROUP", weight: 3 }, // Example: Weighting different fields
    { field: "ReferralPerson.FIRST_NAME", weight: 2 },
    { field: "ReferralPerson.LAST_NAME", weight: 2 },
    { field: "Employer.OTHER_PARTY_NAME", weight: 1 },
    { field: "Insurance.POLICY_HOLDER_NAME", weight: 1 },
    "ReferralPerson.BIRTH_STATE", // Direct field reference
    "ReferralPerson.Address.LINE1_ADDR", // Nested field reference
  ],

  result_attributes: [
    "APPLICATION_USER_ID",
    "UPDATED_BY_ID",
    "BEGIN_VALIDITY_DTTM",
    "TRANSACTION_EVENT_SEQ_NUMB",
    "STATUS",
    "OTHER_INAPPR_REASON_DESC",
    "GOOD_CAUSE_STATUS_DATE",
    "MA_COVERAGE_GROUP",
    "OTHER_REJECT_REASON_DESC",
    "TOWN_CODE",
    "ReferralPerson",
    "REFERRAL_DATE",
    "GOOD_CAUSE_STATUS",
    "CLOSURE_REASON",
    "type",
    "OFFICE_NAME",
    "PROGRAM_CASE_NUMB",
    "REFERRAL_STATUS",
    "LINK_REFERRAL_UPDATE_IND",
    "PENDING_REFERRAL_CASE_ID",
    "CASE_TYPE",
    "log",
    "STATUS_DATE",
    "APPLICATION_ID",
    "LINK_REFERRAL_IND",
    "CASE_ID",
    "REFERRAL_REASON",
    "COOPERATION",
    "END_VALIDITY_DTTM",
    "PROGRAM_OFFICE",
  ],

  facet_attributes: [
    // Define facets based on your application's needs
    {
      attribute: "ReferralPerson.GENDER",
      field: "ReferralPerson.GENDER.keyword",
      type: "string",
    },
    {
      attribute: "ReferralPerson.BIRTH_STATE",
      field: "ReferralPerson.BIRTH_STATE.keyword",
      type: "string",
    },
    {
      attribute: "ReferralPerson.Address.STATE",
      field: "ReferralPerson.Address.STATE.keyword",
      type: "string",
    },
    {
      attribute: "ReferralPerson.ProgramType",
      field: "ReferralPerson.ProgramType.keyword",
      type: "string",
    },
    {
      attribute: "ReferralPerson.Address.CITY_NAME",
      field: "ReferralPerson.Address.CITY_NAME.keyword",
      type: "string",
    },
  ],

  filter_attributes: [
    {
      attribute: "ReferralPerson.CASE_PARTY_ROLE",
      field: "ReferralPerson.CASE_PARTY_ROLE.keyword",
      type: "string",
    },
    {
      attribute: "ReferralPerson.CLIENT_STATUS",
      field: "ReferralPerson.CLIENT_STATUS.keyword",
      type: "string",
    },
    {
      attribute: "ReferralPerson.EFFECTIVE_DATE",
      field: "ReferralPerson.EFFECTIVE_DATE",
      type: "date",
    },
  ],

  query_rules: [
    // Example query rules can be defined here based on specific use cases
  ],
};
