class HTTP {

    static async get(url) {
        const results = await fetch(url, {
            headers: {
            }, method: 'GET', credentials: 'include'
        });
        if (results.ok) {
            return results.json();
        } else throw new Error(`Request could not be completed: status ${results.status}`);
    }
    static async post(url, data) {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }, method: 'POST', body: JSON.stringify(data)
        });
        if (response.ok) {
            return await response.json();
        } else throw new Error(`Request could not be completed: status ${response.status}`);
    }
    static async delete(url, data) {
        const results = await fetch(url + data, {
            method: 'DELETE'
        });
        if (results.ok) {
            return "Data successfully deleted";
        } else throw new Error(`Request could not be completed: status ${results.status}`);
    }
}

export default HTTP;