# 黄河口国家公园旅游平台

一个可直接本地打开的纯前端旅游平台示例，基于 `HTML + TailwindCSS + 原生 JavaScript` 构建。

## 功能概览

- 前端模拟登录
  用户名：`root`
  密码：`123456`
- Leaflet 交互地图
- 统一 JSON 数据驱动的景点 / 民宿 / 餐饮列表与详情页
- 个性化路线推荐
- AI 假装推荐路线
- 游客社区评论、点赞、删除自己的评论、最新 / 热门排序
- 收藏系统
- 夜间模式
- 中英切换
- Chart.js 旅游热度图
- `localStorage` 持久化状态
- 一键重置演示数据

## 项目结构

```text
three_huanghekou/
├─ index.html
├─ map.html
├─ route.html
├─ community.html
├─ login.html
├─ attraction-detail.html
├─ business-detail.html
├─ README.md
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  └─ js/
│     ├─ boot.js
│     ├─ tailwind-config.js
│     ├─ config.js
│     ├─ data.js
│     ├─ store.js
│     ├─ i18n.js
│     ├─ utils.js
│     ├─ components.js
│     ├─ app.js
│     ├─ page-home.js
│     ├─ page-map.js
│     ├─ page-route.js
│     ├─ page-community.js
│     ├─ page-login.js
│     ├─ page-attraction-detail.js
│     └─ page-business-detail.js
└─ images/
   ├─ eco-lodge.png
   ├─ park-collage.png
   ├─ reed-grove.png
   ├─ village-architecture.png
   └─ visitor-aerial.png
```

## 如何运行

1. 直接在浏览器中打开 [index.html](/e:/three_huanghekou/index.html)
2. 推荐使用 Chrome / Edge
3. 保持网络畅通
   TailwindCSS、Leaflet、Chart.js 和地图底图都使用 CDN / 在线资源

## 页面说明

- [index.html](/e:/three_huanghekou/index.html)
  首页、精选卡片、收藏回显、旅游热度图、最近路线摘要
- [map.html](/e:/three_huanghekou/map.html)
  Leaflet 地图、点位筛选、Marker 弹窗、详情跳转
- [route.html](/e:/three_huanghekou/route.html)
  时间 + 偏好推荐、AI 模拟推荐、时间轴路线
- [community.html](/e:/three_huanghekou/community.html)
  社区评论、点赞、删除自己的评论、排序
- [login.html](/e:/three_huanghekou/login.html)
  前端模拟登录
- [attraction-detail.html](/e:/three_huanghekou/attraction-detail.html)
  景点详情，支持 `?id=` 动态渲染
- [business-detail.html](/e:/three_huanghekou/business-detail.html)
  民宿 / 餐饮详情，支持 `?id=` 动态渲染

## 数据与状态

- 基础数据位于 [assets/js/data.js](/e:/three_huanghekou/assets/js/data.js)
- 本地状态封装位于 [assets/js/store.js](/e:/three_huanghekou/assets/js/store.js)
- 登录、收藏、评论、点赞、路线缓存、主题和语言全部通过 `localStorage` 管理

## 借鉴与融合

- `codewithsadee/tourly`
  借鉴旅游首页叙事结构与卡片节奏
- `Leaflet/Leaflet`
  借鉴地图交互组织方式、Marker + Popup 模式
- `localForage/localForage`
  借鉴前端本地存储封装思路

以上为设计与工程思路借鉴，不是简单复制。项目已结合黄河口国家公园主题、纯前端约束和本地直开场景重新实现。
