# 第一週主線任務

## 課程範圍

1. 搜尋 name 欄位為 “Ray Xu” 的 document 列表

```
db.posts.find({"name":"Ray Xu"})
```

2. 新增一筆 document，請全部欄位皆填寫

```
db.posts.insertOne({
    name: 'Sam Chiu',
    tags: [ '心情', '感情' ],
    type: 'group',
    image: 'http://dummyimage.com/126x100.png/ff4444/ffffff',
    createdAt: '2022-03-24 21:00:00 UTC',
    content: 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi non',
    likes: 899,
    comments: 24
  });
```

3. 新增多筆 document，請全部欄位皆填寫

```
db.posts.insertMany([{
  name: 'Oliver Hsiegh',
  tags: [ '心情', '感情' ],
  type: 'group',
  image: 'http://dummyimage.com/126x100.png/ff4444/ffffff',
  createdAt: '2022-03-24 21:00:00 UTC',
  content: 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi non',
  likes: 899,
  comments: 24
},
{
  name: 'Mike Lin',
  tags: [ '心情', '感情' ],
  type: 'group',
  image: 'http://dummyimage.com/126x100.png/ff4444/ffffff',
  createdAt: '2022-03-24 21:00:00 UTC',
  content: 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi non',
  likes: 899,
  comments: 24
}]);
```

4. 修改一筆 document，filter 條件請用 \_id 指定其中一筆資料，content 欄位調整為測試資料

```
db.posts.updateOne({_id: ObjectId("641d9f6dcb82e8f95950539c")}, {$set:{content: "測試資料"}});
```

5. 修改多筆 name 欄位為 "Ray Xu" 的 document 列表，content 欄位都調整為哈哈你看看你

```
db.posts.updateMany({name: "Ray Xu"}, {$set:{content: "哈哈你看看你"}});
```

6. 刪除一筆 document，filter 條件請用 \_id 任意指定其中一筆資料

```
db.posts.deleteOne({_id: ObjectId("641d9f6dcb82e8f95950539b")});
```

7. 刪除多筆 document，filter 條件請用 type 為 group 的值，刪除所有社團貼文

```
db.posts.deleteMany({type: "group"});
```

8. 刪除多筆 document，filter 條件為以下條件 a. name:"Ray Xu" b. likes: 500(含) 個讚以下

```
db.posts.deleteMany({name: "Ray Xu", likes: {$lte: 500}});
```

9. 查詢全部 posts 的 document 列表

```
db.posts.find();
```

10. 關鍵字搜尋 name 裡面含有 o 的 document 列表

```
db.posts.find({name: /o/});
```

11. 查詢 name 欄位為 "Ray Xu" ，filter 篩選出介於 500~1000(含) 個讚（大於等於 500、小於等於 1000）

```
db.posts.find({name: "Ray Xu", likes: {$gte: 500, $lte: 1000}});
```

12. 查詢 comments 有大於等於 500 以上的 document 列表

```
db.posts.find({comments: {$gte: 500}});
```

13. 查詢 tags 欄位，有 謎因 或(or) 幹話 的 document 列表

```
db.posts.find({tags: {$in: ["謎因", "幹話"]}});
```

14. 查詢 tags 欄位，有 幹話 的 document 列表，需隱藏 \_id 欄位

```
db.posts.find({tags: "幹話"}, {_id: 0});
```

15. 請嘗試用 Mongo Shell 指令刪除全部 Documents

```
db.posts.deleteMany({});
```

## 自主研究題

1. posts 所有 document 數量為？(回傳數字)

```
db.posts.find().count()
```

2. 請查詢 name 為 Ray Xu 的 document 列表，排序為由新到舊

```
db.posts.find({name: "Ray Xu"}).sort({_id: -1});
```

3. 請查詢 name 為 Ray Xu 的 document 列表，顯示前 30 筆資料

```
db.posts.find({name: "Ray Xu"}).limit(30);
```

4. 請查詢 name 為 Ray Xu ，顯示 100(含) 個讚以上的前 30 筆 document 列表，時間排序由新到舊

```
db.posts.find({name: "Ray Xu", likes: {$gte: 100}}).sort({_id: -1}).limit(30);
```

5. 請查詢 comments 超過 100 的 document 列表，跳過前 30 筆資料，再顯示 30 筆資料

```
db.posts.find({comments: {$gt: 100}}).skip(30).limit(30);
```

6. 尋找超夯熱門貼文，請查詢 likes 且(and) comments 都 1,500(含)以上的 document 列表

```
db.posts.find({$and: [{likes: {$gte: 1500}},{comments: {$gt: 1500}}]});
```

7. 尋找普通熱門貼文，請查詢 likes 或(or) comments ， 1,000(含)以上 的 document 列表

```
db.posts.find({$or: [{likes: {$gte: 1500}},{comments: {$gt: 1500}}]});
```

8. 查詢 image 欄位為 null 的 document 列表

```
db.posts.find({image: null});
```

9. 隨意找一筆 document 資料，將 tags 欄位裡的陣列，新增一個新 tags 為 遊記

```
db.posts.updateOne({_id: ObjectId("641daaf3255bb26e04997f96")}, {$push: {tags: '遊記'}});
```

10. 將所有 tags 陣列裡的 感情 都移除

```
db.posts.updateMany({}, {$pull: {tags: '感情'}});
```
