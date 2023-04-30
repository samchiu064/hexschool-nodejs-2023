## 完成第六週 JWT 身份驗證機制

### 加入以下 API 設計

- POST：{url}/users/sign_up：註冊
- POST：{url}/users/sign_in：登入
- POST：{url}/users/updatePassword: 重設密碼
- GET：{url}/users/profile: 取得個人資料，需設計 isAuth middleware。
- PATCH：{url}/users/profile: 更新個人資料，需設計 isAuth middleware
- POST：{url}/posts/：張貼個人動態
- GET：{url}/posts/：觀看所有動態
