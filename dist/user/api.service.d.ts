export declare class ApiService {
    private readonly baseUrl;
    getUsers(): Promise<any>;
    createUser(userData: any): Promise<any>;
    updateUser(id: string, userData: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
}
