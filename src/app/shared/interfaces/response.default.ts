export default interface IResponseDefault<T> { 
    status: number;
    message?: string;
    data?: T
}