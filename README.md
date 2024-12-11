# 安裝與執行指引

clone 專案

```
git clone https://github.com/RzuzvTu/MongodbDemo.get
```

zip下載

```
點選本網頁右上綠色<>code按鈕 選擇downloadZIP
```

切換到專案目錄

```
cd MongodbDemo
```

## 前端

`frontend` 目錄下  
複製 `.env.example` 到 `.env` 並將內容設置成符合自身設定  

本地運行:  
```
cd frontend
npm install
npm start
```
## 後端

`backend` 目錄下  
複製 `.env.example` 到 `.env` 並將內容設置成符合自身設定

編譯
```
npx tsc
```

運行  
```
npm start
```

## 資料庫

設置 MongoDB , DB , Collection , 指定 Collection name : `students`  
範例資料 `studentslist.csv`

```
{
  "_id": {
    "$oid": "6751d2efec2bcf46a9b1adb9"
  },
  "userName": "tkuee0787",
  "sid": "1",
  "name": "呱呱呱",
  "department": "電機工程系",
  "grade": "四年級",
  "class": "C",
  "Email": "tkuee0787@tkuim.com"
}
```

---

# API 規格說明

## API說明

|方法	|路徑	                         |功能	            |參數/傳入資料	             |回應範例                                 |
|:------|:------------------------------|:----------------|:-------------------------|:---------------------------------------|
|GET	|/api/v1/user/findAll	        |查詢所有學生資料	 |無	                    |{ code: 200, body: [...] }              |
|GET	|/api/v1/user/findBySid/:sid	|透過 sid 查詢學生	|sid (路徑參數，學生座號)	  |{ code: 200, body: {...} }              |
|POST	|/api/v1/user/insertOne	        |新增學生資料	    |JSON 格式的學生資料	     |{ code: 200, body: {...} }              |
|DELETE	|/api/v1/user/deleteById	    |刪除指定學生資料	 |id (Query 參數，學生 _id)	 |{ code: 200, message: "delete success" }|
|PUT	|/api/v1/user/updateStudentById	|更新學生資料	     |id 和 JSON 格式的更新資料	 |{ code: 200, message: "Update success" }|

API 詳細說明與範例

範例請求：

1. 查詢所有學生資料
	*	方法: GET
	*	路徑: /api/v1/user/findAll
	*	功能: 返回所有學生資料。

```

範例回傳：

{
  "_id": {
    "$oid": "6751d2efec2bcf46a9b1adb9"
  },
  "userName": "tkuee0787",
  "sid": "1",
  "name": "呱呱呱",
  "department": "電機工程系",
  "grade": "四年級",
  "class": "C",
  "Email": "tkuee0787@tkuim.com",
  "absences": 0
}
```

2. 透過 SID 查詢學生資料
	*	方法: GET
	*	路徑: /api/v1/user/findBySid/:sid
	*	功能: 透過學生的 sid 查詢對應的學生資料。
	*	路徑參數: sid - 學生座號 (數字或字串)

範例請求：

`GET /api/v1/user/findBySid/50`

範例回傳：

```
{
  "_id": {
    "$oid": "6757ecedfa7d5e948cd208ff"
  },
  "userName": "tkuee8787",
  "sid": "50",
  "name": "huh",
  "department": "資工",
  "grade": "四年級",
  "class": "C",
  "Email": "tkuee8787@mail.com",
  "absences": 2,
  "__v": 0
}
```

3. 新增學生資料
	*	方法: POST
	*	路徑: /api/v1/user/insertOne
	*	功能: 新增學生資料。
	*	請求體: JSON 格式的學生資料。

範例請求：    

```
POST /api/v1/user/insertOne
Content-Type: application/json

{
  "userName": "tkuee1234",
  "name": "王小明",
  "department": "資訊工程系",
  "grade": "三年級",
  "class": "B",
  "Email": "tkuee1234@tkuim.com",
  "absences": 0
}
```

範例回傳：(假設資料庫內只有一筆資料)

```
{
  "code": 200,
  "message": "",
  "body": {
    "_id": "655c8e7e71b6fc001c47a124",
    "userName": "tkuee1234",
    "sid": "2",
    "name": "王小明",
    "department": "資訊工程系",
    "grade": "三年級",
    "class": "B",
    "Email": "tkuee1234@tkuim.com",
    "absences": 0
  }
}
```

4. 刪除學生資料 (根據 ID)
	*	方法: DELETE
	*	路徑: /api/v1/user/deleteById
	*	功能: 根據學生 _id 刪除該學生。
	*	Query 參數: id - 學生的唯一識別碼。

範例請求：

`DELETE /api/v1/user/deleteById?id=655c8e7e71b6fc001c47a124`

範例回傳：

```
{
  "code": 200,
  "message": "delete success",
  "body": {}
}
```

5. 更新學生資料
	*	方法: PUT
	*	路徑: /api/v1/user/updateStudentById
	*	功能: 更新指定學生的資料。
	*	請求體: 包含 id 和需更新的資料。

範例輸入：

```
PUT /api/v1/user/updateStudentById
Content-Type: application/json

{
  "id": "6757ecedfa7d5e948cd208ff",
  "name": "呱呱呱",
  "absences": 2000
}
```

範例回傳：

```
{
  "id":"6751d2efec2bcf46a9b1adb9",
  "userName": "tkuee0787",
  "sid": "1",
  "name": "呱呱呱",
  "department": "電機工程系",
  "grade": "四年級",
  "class": "C",
  "Email": "tkuee0787@tkuim.com",
  "absences": 2000
}
```
# 架構圖 / 流程圖

![](/flow-chart.png)

---

# Project Demo