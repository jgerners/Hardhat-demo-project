import React, { useState } from "react";
import { depositFund } from "../utils/contractServices";
import { withdrawFund } from "../utils/contractServices";
import { toast } from "react-toastify";
import { getContractBalanceInETH } from "../utils/contractServices";

function ContractActions() {
  const [depositValue, setDepositValue] = useState("");

  const handleDeposit = async () => {
    try {
      console.log("Deposit value entered:", depositValue);
      const tx = await depositFund(depositValue);
      console.log("Deposit TX:", tx);
      const balance = await getContractBalanceInETH();
      console.log("Contract balance after deposit:", balance);
      toast.success(`Deposit successful. Contract balance: ${balance} ETH`);
    } catch (error) {
      console.error("Deposit error:", error);
      toast.error(error?.reason || "Deposit failed");
    }
    setDepositValue("");
  };

  const handleWithdraw = async () => {
    try {
      console.log("Attempting withdrawal...");
      await withdrawFund();
      toast.success("Withdrawal successful!");
    } catch (error) {
      console.error("Withdraw error:", error);
      toast.error(
        error?.reason || error?.message || "Unknown withdrawal error"
      );
    }
  };

  return (
    <div>
      <h2>Contract Actions</h2>
      <div>
        <input
          type="text"
          value={depositValue}
          onChange={(e) => setDepositValue(e.target.value)}
          placeholder="Amount in ETH"
        />
        <button onClick={handleDeposit}>Deposit Funds</button>
      </div>
      <br />
      <div>
        <button onClick={handleWithdraw}>Withdraw Funds</button>
      </div>
    </div>
  );
}

export default ContractActions;
