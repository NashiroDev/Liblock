"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import distributorAbi from "../../../contracts/Distributor.json";

export default function UpdateEpochInheritance() {
    const distributorContract = "0xf2c06D8B5986eB79473CFfF70ABfc2E5986F4EB6"

    const [address, setAddress] = useState("");

    const { config } = usePrepareContractWrite({
        address: distributorContract,
        abi: distributorAbi.abi,
        functionName: "currentEpochInheritance",
        args: [address]
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        write();
    };

    return (
        <section className="container mt-4">
            <h3>Initiate address inheritance</h3>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Type address to inherit from last epoch"
                        required
                        className="form-control"
                    />
                    <button type="submit" disabled={!write} className="btn btn-primary">
                        Inherit
                    </button>
                </div>
            </form>
        </section>
    );
}