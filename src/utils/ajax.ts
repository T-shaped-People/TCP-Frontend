import axios, { AxiosError, AxiosPromise } from "axios"

export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

interface Ajax {
    url: string,
    method: HttpMethod,
    payload?: any,
    errorCallback?: (errorData: AxiosError) => void
}

export const ajax = async <T> ({
    url,
    method,
    payload,
    errorCallback
}: Ajax): Promise<T> => {
    try {
        const rawRes = ((): AxiosPromise<T> => {
            switch (method) {
                case HttpMethod.GET: return axios.get(url);
                case HttpMethod.POST: return axios.post(url, payload);
                case HttpMethod.PUT: return axios.put(url, payload);
                case HttpMethod.DELETE: return axios.delete(url);
            }
        })();
        return (await rawRes).data;
    } catch (error) {
        if (error instanceof AxiosError) {
            errorCallback(error);
        }
    }
}