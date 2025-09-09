export const isValidToken = (token) => {
    if (!token) 
        return false

    const payload = token.split(".")[1]
    if (!payload) 
        return false

    const decodedPayload = JSON.parse(window.atob(payload))

    const expiryTime = decodedPayload.exp * 1000;
    const currentTime = Date.now();
    return expiryTime > currentTime;
}

export const setLocalStorageUser = (data, type) => {
    const user = {
        ...JSON.parse(localStorage.getItem("user")),
        [type]: data
    }
    localStorage.setItem("user", JSON.stringify(user))
}
