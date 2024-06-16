import React from 'react';

const ProgressBar = ({ yesVotes, noVotes, abstainVotes }) => {
    const totalVotes = yesVotes + noVotes + abstainVotes;
    const toNumber = (bigint) => Number(bigint);

    const yesPercentage = totalVotes > BigInt(0) ? (toNumber(yesVotes) / toNumber(totalVotes)) * 100 : 0;
    const noPercentage = totalVotes > BigInt(0) ? (toNumber(noVotes) / toNumber(totalVotes)) * 100 : 0;
    const abstainPercentage = totalVotes > BigInt(0) ? (toNumber(abstainVotes) / toNumber(totalVotes)) * 100 : 0;

    return (
        <div className="progress mt-2">
            <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width: `${yesPercentage}%` }}>
            </div>
            <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width: `${abstainPercentage}%` }}>
            </div>
            <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width: `${noPercentage}%` }}>
            </div>
        </div>
    );
};

export default ProgressBar;