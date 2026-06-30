"use client";

import { apiActions } from "@/tools/axios";

export const getMemberSummary = async (memberNo, year, token) => {
  const queryParams = year ? `?year=${year}` : "";
  const response = await apiActions?.get(
    `/api/v1/transactions/summary/yearly/${memberNo}/${queryParams}`,
    token
  );
  return response.data;
};

export const downloadMemberSummary = async (memberNo, year, token) => {
  const queryParams = year ? `?year=${year}` : "";
  const response = await apiActions?.get(
    `/api/v1/transactions/summary/yearly/${memberNo}/pdf/${queryParams}`,
    { ...token, responseType: "blob" }
  );
  return response.data;
};
