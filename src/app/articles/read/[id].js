"use client"
import tokenContract from "../../../../contracts/Proposal.json";
import { useContractRead } from 'wagmi';

export default function Page({ articleData }) {
    // Render the component using the articleData
    return (
        <div>
            <h1>Article</h1>
            <p>{articleData}</p>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"
    const { id } = params;

    const { data: articleData } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'readProposal',
        args: [id],
    });

    return {
        props: {
            articleData,
        },
    };
}