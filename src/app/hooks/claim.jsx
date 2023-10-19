"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { ReadAnyArgs } from "./read"
import distributorAbi from "../../../contracts/Distributor.json";

export default function Claim() {
    const distributorContract = "0x"

    const connectedUserAddress = useAccount()
    const [amount, setAmount] = useState("0");

    const { config } = usePrepareContractWrite({
        address: distributorContract,
        abi: distributorAbi.abi,
        functionName: "claimDividends",
        args: [amount*10**18],
    });

    const GetAllocations = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressClaimableTokens', connectedUserAddress.address)

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        write();
    };

    return (
        <section className="container mt-4">
      <h3>Delegate</h3>
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
            Delegate
          </button>
        </div>
      </form>
        <div className="ms-4 mt-4 mb-4">
          <h5>Connected address $LIB available to claim : {GetAllocations} LIB</h5>
        </div>
    </section>
    );
}