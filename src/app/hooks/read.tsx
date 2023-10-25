import { readContract  } from 'wagmi/actions';
import proposalAbi from "../../../contracts/gProposal.json";

export default async function ReadArticle(id:string): Promise<any> {
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef"

    const data = await readContract({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: 'getProposal',
        args: [id]
    });

    return data
}

export async function ReadAny(_address:any, _proposalAbi:any, _functionName:any): Promise<any> {

    const data = await readContract({
        address: _address,
        abi: _proposalAbi,
        functionName: _functionName,
        args: []
    });

    return data
}

export async function ReadAnyArgs(_address:any, _abi:any, _functionName:any, _args:any): Promise<any> {

    const data = await readContract({
        address: _address,
        abi: _abi,
        functionName: _functionName,
        args: _args
    });

    return data
}