import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    chat(body: {
        message: string;
        model?: string;
    }): Promise<any>;
}
