// CardDefine.ts
export interface ICardConfig {
    id: number;           // 卡片唯一 ID
    name: number;         // 对应多语言表中的名称 ID
    dis: number;          // 对应多语言表中的描述 ID
    sell_value: number;   // 售卖金币数量
    output: number;       // 每日产出金币数量
}