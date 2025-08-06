// import {
//   useReadContract,
//   useWriteContract,
//   useChainId,
//   useWalletClient,
// } from "wagmi";

// import { StakeContractAddress } from "../utils/env";
// import { stakeAbi } from "../assets/abis/stake";
// import { UseContractOptions } from "./useContract";
// import { Abi, Address } from "viem";
// import { useMemo } from "react";
// import { config } from "../utils/wagmi";

// function useContract(
//   addressOrAddressMap?: Address | { [chainId: number]: Address },
//   abi?: Abi,
//   options?: UseContractOptions
// ) {
//   const currentChainId = useChainId();
//   const chainId = options?.chainId || currentChainId;
//   const { data: walletClient } = useWalletClient();
//   return useMemo(() => {
//     if (!addressOrAddressMap || !abi || !chainId) return null;
//     let address: Address | undefined;
//     if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
//     else address = addressOrAddressMap[chainId];
//     if (!address) return null;
//     try {
//       return {
//         read: useReadContract({
//           abi,
//           address,
//           chainId,
//         }),
//         write: useWriteContract({
//           abi,
//           address,
//           chainId,
//           ...config,
//         }),
//       };
//     } catch (error) {
//       console.error("Failed to get contract", error);
//       return null;
//     }
//   }, [addressOrAddressMap, abi, chainId, walletClient]);
// }

// export function useStakeContract() {
//   return useContract(StakeContractAddress, stakeAbi);
// }
