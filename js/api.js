
class RequestToApi {
    #apiKey

    constructor() {
        this.#apiKey = '05f3398e616a4f75baef9df4c57a5740';
    }

    async getDate(location) {
        const request = `https://api.ipgeolocation.io/timezone?apiKey=${this.#apiKey}&location=${location}`;
        const response = await fetch(request);

        if(response.status === 200) {
            return response.json();
        } else {
            throw new Error('Повторите снова');
        }
    }
}

export {RequestToApi}