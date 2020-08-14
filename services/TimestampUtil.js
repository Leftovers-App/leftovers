const allTimestamps = ["created", "claimed", "pendingAssignmentSince", "assigned"]

const convertTimestamps = (postData) => {
    let updatedData = {}
    for (let key in postData.keys()) {
        if (key in allTimestamps) { updatedData[key] = postData[key].toDate() }
        else { updatedData[key] = postData[key] }
    }
}

export { convertTimestamps };