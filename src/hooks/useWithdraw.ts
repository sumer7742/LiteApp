import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../constant/ApiClient";

/* ================================
   TYPES
================================ */

export interface WithdrawList {
  id: string;
  transaction_id: string;
  amount: number;
  status: string;
  method: string;
  initiatedAt: string;
  ifsc_code: string;
  beneficiary_name: string;
  account_Number: string;
  upi_id?: string;
  amazonpay_number?: string;
  utr?: string;
  paytm_number?: string;
  user?: {
    mobile: string;
    full_name?: string | null;
  };
}

export interface WithdrawListResponse {
  success: boolean;
  results: WithdrawList[];
  pagination: {
    total: number;
    pageNumber: number;
    totalPages: number;
    pageSize: number;
    next: boolean;
    previous: boolean;
  };
}

export interface WithdrawQueryParams {
  status?: string;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface WithdrawResponseData {
  batch_transfer_id: string;
  cf_batch_transfer_id: string;
  status: string;
}

export interface WithdrawResponse {
  success: boolean;
  message: string;
  data: WithdrawResponseData;
}

export interface WithdrawPayoutPayload {
  transfer_mode:
    | "banktransfer"
    | "imps"
    | "neft"
    | "rtgs"
    | "upi"
    | "paytm"
    | "amazonpay";
  transfer_amount: string;
  beneficiary_name: string;
  upiId?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  paytm_number?: string;
  amazon_number?: string;
}

/* ================================
   MUTATION (INITIATE WITHDRAW)
================================ */

const initiateWithdraw = async (
  payload: WithdrawPayoutPayload
): Promise<WithdrawResponse> => {
  const response = await apiClient.post<WithdrawResponse>(
    "/withdraw/initiate/",
    payload
  );
  return response.data;
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation<WithdrawResponse, AxiosError, WithdrawPayoutPayload>({
    mutationKey: ["WithdrawInitiate"],
    mutationFn: initiateWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["WithdrawList"] });
    },
  });
};

/* ================================
   QUERY (WITHDRAW LIST)
================================ */

const fetchUserWithdraw = async (
  params: WithdrawQueryParams
): Promise<WithdrawListResponse> => {
  const response = await apiClient.get<WithdrawListResponse>(
    "/withdraw/list",
    { params }
  );
//   console.log(response)
  return response.data;
  
};

export const useWithdrawList = ({
  status,
  searchQuery,
  startDate,
  endDate,
  date,
  pageNumber = 1,
  pageSize = 10,
}: WithdrawQueryParams = {}) => {
  return useQuery<WithdrawListResponse, AxiosError>({
    queryKey: [
      "WithdrawList",
      pageNumber,
      pageSize,
      status,
      searchQuery,
      startDate,
      endDate,
      date,
    ], // ✅ stable key

    queryFn: () =>
      fetchUserWithdraw({
        status,
        searchQuery,
        startDate,
        endDate,
        date,
        pageNumber,
        pageSize,
      }),

    staleTime: 5000,
    refetchOnWindowFocus: false,
    
  });
};