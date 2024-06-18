"use client"

import { useState, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { ReadAnyArgs } from "./read"
import distributorAbi from "../../../contracts/Distributor.json";

export default function Claim() {
  const distributorContract = process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS

  const connectedUserAddress = useAccount()
  const [amount, setAmount] = useState("0");
  const [allocations, setAllocations] = useState("0");
  const [notifications, setNotifications] = useState([]);

  const { config } = usePrepareContractWrite({
    address: distributorContract,
    abi: distributorAbi.abi,
    functionName: "claimDividends",
    args: [amount * 10 ** 18],
  });

  const getAllocations = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressClaimableTokens', [connectedUserAddress.address])
  getAllocations.then((data) => setAllocations(String(BigInt(data) / (BigInt(10n) ** BigInt(18n)))));

  const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    write();
  };

  useEffect(() => {
    if (isLoading) {
      addNotification("Transaction waiting", "Please see your wallet.", "loading");
    }
    if (isSuccess) {
      addNotification("Claim submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
    }
    if (isError) {
      addNotification("Transaction aborted", "User denied transaction.", "error");
    }
  }, [isLoading, isSuccess, isError, data]);

  const addNotification = (title, message, type) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 7000);
  };

  return (
    <section className="container mt-4">
      <h3>Claim</h3>
      <h5>Connected address $LIB available to claim : {allocations} LIB</h5>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <div className="input-group mb-3">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Type delegatee address"
            required
            className="form-control"
          />
          <button type="submit" disabled={!write} className="btn btn-primary">
            Claim
          </button>
        </div>
      </form>
      <div className="toast-container position-fixed bottom-0 end-0 m-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notif-pop-${notif.type} card p-2 mb-2`}
            style={{ width: "400px" }}
          >
            <div className="toast-header">
              <strong className="me-auto">{notif.title}</strong>
            </div>
            <div className="toast-body">
              {notif.message}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}