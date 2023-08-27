import React from "react";
import { ethers } from "ethers";
import "../interfaces/ether.d.ts";

import "../App.css";

export const Login = () => {
  const [account, setAccount] = React.useState<string>("");
  const [contractAddress, setContractAddress] = React.useState<string>("");
  const [balance, setBalance] = React.useState<string>("");

  const connectWallet = async () => {
    const [address] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    setBalance(ethers.utils.formatEther(balance));
    setAccount(address);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value);
  };

  const callContractMethod = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      ["function setToken()"],
      provider.getSigner()
    );
    await contract.setToken();
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Connect Wallet
      </button>
      {account && (
        <div className="mt-4">
          <p className="text-lg">Account: {account}</p>
          <p className="text-lg">Balance: {balance}</p>
          <input
            type="text"
            className="mt-4"
            placeholder="Contract address"
            value={contractAddress}
            onChange={handleInputChange}
          />
          <button
            onClick={callContractMethod}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Call Contract Method
          </button>
        </div>
      )}
    </div>
  );
};
