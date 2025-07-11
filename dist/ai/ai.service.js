"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AiService = class AiService {
    constructor() {
        this.ollamaHost = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
    }
    async chat(message, model = 'llama2') {
        try {
            const response = await axios_1.default.post(`${this.ollamaHost}/api/chat`, {
                model,
                messages: [{ role: 'user', content: message }],
                stream: false,
            });
            console.log('API Response:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('Error communicating with Ollama:', error);
            throw new Error('Failed to communicate with Ollama service');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map