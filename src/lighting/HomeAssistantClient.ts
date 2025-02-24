import axios, { AxiosInstance } from "axios";

export class HomeAssistantClient {

    private readonly axiosInstance: AxiosInstance;

    constructor(config: { url: string, token: string }) {
        this.axiosInstance = axios.create({
            baseURL: config.url,
            headers: {
                Authorization: `Bearer ${config.token}`,
            },
        });
    }
    
    setLightingState(lightId: string, settings: any): Promise<void> {
        return this.axiosInstance.post(`/api/services/light/turn_on`, {
            entity_id: lightId,
            ...settings,
        });
    }

    static initialiseFromEnv(): HomeAssistantClient {
        
        const HOME_ASSISTANT_TOKEN = process.env.HOME_ASSISTANT_TOKEN;
        if (!HOME_ASSISTANT_TOKEN) throw new Error("HOME_ASSISTANT_TOKEN is required");
    
        let HOME_ASSISTANT_URL = process.env.HOME_ASSISTANT_URL;
        if (!HOME_ASSISTANT_URL) {
            const defaultUrl = "http://homeassistant.local:8123";
            console.info("HOME_ASSISTANT_URL is not set, defaulting to " + defaultUrl);
            HOME_ASSISTANT_URL = defaultUrl;
        }
    
        return new HomeAssistantClient({
            token: HOME_ASSISTANT_TOKEN,
            url: HOME_ASSISTANT_URL,
        });
    }
}
