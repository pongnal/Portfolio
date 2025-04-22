"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ApiService = class ApiService {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
    }
    async getUsers() {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/users`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
    async createUser(userData) {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/users`, userData);
            return response.data;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async updateUser(id, userData) {
        try {
            const response = await axios_1.default.put(`${this.baseUrl}/users/${id}`, userData);
            return response.data;
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const response = await axios_1.default.delete(`${this.baseUrl}/users/${id}`);
            return response.data;
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);
//# sourceMappingURL=api.service.js.map