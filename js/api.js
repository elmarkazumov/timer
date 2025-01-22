
class RequestToApi {
    #apiKey

    constructor() {
        this.#apiKey = '6378417a58324ccda22007978fe4030c';
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