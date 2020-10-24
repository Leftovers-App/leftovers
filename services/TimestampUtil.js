const allTimestamps = ["created", "claimed", "pendingAssignmentSince", "assigned", "pickedUp", "delivered"]

const convertTimestamps = (postData) => {
    if (!postData) return null;
    let updatedData = postData;
    for (let timestamp of allTimestamps) {
        if ((timestamp in postData) && postData[timestamp]) { updatedData[timestamp] = new Date(postData[timestamp].seconds * 1000).toLocaleString() }
    }
    return updatedData;
}

export { convertTimestamps };