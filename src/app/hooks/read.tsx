import { readContract  } from 'wagmi/actions';
import proposalAbi from "../../../contracts/gProposal.json";

export default async function ReadArticle(id:number): Promise<any> {
    const proposalContract = "0xe297f738b0c6b7ca9ef60d506822ae55aaf30286"

    const data = await readContract({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: 'proposals',
        args: [id],
    });

    return data
}

export async function ReadAny(_address:any, _proposalAbi:any, _functionName:string): Promise<any> {

    const data = await readContract({
        address: _address,
        abi: _proposalAbi,
        functionName: _functionName,
        args: []
    });

    return data
}

export async function ReadAnyArgs(_address:any, _abi:any, _functionName:string, _args:any): Promise<any> {

    const data = await readContract({
        address: _address,
        abi: _abi,
        functionName: _functionName,
        args: _args
    });

    return data
}