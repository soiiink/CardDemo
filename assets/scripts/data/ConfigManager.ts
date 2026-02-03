import { _decorator, resources, JsonAsset } from 'cc';
import { ICardConfig } from './CardDefine';

export class ConfigManager {
    private static _instance: ConfigManager = null;
    public static get instance(): ConfigManager {
        if (!this._instance) {
            this._instance = new ConfigManager();
        }
        return this._instance;
    }

    // 使用 Map 存储，方便通过 ID 快速查找
    private _cardConfigs: Map<number, ICardConfig> = new Map();

    /**
     * 加载 Card_info.json
     * @param callback 加载完成后的回调
     */
    public loadCardConfig(callback: () => void) {
        // 确保你的文件在 assets/resources/json/Card_info.json
        resources.load('json/Card_info', JsonAsset, (err, asset) => {
            if (err) {
                console.error("加载卡片配置失败:", err);
                return;
            }

            const jsonArray = asset.json as ICardConfig[];
            
            // 将数组转化为 Map 结构
            jsonArray.forEach(config => {
                this._cardConfigs.set(config.id, config);
            });

            console.log(`成功加载 ${this._cardConfigs.size} 个卡片配置`);
            if (callback) callback();
        });
    }

    /**
     * 获取指定 ID 的卡片配置
     */
    public getCardConfigById(id: number): ICardConfig | null {
        return this._cardConfigs.get(id) || null;
    }

    /**
     * 获取所有配置（用于商店显示等）
     */
    public getAllConfigs(): ICardConfig[] {
        return Array.from(this._cardConfigs.values());
    }
}