import { Contract, ethers, Signer, type InterfaceAbi } from "ethers";
import { StakeContractAddress } from "../utils/env";
import { stakeAbi } from "../assets/abis/stake";
import { UseContractOptions } from "./useContract";
import { useEffect, useMemo, useState } from "react";
import { StakeContract } from '../types/contracts/Stake';

function useChainId() {
  const [chainId, setChainId] = useState<number>(1);
  useEffect(() => {
    async function getChainId() {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          setChainId(parseInt(chainId, 16));
        } catch (e) {
          console.error("Failed to get chainId", e);
        }
      }
    }
    getChainId();

    // 监听链切换事件
    window.ethereum && window.ethereum.on("chainChanged", (chainId: string) => {
      setChainId(parseInt(chainId, 16));
    });

    return () =>   window.ethereum && window.ethereum.removeListener("chainChanged", getChainId);
    

  }, []);

  return chainId;
}

function useEthersSigner(): any {
  const [signer, setSigner] = useState<Signer>();
  useEffect(() => {
    async function getSigner() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.BrowserProvider(window.ethereum);
          setSigner(await provider.getSigner());
        } catch (e) {
          console.error("Failed to get signer", e);
        }
      }
    }
    getSigner();
    window.ethereum && window.ethereum.on("accountsChanged", getSigner);

    return () => window.ethereum && window.ethereum.removeListener("accountsChanged", getSigner);
  }, []);

  return signer;
}

 function useContract(
  addressOrAddressMap?: string | { [chainId: number]: string },
  abi?: InterfaceAbi,
  options?: UseContractOptions
): StakeContract | null {

  const currentChainId = useChainId();
  const chainId = options?.chainId || currentChainId;
  const signer = useEthersSigner();
  return useMemo(() => {
    if (!addressOrAddressMap || !abi || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return (new ethers.Contract(address, abi, signer)) as any;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, abi, signer]);
}

export function useStakeContract() {
  return useContract(StakeContractAddress, stakeAbi as InterfaceAbi);
}
