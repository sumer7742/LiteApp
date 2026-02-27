import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../constant/ApiClient";

export interface UpdateDepositPayload {
    paymentSessionId: string;
}
export interface DepositInitiationResponse {
    message: string;
    success: boolean;
    url: string;
}
export interface UpdateDepositResponse {
    message: string;
    success: boolean;
  
}
export interface DepositQueryParams {
    status?: "PENDING" |
    "SUCCESS" |
    "FAILED" |
    "REVERSED" | ""
    searchQuery?: string;
    startDate?: string;
    endDate?: string;
    date?: string;
    pageNumber?: number;
    pageSize?: number;
}
export interface DepositListResponse {
    success: boolean;
    results:any;
    pagination: {
        total: number;
        pageNumber: number;
        totalPages: number;
        pageSize: number;
        next: boolean;
        previous: boolean;
    };
}
const fetchDepositData = (params: DepositQueryParams): Promise<DepositListResponse> =>
    apiClient.get("/deposit/list", { params }).then(res => res.data);

export const useDepositsData = ({
    status = "", searchQuery = "", endDate = "", startDate = "", pageNumber = 1, pageSize = 10,
}: DepositQueryParams) => {
    const params: DepositQueryParams = {
        ...status && { status },
        ...searchQuery && { searchQuery },
        ...startDate && { startDate },
        ...endDate && { endDate },
        ...pageNumber && { pageNumber },
        ...pageSize && { pageSize },
    };

    const { isLoading, isError, data, refetch } = useQuery<DepositListResponse, AxiosError>({
        queryKey: ["AllDeposits", params],
        queryFn: () => fetchDepositData(params),
        staleTime: 3000,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isError, data, refetch };
};
const updateDepositApi = ({ paymentSessionId }: UpdateDepositPayload) =>
    apiClient.put(`/deposit/update/${paymentSessionId}`).then(res => res.data);
export const useVerifyDeposit = () => {
    const updateDepositMutation = useMutation<UpdateDepositResponse, AxiosError, UpdateDepositPayload>({
        mutationFn: updateDepositApi,
    });
    return { updateDepositMutation };
};
interface createDepositPayload {
    amount: number,
}
interface createManualDeposit {
    amount: number;
    paymentMethod: string;
    utr: string;
    paymentDate: string;
    file: string;
}
const createDepositApi = (data: createDepositPayload) =>
    apiClient.post(`/deposit/initiate`, data).then(res => res.data);
const createManualDepositApi = (data: createManualDeposit) =>
    apiClient.post(`/create-manual-deposit/`, data).then(res => res.data);
export const useCreateDeposit = () => {
    const createDepositMutation = useMutation<DepositInitiationResponse, AxiosError, createDepositPayload>({
        mutationFn: createDepositApi,
    });
    const createManualDepositMutation = useMutation<DepositInitiationResponse, AxiosError, createManualDeposit>({
        mutationFn: createManualDepositApi,
    })
    return { createDepositMutation, createManualDepositMutation };
};

