const allTimestamps = ["created", "claimed", "pendingAssignmentSince", "assigned"]

const convertTimestamps = (postData) => {
    let updatedData = postData;
    for (let timestamp of allTimestamps) {
        if ((timestamp in postData) && postData[timestamp]) { updatedData[timestamp] = new Date(postData[timestamp].seconds * 1000).toString() }
    }
    return updatedData;
}

export { convertTimestamps };