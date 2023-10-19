import { useContractRead } from 'wagmi';
import proposalAbi from "../../../contracts/Proposal.json";

export default function ReadArticle(id:string): any {
    const proposalContract = "0x066bad9A6bb7931b8d7ef31F0509C3478f39dCE3"

    const { data: articleData, isLoading } = useContractRead({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: 'getProposal',
        args: [id]
    });

    if (isLoading) {
        // Return a loading state or placeholder
        return false
    }

    return articleData
}

export function ReadAny(_address:any, _proposalAbi:any, _functionName:any): any {

    const { data, isLoading } = useContractRead({
        address: _address,
        abi: _proposalAbi,
        functionName: _functionName,
    });

    if (isLoading) {
        // Return a loading state or placeholder
        return false
    }

    return data
}

export function ReadAnyArgs(_address:any, _proposalAbi:any, _functionName:any, _args:any): any {

    const { data, isLoading } = useContractRead({
        address: _address,
        abi: _proposalAbi,
        functionName: _functionName,
        args: _args
    });

    if (isLoading) {
        // Return a loading state or placeholder
        return false
    }

    return data
}