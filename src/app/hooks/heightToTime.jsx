const calculateTimeDifference = (targetTimestamp) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (targetTimestamp <= currentTimestamp) return "Ended";
    const diff = targetTimestamp - currentTimestamp;
    return `${Math.floor(diff / 86400)} Days ${String(Math.floor((diff % 86400) / 3600)).padStart(2, '0')} Hours ${String(Math.floor((diff % 3600) / 60)).padStart(2, '0')} Minutes ${String(diff % 60).padStart(2, '0')} Seconds`;
};

export default calculateTimeDifference;