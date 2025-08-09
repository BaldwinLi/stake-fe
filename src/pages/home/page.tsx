"use client";
import { motion } from "framer-motion";
import "./Home.module.css";
// import { useStakeContract } from "../../hooks/useContract";
// import { useStakeContract } from "../../hooks/ethersUseContract";

import {
  // useCallback,
  useEffect,
  useState,
} from "react";
import { Pid } from "../../utils";
import {
  // useAccount,
  useWalletClient,
  useBalance,
  // useWriteContract,
  useReadContract,
  // useWaitForTransactionReceipt,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";
// import { waitForTransactionReceipt } from "viem/actions";
import {
  FiArrowDown,
  // FiInfo,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";
// import { cn } from '../../utils/cn';
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { StakeContractAddress } from "../../utils/env";
// import { ethers } from 'ethers';
import { stakeAbi } from "../../assets/abis/stake";
import { useWriteContract } from "../../hooks/wagmiUseContract";

const Home = () => {
  // const stakeContract = useStakeContract();

  // const { address, isConnected } = useAccount();

  const { data, status } = useWalletClient();
  const {
    writeContractAsync,
    status: waitForTransactionReceiptStatus,
    isLoading: loading,
    isFetched,
    data: waitForTransactionReceiptData,
  } = useWriteContract();
  const { data: stakedAmount, refetch } = useReadContract({
    address: StakeContractAddress,
    abi: stakeAbi,
    functionName: "stakingBalance",
    args: [BigInt(Pid), data?.account.address || "0x0"],
    query: {
      enabled: status === "success", // 确保只有连接钱包后才查询
    },
  });
  // const [stakedAmount, setStakedAmount] = useState('0');
  const [amount, setAmount] = useState("");
  // const [loading, setLoading] = useState(false);
  const { data: balance } = useBalance({
    address: data?.account.address,
    query: {
      enabled: status === "success",
      refetchInterval: 10000,
      refetchIntervalInBackground: false,
    },
  });
  useEffect(() => {
    console.log("################", data);
    if (isFetched) {
      if (waitForTransactionReceiptStatus === "success") {
        toast.success("Stake successful!");
        setAmount("");
        // setLoading(false);
        refetch();
      } else {
        toast.error("Stake failed!");
      }
    }
  }, [
    waitForTransactionReceiptStatus,
    waitForTransactionReceiptData,
    isFetched,
  ]);

  const handleStake = async () => {
    if (!data) return;
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > parseFloat(balance!.formatted)) {
      toast.error("Amount cannot be greater than current balance");
      return;
    }

    try {
      // setLoading(true);

      // 使用viem
      //  const tx = await stakeContract.read.depositETH([], { value: parseUnits(amount, 18) });
      // const res = await waitForTransactionReceipt(data, { hash: tx.hash as `0x${string}` });
      // 使用ethers
      // const tx = await stakeContract.depositETH({ value: parseUnits(amount, 18) });
      // const res = await tx.wait();
      const hash = await writeContractAsync({
        address: StakeContractAddress,
        abi: stakeAbi,
        functionName: "depositETH",
        args: [],
        value: parseUnits(amount, 18),
      });
      console.log("###################", { hash });
      // 使用viem
      // if (res?.status === 'success') {
    } catch (error) {
      // setLoading(false);
      toast.error("Transaction failed. Please try again.");
      console.log(error, "stake-error");
    }
  };

  // const getStakedAmount = useCallback(async () => {
  //   if (address) {
  //     // 使用viem
  //     // const res = await stakeContract.read.stakingBalance([Pid], { account: address });
  //     // 使用ethers
  //     const res = await stakeContract.stakingBalance(Pid, address);
  //     setStakedAmount(formatUnits(res as bigint, 18));
  //   }
  // }, [stakeContract, address]);

  // useEffect(() => {
  //   if (stakeContract && address) {
  //     getStakedAmount();
  //   }
  // }, [stakeContract, address, getStakedAmount]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="inline-block mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary-500/20 flex items-center justify-center shadow-lg"
            style={{ boxShadow: "0 0 60px 0 rgba(14,165,233,0.15)" }}
          >
            <FiZap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-500" />
          </motion.div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-3">
          MN Stake
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-md mx-auto">
          Stake ETH to earn tokens with flexible terms and competitive rewards
        </p>
      </motion.div>
      <Card className="w-full max-w-3xl mx-auto p-6 sm:p-8 bg-white shadow-lg border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-xl">
        <div className="space-y-8 sm:space-y-10">
          {/* Staked Amount Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-primary-500/50 transition-all duration-300 shadow-sm"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-primary-500/10 rounded-full">
              <FiTrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500" />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0 items-center sm:items-start">
              <span className="text-gray-600 text-base sm:text-lg mb-1">
                Staked Amount
              </span>
              <span className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent leading-tight break-all">
                {parseFloat(formatUnits(stakedAmount || BigInt(0), 18)).toFixed(
                  4
                )}{" "}
                ETH
              </span>
            </div>
          </motion.div>

          {/* Input Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <Input
              label="Amount to Stake"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              rightElement={<span className="text-gray-500">ETH</span>}
              helperText={
                balance
                  ? `Available: ${parseFloat(balance.formatted).toFixed(4)} ETH`
                  : undefined
              }
              className="text-lg sm:text-xl py-3 sm:py-5"
            />
          </motion.div>

          {/* Stake Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            {status !== "success" ? (
              <div className="flex justify-center">
                <div className="glow">
                  <ConnectButton />
                </div>
              </div>
            ) : (
              <Button
                onClick={handleStake}
                disabled={loading || !amount}
                loading={loading}
                fullWidth
                className="py-3 sm:py-5 text-lg sm:text-xl"
              >
                <FiArrowDown className="w-6 h-6 sm:w-7 sm:h-7" />
                <span>Stake ETH</span>
              </Button>
            )}
          </motion.div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
