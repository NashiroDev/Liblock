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
        return false
    }

    return articleData
}

export function ReadAny(_address:any, _tokenContract:any, _functionName:any): any {

    const { data, isLoading } = useContractRead({
        address: _address,
        abi: _tokenContract,
        functionName: _functionName,
    });

    if (isLoading) {
        // Return a loading state or placeholder
        return false
    }

    return data
}