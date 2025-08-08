import {
  useWriteContract as useWagmiWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

export function useWriteContract(): {
  writeContractAsync: ReturnType<
    typeof useWagmiWriteContract
  >["writeContractAsync"];
  status: "success" | "error" | "pending";
  isLoading: boolean;
  isFetched: boolean;
  data: any;
} {
  const { writeContractAsync, data: hash } = useWagmiWriteContract();
  const { status, isLoading, isFetched, data } = useWaitForTransactionReceipt({
    hash,
  });
  return {
    status,
    isLoading,
    isFetched,
    data,
    writeContractAsync,
  };
}
