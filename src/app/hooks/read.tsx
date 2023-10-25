import { readContract  } from '@wagmi/core';
import proposalAbi from "../../../contracts/gProposal.json";

export default function ReadArticle(id:string): any {
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef"

    const data = readContract({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: 'getProposal',
        args: [id]
    });

    return data
}

export function ReadAny(_address:any, _proposalAbi:any, _functionName:any): any {

    const data = readContract({
        address: _address,
        abi: _proposalAbi,
        functionName: _functionName,
        args: []
    });

    return data
}

export function ReadAnyArgs(_address:any, _abi:any, _functionName:any, _args:any): any {

    const data = readContract({
        address: _address,
        abi: _abi,
        functionName: _functionName,
        args: _args
    });

    return data
}