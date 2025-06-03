// src/utils/fetchHandler.js
export const handleFetchResponse = async (response) => {
    if (response.status === 403) {
        window.location.href = "/error403";
        throw new Error("Forbidden - 403");
    }

    if (response.status === 404) {
        window.location.href = "/error404";
        throw new Error("Not Found - 404");
    }

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
        window.location.href = "/error404";
        throw new Error("Data not found");
    }

    return data;
};