import pandas as pd
import json
import os

EXCEL_DIR = ".."        
JSON_DIR = "../../assets/resources/json" 

def export_all():
    if not os.path.exists(JSON_DIR):
        os.makedirs(JSON_DIR)

    files = [f for f in os.listdir(EXCEL_DIR) if f.endswith(".xlsx") and not f.startswith("~$")]
    
    for file_name in files:
        file_path = os.path.join(EXCEL_DIR, file_name)
        try:
            # 1. 读取整个 Excel
            # 默认第一行（Index 0）作为 Header (JSON 的 Key)
            df = pd.read_excel(file_path)
            
            # 2. 跳过第二行（也就是 DataFrame 里的第一行数据，它是“类型”描述）
            # 我们只需要从真正的第三行（DataFrame 里的索引 1 之后）开始导数据
            data_df = df.drop([0,1]) 
            
            # 3. 转化为 JSON
            json_data = data_df.to_dict(orient='records')
            
            json_file_name = file_name.replace(".xlsx", ".json")
            json_path = os.path.join(JSON_DIR, json_file_name)
            
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, ensure_ascii=False, indent=4)
            
            print(f"✅ 成功: {file_name} (已跳过类型行)")
        except Exception as e:
            print(f"❌ 失败 {file_name}: {str(e)}")

if __name__ == "__main__":
    export_all()
    input("\n处理完成，按回车退出...")