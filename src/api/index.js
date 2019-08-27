export const get = (url) => 
    fetch(url, {
        method: "GET",
        headers: {
            "Travis-API-Version": 3,
            "Authorization": `token ${localStorage.getItem("travisToken")}`, 
        } 
    });