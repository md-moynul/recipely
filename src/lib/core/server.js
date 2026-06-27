const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
};

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'content-type': 'application/json',
        },
        // Dynamically spreads the body property only if data is truthy
        ...(data && { body: JSON.stringify(data) }),
    });
    return res.json();
};
export const protectedMutation = async (path, data, token, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        // Dynamically spreads the body property only if data is truthy
        ...(data && { body: JSON.stringify(data) }),
    });
    return res.json();
};
export const  protectedFetch = async (path,  token) => {
    const res = await fetch(`${baseUrl}${path}`,{
        headers: {
            'authorization': token
        },
    });
    return res.json();
};