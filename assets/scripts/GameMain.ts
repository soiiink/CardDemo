import { _decorator, Component, Node } from 'cc';
import { ConfigManager } from './data/ConfigManager'; // 导入我们刚才写的配置管理器
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {

    // onLoad 是 Cocos 脚本生命周期中最早执行的函数
    // 只要这个脚本所在的节点被加载，它就会运行
    onLoad() {
        console.log("游戏启动中... 正在加载配置...");
        this.initGame();
    }

    private initGame() {
        // 调用我们写的加载函数
        // 这里的 () => { ... } 叫回调函数，意思是“等文件加载完了，再执行大括号里的事”
        ConfigManager.instance.loadCardConfig(() => {
            
            console.log("所有数据加载完毕，可以开始游戏了！");
            
            // 咱们试着打印一下 1001 号卡片的数据看看
            const config = ConfigManager.instance.getCardConfigById(1001);
            if (config) {
                console.log(`读取成功！卡片名ID是：${config.name}，产出是：${config.output}`);
            }
        });
    }
}