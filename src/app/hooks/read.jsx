"use client"

import { useContractRead } from 'wagmi';
import tokenContract from "../../../contracts/Proposal.json";

export default function ReadArticle(id) {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    const { data: articleData } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'readProposal',
        args: [id]
    });

    return articleData
}