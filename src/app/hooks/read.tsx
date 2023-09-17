"use client"

import { useContractRead } from 'wagmi';
import tokenContract from "../../../contracts/Proposal.json";

export default function ReadArticle(id:string): any {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    const { data: articleData, isLoading } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'readProposal',
        args: [id]
    });

    if (isLoading) {
        // Return a loading state or placeholder
        return ["Loading", "Loading", "Loading"]
    }

    return articleData
}