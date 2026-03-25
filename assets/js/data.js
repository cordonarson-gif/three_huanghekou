(function (window) {
  var HHK = (window.HHK = window.HHK || {});

  HHK.data = {
    heroStats: [
      { id: "wetland", value: "1530 km²", label: { zh: "湿地生态带", en: "Wetland Ecosystem" } },
      { id: "birds", value: "370+", label: { zh: "鸟类记录", en: "Bird Species" } },
      { id: "routes", value: "12", label: { zh: "精选路线模板", en: "Route Blueprints" } },
      { id: "satisfaction", value: "96%", label: { zh: "游客满意度", en: "Satisfaction" } }
    ],
    inspirations: [
      {
        name: "codewithsadee/tourly",
        url: "https://github.com/codewithsadee/tourly",
        note: {
          zh: "借鉴旅游首页的大图叙事、卡片节奏与信息层次，但已重构为黄河口主题的玻璃质感布局。",
          en: "Inspired the narrative hero, card rhythm, and travel-first landing structure, rebuilt with our own estuary identity."
        }
      },
      {
        name: "Leaflet/Leaflet",
        url: "https://github.com/Leaflet/Leaflet",
        note: {
          zh: "参考官方交互地图组织方式，重写为景点、民宿、餐饮分层标注与弹窗卡片。",
          en: "Informed the layered marker and popup behavior, rewritten for scenic spots, lodging, and dining categories."
        }
      },
      {
        name: "localForage/localForage",
        url: "https://github.com/localForage/localForage",
        note: {
          zh: "借鉴前端存储封装思路，重新实现了零依赖 localStorage 状态层。",
          en: "Inspired the browser-storage abstraction approach; the project uses a fresh zero-dependency localStorage layer."
        }
      }
    ],
    heatLegend: [
      { time: { zh: "清晨", en: "Morning" }, intensity: 94 },
      { time: { zh: "午间", en: "Noon" }, intensity: 68 },
      { time: { zh: "傍晚", en: "Sunset" }, intensity: 89 }
    ],
    communitySeedComments: [
      {
        id: "seed-1",
        ownerId: "guest-ling",
        author: "凌风",
        placeId: "delta-estuary-boardwalk",
        rating: 5,
        likes: 21,
        createdAt: "2026-03-18T07:20:00+08:00",
        content: "日出时分真的太震撼了，木栈道尽头能看到潮汐和候鸟一起变换层次，摄影党一定要早起。"
      },
      {
        id: "seed-2",
        ownerId: "guest-helen",
        author: "Helen",
        placeId: "estuary-lodge",
        rating: 4,
        likes: 13,
        createdAt: "2026-03-16T19:10:00+08:00",
        content: "民宿离游客中心很近，晚上很安静，第二天去观鸟点非常顺。早餐的小米粥和黄河口虾酱很有记忆点。"
      },
      {
        id: "seed-3",
        ownerId: "guest-river",
        author: "河岸旅人",
        placeId: "fisherman-kitchen",
        rating: 5,
        likes: 17,
        createdAt: "2026-03-11T12:20:00+08:00",
        content: "黄河刀鱼和盐碱地时蔬的组合很惊喜，餐厅窗外就是湿地水面，适合在一日游中段补能量。"
      }
    ],
    places: [
      {
        id: "delta-estuary-boardwalk",
        type: "attraction",
        icon: "waves",
        color: "#f2b84b",
        title: { zh: "入海口观澜栈道", en: "Estuary Panorama Boardwalk" },
        subtitle: { zh: "潮汐、滩涂与候鸟迁飞同框的第一视角", en: "Front-row views of tides, mudflats, and migrating birds." },
        region: { zh: "东营·黄河口核心区", en: "Dongying · Core Estuary Zone" },
        rating: 4.9,
        popularity: 98,
        stayHours: 1.5,
        price: { zh: "免费入园，建议预约", en: "Free entry, reservation recommended" },
        openHours: "06:00 - 18:30",
        tags: [{ zh: "自然", en: "Nature" }, { zh: "摄影", en: "Photography" }, { zh: "观鸟", en: "Birding" }],
        bestFor: { nature: 98, photography: 100, leisure: 78 },
        coordinates: { lat: 37.786, lng: 118.973 },
        mapPoint: { x: 1120, y: 190 },
        image: {
          local: "image/169ac08bbbe1f9bad181f74e42b801de.jpg",
          fallback: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/169ac08bbbe1f9bad181f74e42b801de.jpg", fallback: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/abf20c4ea378fac430981dce609d944a.jpg", fallback: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "最佳日出机位之一，木栈道把滩涂、潮沟和远处黄河入海交汇线串联在一起。", en: "One of the best sunrise points, linking mudflats, tidal channels, and the meeting line of river and sea." },
        description: { zh: "这里是游客第一次真正感知黄河口尺度感的地方。早晨潮位较低时能清晰看到滩涂纹理，傍晚则适合看金色光线掠过水面。平台设置了望远镜位和拍摄停留点。", en: "This is where visitors first feel the scale of the estuary. Low tide reveals mudflat textures in the morning, while sunset paints the water with warm golden light. Viewing scopes and photography stops are integrated into the platform." },
        features: [{ zh: "建议 06:30 前到达，避开热门时段", en: "Arrive before 6:30 AM to beat the busiest window" }, { zh: "携带长焦镜头能获得更好的候鸟画面", en: "Bring a telephoto lens for stronger bird shots" }, { zh: "木栈道适合轮椅和婴儿车通行", en: "The boardwalk works well for wheelchairs and strollers" }]
      },
      {
        id: "reed-marsh-trail",
        type: "attraction",
        icon: "trees",
        color: "#e49a44",
        title: { zh: "芦苇湿地慢行环线", en: "Reed Marsh Loop Trail" },
        subtitle: { zh: "风吹苇浪时最像一条会呼吸的绿色海面", en: "A breathing green sea when the reeds sway with the wind." },
        region: { zh: "恢复湿地区", en: "Restoration Wetland Zone" },
        rating: 4.8,
        popularity: 84,
        stayHours: 1.2,
        price: { zh: "含在园区通票内", en: "Included in park ticket" },
        openHours: "07:00 - 18:00",
        tags: [{ zh: "自然", en: "Nature" }, { zh: "休闲", en: "Leisure" }, { zh: "亲子", en: "Family" }],
        bestFor: { nature: 95, photography: 82, leisure: 91 },
        coordinates: { lat: 37.775, lng: 118.943 },
        mapPoint: { x: 620, y: 380 },
        image: {
          local: "image/600bccf86568782befac255bb4d6cfc8.jpg",
          fallback: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/600bccf86568782befac255bb4d6cfc8.jpg", fallback: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/6443d51d1845eab909bd89a825cd3fdc.jpg", fallback: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "踩着木板慢行，边走边看湿地植物带的层次变化，是最适合轻度徒步和亲子漫游的一段。", en: "A slow wooden trail through layered wetland vegetation, ideal for easy walking and family exploration." },
        description: { zh: "环线采用高于湿地水位的浮桥设计，四季都能看出不同的植被色彩。春季看嫩绿新芽，秋季看大片芦花与晚霞同框。", en: "The loop uses elevated floating boardwalks above the water line, making seasonal color shifts visible all year. Spring brings tender greens, while autumn glows with reed plumes and sunset tones." },
        features: [{ zh: "全程约 2.4 公里，步行压力小", en: "About 2.4 km in total and easy to walk" }, { zh: "适合推车和慢节奏打卡", en: "Great for strollers and slow-paced visits" }, { zh: "中段有观景平台和补水点", en: "A lookout deck and water stop sit at mid-loop" }]
      },
      {
        id: "migration-observatory",
        type: "attraction",
        icon: "bird",
        color: "#d97745",
        title: { zh: "迁飞鸟类观察塔", en: "Migratory Bird Observatory" },
        subtitle: { zh: "候鸟季的高能量目的地", en: "A high-energy destination during migration season." },
        region: { zh: "观鸟缓冲带", en: "Birding Buffer Belt" },
        rating: 4.9,
        popularity: 91,
        stayHours: 1.3,
        price: { zh: "免费开放，需安静观赏", en: "Free access, quiet viewing requested" },
        openHours: "06:30 - 17:30",
        tags: [{ zh: "摄影", en: "Photography" }, { zh: "自然", en: "Nature" }, { zh: "观鸟", en: "Birding" }],
        bestFor: { nature: 92, photography: 98, leisure: 70 },
        coordinates: { lat: 37.796, lng: 118.924 },
        mapPoint: { x: 1320, y: 320 },
        image: {
          local: "image/8e818a92875de535450c3de7595ebf20.jpg",
          fallback: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/ec6dd4871809c236d35cdf766f2233c6.jpg", fallback: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/42aa074e1a50fb61a50b22645fd32100.jpg", fallback: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "塔上视野非常开阔，能连续看到潮间带、芦苇带和水鸟停歇区，是摄影路线中的必选点。", en: "The tower opens broad views over tidal flats, reed belts, and bird resting areas, making it essential for photographers." },
        description: { zh: "旺季经常能看到成群鸻鹬类和雁鸭类停歇补给。建议轻声移动，使用塔内固定观察窗，尽量避免惊扰鸟群。", en: "During peak migration, flocks of shorebirds and waterfowl often stop here to feed and rest. Move quietly and use the fixed viewing apertures to minimize disturbance." },
        features: [{ zh: "推荐自备望远镜或租借镜头", en: "Bring binoculars or rent long lenses if available" }, { zh: "上午逆光少，成像更稳定", en: "Morning light reduces glare and improves clarity" }, { zh: "现场有候鸟识别图谱展示", en: "A bird identification board is available on-site" }]
      },
      {
        id: "delta-museum",
        type: "attraction",
        icon: "landmark",
        color: "#2f8f79",
        title: { zh: "黄河三角洲生态展示馆", en: "Delta Ecology Discovery Hall" },
        subtitle: { zh: "适合先建立整体认知，再进湿地实地游览", en: "A smart first stop to understand the park before heading outdoors." },
        region: { zh: "游客服务核心区", en: "Visitor Core Area" },
        rating: 4.7,
        popularity: 72,
        stayHours: 1,
        price: { zh: "室内展馆，免费参观", en: "Indoor gallery, free visit" },
        openHours: "09:00 - 17:00",
        tags: [{ zh: "休闲", en: "Leisure" }, { zh: "自然", en: "Nature" }, { zh: "研学", en: "Learning" }],
        bestFor: { nature: 79, photography: 63, leisure: 93 },
        coordinates: { lat: 37.758, lng: 118.952 },
        mapPoint: { x: 500, y: 700 },
        image: {
          local: "image/27b2a94b89f2456c61c03cf58dea7bf4.jpg",
          fallback: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/27b2a94b89f2456c61c03cf58dea7bf4.jpg", fallback: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/125020caa0395c8a82ad9490a255ac67.jpg", fallback: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "馆内用沉浸式投影和沙盘讲清楚黄河改道、泥沙演化和鸟类栖息逻辑，非常适合雨天或亲子游客。", en: "Immersive projections and models explain river migration, sediment shifts, and habitat patterns, perfect for rainy days and families." },
        description: { zh: "如果你是第一次来黄河口，先在这里建立空间和生态认知，再去户外看真实场景，会更有代入感。馆内还有适合儿童的互动展项。", en: "First-time visitors benefit from building a spatial and ecological framework here before seeing the real landscape outside. Family-friendly interactive exhibits are also included." },
        features: [{ zh: "午后高温时段的舒适替代点", en: "A comfortable escape during the hottest hours" }, { zh: "有适合孩子的互动屏与沙盘", en: "Interactive screens and sand-table displays work well for children" }, { zh: "馆外就是游客服务与接驳中心", en: "Visitor services and shuttle access sit just outside" }]
      },
      {
        id: "sunset-pier",
        type: "attraction",
        icon: "camera",
        color: "#f59e0b",
        title: { zh: "晚霞摄影平台", en: "Sunset Reflection Pier" },
        subtitle: { zh: "摄影路线中的收尾王牌", en: "A signature finish for photography-led routes." },
        region: { zh: "滨水缓冲区", en: "Waterfront Transition Zone" },
        rating: 4.8,
        popularity: 87,
        stayHours: 1,
        price: { zh: "免费开放", en: "Free access" },
        openHours: "15:00 - 18:45",
        tags: [{ zh: "摄影", en: "Photography" }, { zh: "休闲", en: "Leisure" }, { zh: "日落", en: "Sunset" }],
        bestFor: { nature: 80, photography: 97, leisure: 90 },
        coordinates: { lat: 37.749, lng: 118.91 },
        mapPoint: { x: 1210, y: 820 },
        image: {
          local: "image/f2086fdbae5086e6812285e58989439e.jpg",
          fallback: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/5691299aebb552c09452230f5ccbe145.jpg", fallback: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/f3ce1668e78d905e42d173a0c4213d10.jpg", fallback: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "平台朝向开阔水面和低矮植被带，晚霞颜色会很干净，非常适合低饱和电影感照片。", en: "The open water and low vegetation create clean sunset color fields, ideal for cinematic low-saturation photography." },
        description: { zh: "如果路线安排到傍晚，建议把最后一站留给这里。风小的时候倒影完整，手机也能拍出层次不错的画面。", en: "If your route runs into evening, this is the stop to save for last. On calmer days the reflections stay intact, making even phone shots look layered and refined." },
        features: [{ zh: "黄金时刻建议提前 30 分钟占位", en: "Arrive 30 minutes early for golden-hour positioning" }, { zh: "适合广角与人像剪影", en: "Works well for wide-angle scenes and silhouette portraits" }, { zh: "附近设有休息椅与热饮站", en: "Resting benches and a warm-drink kiosk sit nearby" }]
      },
      {
        id: "estuary-lodge",
        type: "homestay",
        icon: "hotel",
        color: "#2f8f79",
        title: { zh: "入海口生态民宿", en: "Estuary Eco Lodge" },
        subtitle: { zh: "靠近游客中心，适合清晨出发观鸟", en: "Close to the visitor center and ideal for dawn departures." },
        region: { zh: "园区外缘服务带", en: "Outer Service Belt" },
        rating: 4.7,
        popularity: 79,
        stayHours: 12,
        price: { zh: "¥468 起 / 晚", en: "From ¥468 / night" },
        openHours: "全天接待",
        tags: [{ zh: "民宿", en: "Lodge" }, { zh: "休闲", en: "Leisure" }, { zh: "家庭友好", en: "Family Friendly" }],
        bestFor: { nature: 74, photography: 68, leisure: 96 },
        coordinates: { lat: 37.741, lng: 118.968 },
        mapPoint: { x: 760, y: 780 },
        image: {
          local: "image/eco-lodge-room.jpg",
          fallback: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/eco-lodge-room.jpg", fallback: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/27b2a94b89f2456c61c03cf58dea7bf4.jpg", fallback: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "民宿整体走安静自然风，房间配望远镜架和早鸟早餐包，特别适合第二天清晨赶观鸟点。", en: "The lodge keeps a calm nature-forward atmosphere with scope stands and early-bird breakfast packs for dawn departures." },
        description: { zh: "房型强调木色、低照度和大窗视野，公共区提供湿地路线咨询、洗衣与器材清洁服务。适合 1 晚到 2 晚的轻度度假节奏。", en: "Rooms emphasize timber tones, low-lit calm, and large windows. Shared spaces offer route advice, laundry, and gear cleaning, making it ideal for one- to two-night stays." },
        features: [{ zh: "可预约清晨接驳与早餐打包", en: "Early shuttle and packed breakfast can be reserved" }, { zh: "提供亲子房与宠物友好房型", en: "Family rooms and pet-friendly options are available" }, { zh: "大厅可查看当日热门观鸟点", en: "The lobby shares the day's hottest birdwatching locations" }]
      },
      {
        id: "reed-suite",
        type: "homestay",
        icon: "moon-star",
        color: "#57b89b",
        title: { zh: "芦花套房酒店", en: "Reed Bloom Suites" },
        subtitle: { zh: "更偏度假感的精致住宿选择", en: "A more resort-like stay for slower, polished getaways." },
        region: { zh: "滨水休闲区", en: "Waterfront Leisure District" },
        rating: 4.6,
        popularity: 73,
        stayHours: 14,
        price: { zh: "¥598 起 / 晚", en: "From ¥598 / night" },
        openHours: "全天接待",
        tags: [{ zh: "民宿", en: "Stay" }, { zh: "休闲", en: "Leisure" }, { zh: "夜景", en: "Night View" }],
        bestFor: { nature: 69, photography: 72, leisure: 94 },
        coordinates: { lat: 37.733, lng: 118.922 },
        mapPoint: { x: 980, y: 840 },
        image: {
          local: "image/reed-suite-room.jpg",
          fallback: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/reed-suite-room.jpg", fallback: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/f2086fdbae5086e6812285e58989439e.jpg", fallback: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "适合把行程放慢一点的人。露台、夜色和安静的水边步道，会让这里更像一场小型度假。", en: "Ideal for travelers who want to slow down. Terraces, evening light, and quiet waterfront paths make it feel like a compact resort break." },
        description: { zh: "酒店把芦花意象做进了灯光和布艺里，晚上会有轻音乐与湿地夜观分享活动，适合情侣或想拍夜景的人。", en: "The design pulls reed-bloom motifs into lighting and textiles. Evening live acoustic sessions and wetland night-walk talks suit couples and night-scene seekers." },
        features: [{ zh: "露台房型很适合日落小酌", en: "Terrace rooms are great for sunset drinks" }, { zh: "晚上有湿地夜观小分享", en: "Wetland night-view mini sessions happen after dark" }, { zh: "可代订园区次日晨间车位", en: "Next-morning park transfer slots can be booked" }]
      },
      {
        id: "fisherman-kitchen",
        type: "food",
        icon: "utensils-crossed",
        color: "#d97745",
        title: { zh: "渔家风味餐厅", en: "Fisherman's Kitchen" },
        subtitle: { zh: "把黄河口鲜味做得很克制也很地道", en: "A restrained yet deeply local taste of the estuary." },
        region: { zh: "游客中心餐饮带", en: "Visitor Hub Dining Row" },
        rating: 4.8,
        popularity: 88,
        stayHours: 1.1,
        price: { zh: "人均 ¥96", en: "Avg. ¥96 per person" },
        openHours: "10:30 - 20:30",
        tags: [{ zh: "餐饮", en: "Dining" }, { zh: "休闲", en: "Leisure" }, { zh: "地方风味", en: "Local Flavor" }],
        bestFor: { nature: 52, photography: 64, leisure: 98 },
        coordinates: { lat: 37.756, lng: 118.965 },
        mapPoint: { x: 680, y: 660 },
        image: {
          local: "image/fisherman-terrace.jpg",
          fallback: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/fisherman-terrace.jpg", fallback: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/b9579d46d72f70178b9cd1a0d487411b.jpg", fallback: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "推荐黄河刀鱼、鲜虾蒸蛋和盐碱地蔬菜拼盘，很适合作为一日游中段的稳定补给点。", en: "Recommended for river fish, shrimp steamed egg, and saline-soil vegetables, making it a dependable refuel stop mid-itinerary." },
        description: { zh: "菜式没有过度包装，走的是干净、鲜味明确的路线。靠窗位置能看见水面，天气好的时候体验很好。", en: "The menu avoids over-styling and keeps flavors clean and explicit. Window tables look out onto the water and feel especially rewarding on clear days." },
        features: [{ zh: "适合一日游午餐与家庭聚餐", en: "Works well for lunch on a day trip or family dining" }, { zh: "支持快速上菜套餐", en: "Quick-serving set menus are available" }, { zh: "靠窗位建议提前预约", en: "Reserve window seats in advance when possible" }]
      },
      {
        id: "delta-flavor-house",
        type: "food",
        icon: "chef-hat",
        color: "#c76a2b",
        title: { zh: "黄河口味道馆", en: "Delta Flavor House" },
        subtitle: { zh: "更适合收尾与慢食的餐厅", en: "A slower-paced dinner stop to close out the day." },
        region: { zh: "滨水商业街", en: "Waterfront Market Street" },
        rating: 4.7,
        popularity: 81,
        stayHours: 1.2,
        price: { zh: "人均 ¥118", en: "Avg. ¥118 per person" },
        openHours: "11:00 - 21:00",
        tags: [{ zh: "餐饮", en: "Dining" }, { zh: "夜景", en: "Night View" }, { zh: "休闲", en: "Leisure" }],
        bestFor: { nature: 45, photography: 73, leisure: 95 },
        coordinates: { lat: 37.738, lng: 118.934 },
        mapPoint: { x: 1100, y: 700 },
        image: {
          local: "image/delta-flavor-dining.jpg",
          fallback: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        },
        gallery: [
          { local: "image/delta-flavor-dining.jpg", fallback: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" },
          { local: "image/f2086fdbae5086e6812285e58989439e.jpg", fallback: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80" }
        ],
        summary: { zh: "夜间气氛感更强，适合把看日落、拍夜色和吃一顿舒服晚餐串在一起。", en: "Best in the evening, pairing sunset views, low-light photography, and a relaxed dinner into one finish." },
        description: { zh: "主打炖煮海鲜、黄河口特色面食和低糖甜品。整体更偏舒适型用餐，适合慢慢收尾，不赶时间。", en: "The menu leans into braised seafood, regional noodles, and low-sugar desserts. It is a comfort-first dining choice for travelers who want to ease into the evening." },
        features: [{ zh: "晚餐后步行可到滨水步道", en: "A waterfront stroll is just outside after dinner" }, { zh: "适合情侣与朋友小聚", en: "Well suited to couples and small groups of friends" }, { zh: "夜间氛围灯拍照很出片", en: "The evening lighting is especially photo-friendly" }]
      }
    ],
    // [新增] 黄河口特色美食特产与景观数据，供首页扩展板块统一渲染
    curatedContent: {
      localFlavors: {
        eyebrow: { zh: "黄河口风味", en: "Estuary flavors" },
        title: { zh: "黄河口特色美食特产", en: "Signature foods and local products" },
        subtitle: {
          zh: "把伴手礼、地方名吃与非遗餐厅串成一条浏览动线，补齐黄河口“可看、可吃、可带走”的在地体验。",
          en: "Bringing together take-home products, local bites, and heritage dining into one estuary flavor narrative."
        },
        note: {
          zh: "文案依据公开权威资料整理，图片使用 Wikimedia Commons / Pexels 可公开访问资源。",
          en: "Copy is adapted from public authoritative sources. Images use publicly accessible Wikimedia Commons and Pexels resources."
        },
        specialties: [
          {
            id: "yellow-river-knifefish",
            name: { zh: "黄河刀鱼", en: "Yellow River knifefish" },
            description: {
              zh: "黄河刀鱼是东营沿黄时鲜河鲜代表，春季洄游期肉质细嫩、刺软味鲜，清蒸或盐烤最能体现本味，也是当地餐桌常见的“尝鲜菜”。",
              en: "A seasonal estuary fish prized in spring for its tender flesh and clean taste, often served steamed or lightly grilled."
            },
            image: {
              local: "https://images.pexels.com/photos/14593042/pexels-photo-14593042.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/14593042/pexels-photo-14593042.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          },
          {
            id: "yellow-river-estuary-crab",
            name: { zh: "黄河口大闸蟹", en: "Yellow River estuary mitten crab" },
            description: {
              zh: "黄河口大闸蟹生长于河海交汇微咸水域，青背白肚、金爪黄毛，膏满黄丰、肉质紧实鲜甜，是东营最具辨识度的地理标志水产之一。",
              en: "Raised in slightly brackish estuary waters, it is known for full roe, firm meat, and a strong regional identity."
            },
            image: {
              local: "https://images.pexels.com/photos/32753004/pexels-photo-32753004.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/32753004/pexels-photo-32753004.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          },
          {
            id: "yellow-river-estuary-rice",
            name: { zh: "黄河口大米", en: "Yellow River estuary rice" },
            description: {
              zh: "黄河口大米产自盐碱地稻作区，依托黄河水灌溉与充足光照形成米粒饱满、口感软糯清香的特点，已成为黄河口代表性农产品名片。",
              en: "A saline-alkali land rice product known for plump grains, soft texture, and a clean fragrance shaped by Yellow River irrigation."
            },
            image: {
              local: "https://images.pexels.com/photos/17424346/pexels-photo-17424346.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/17424346/pexels-photo-17424346.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          },
          {
            id: "yellow-river-estuary-shrimp-paste",
            name: { zh: "黄河口虾酱", en: "Yellow River estuary shrimp paste" },
            description: {
              zh: "黄河口虾酱以沿海小虾发酵制成，色泽红褐、咸鲜浓郁，常用于蘸食、炒菜和拌面，是当地渔家饮食中极具辨识度的佐餐调味。",
              en: "A fermented shrimp condiment with a deep savory profile, commonly used for dipping, stir-frying, and noodles."
            },
            image: {
              local: "https://images.pexels.com/photos/19951488/pexels-photo-19951488.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/19951488/pexels-photo-19951488.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          },
          {
            id: "yellow-river-estuary-crab-roe-sauce",
            name: { zh: "黄河口蟹黄酱", en: "Yellow River estuary crab roe sauce" },
            description: {
              zh: "黄河口蟹黄酱以本地大闸蟹蟹黄蟹膏为风味核心，酱香浓郁、鲜味厚实，拌饭拌面或点蘸海鲜都很出彩，是近年来颇受欢迎的深加工伴手礼。",
              en: "Built around crab roe and crab paste, this rich sauce works well with rice, noodles, and seafood."
            },
            image: {
              local: "https://images.pexels.com/photos/5410417/pexels-photo-5410417.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/5410417/pexels-photo-5410417.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          }
        ],
        recommendations: [
          {
            id: "lijin-pan-fried-buns",
            name: { zh: "利津水煎包", en: "Lijin pan-fried buns" },
            description: {
              zh: "利津水煎包是东营广为人知的地方名吃，入选东营特色美食代表序列，现点现煎、底部焦香酥脆，内馅鲜香多汁，最适合趁热品尝。",
              en: "A well-known Dongying specialty with crisp pan-fried bottoms, juicy filling, and strong local recognition."
            },
            badges: [
              { zh: "地方名吃", en: "Local specialty" },
              { zh: "现煎现吃", en: "Cooked to order" }
            ],
            image: {
              local: "https://images.pexels.com/photos/36131751/pexels-photo-36131751.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/36131751/pexels-photo-36131751.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          },
          {
            id: "gudao-fish-soup",
            name: { zh: "孤岛鲜鱼汤", en: "Gudao fresh fish soup" },
            description: {
              zh: "孤岛鲜鱼汤是东营沿黄沿海地区的招牌汤菜，以现捕河鲜慢火熬出乳白汤色见长，鱼肉鲜嫩、汤头醇厚，在本地冬春餐桌和游客清单里都很有人气。",
              en: "A signature Dongying fish soup known for its milky broth, tender fish, and comforting estuary flavor."
            },
            badges: [
              { zh: "东营招牌汤菜", en: "Signature soup" },
              { zh: "河鲜本味", en: "River-fresh flavor" }
            ],
            image: {
              local: "https://images.pexels.com/photos/36694546/pexels-photo-36694546.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/36694546/pexels-photo-36694546.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          },
          {
            id: "village-chief-dumpling-soup",
            name: { zh: "村长家的疙瘩汤", en: "Village Chief's dumpling soup" },
            description: {
              zh: "村长家的疙瘩汤是东营本土餐饮品牌，已获东营市首批“非遗特色美食”认证；其大虾疙瘩汤制作技艺曾登上CCTV报道，以把东营家常味做成城市名片而受到关注。",
              en: "A Dongying dining brand recognized among the city's first intangible cultural heritage specialty foods and featured on CCTV."
            },
            badges: [
              { zh: "非遗认证餐厅", en: "Heritage-certified" },
              { zh: "曾登上 CCTV", en: "Featured on CCTV" }
            ],
            image: {
              local: "https://images.pexels.com/photos/19252757/pexels-photo-19252757.jpeg?auto=compress&cs=tinysrgb&w=1200",
              fallback: "https://images.pexels.com/photos/19252757/pexels-photo-19252757.jpeg?auto=compress&cs=tinysrgb&w=1200"
            }
          }
        ]
      },
      signatureLandscapes: {
        eyebrow: { zh: "河海奇观", en: "River-sea spectacle" },
        title: { zh: "黄河口特色景观", en: "Signature estuary landscapes" },
        subtitle: {
          zh: "从地方味道继续推进到河海湿地的视觉高潮，让首页叙事自然过渡到黄河口最具辨识度的自然奇观。",
          en: "A transition from local flavor into the estuary's most iconic natural spectacles."
        },
        note: {
          zh: "景观介绍依据黄河口生态保护与文旅公开资料整理，图片使用可公开访问的实景资源。",
          en: "Landscape notes are adapted from public conservation and tourism materials, paired with openly accessible real-scene images."
        },
        items: [
          {
            id: "bird-wave-spectacle",
            title: { zh: "黄河口乌浪（鸟浪）景观", en: "Yellow River estuary bird-wave spectacle" },
            description: {
              zh: "黄河口每逢候鸟迁徙高峰，大片水鸟会因潮汐、风向与捕食节律突然盘旋、集结、翻涌，形成如黑色潮浪般起伏的“鸟浪”奇观。它兼具生态观赏与摄影价值，是黄河口观鸟季最具冲击力的瞬间场景之一。",
              en: "During migration peaks, large flocks rise and turn together with tide and wind, creating a dramatic 'bird-wave' scene prized by birdwatchers and photographers."
            },
            gallery: [
              {
                local: "https://images.pexels.com/photos/9252250/pexels-photo-9252250.jpeg?auto=compress&cs=tinysrgb&w=1200",
                fallback: "https://images.pexels.com/photos/9252250/pexels-photo-9252250.jpeg?auto=compress&cs=tinysrgb&w=1200"
              },
              {
                local: "https://images.pexels.com/photos/12469893/pexels-photo-12469893.jpeg?auto=compress&cs=tinysrgb&w=1200",
                fallback: "https://images.pexels.com/photos/12469893/pexels-photo-12469893.jpeg?auto=compress&cs=tinysrgb&w=1200"
              }
            ]
          },
          {
            id: "yellow-blue-confluence",
            title: { zh: "黄河与渤海黄蓝交汇奇观", en: "Yellow and blue confluence of river and sea" },
            description: {
              zh: "在黄河入海口，含沙量较高的黄河水与相对清澈的渤海海水并行铺展，天气与潮位合适时可见层次分明的黄蓝分界线。河海相拥、泥沙塑洲的动态画面，构成黄河口最具标志性的自然景观之一。",
              en: "At the river mouth, silt-rich Yellow River water meets the clearer Bohai Sea, often forming a striking yellow-blue dividing line under the right tide and weather."
            },
            gallery: [
              {
                local: "https://images.pexels.com/photos/17299048/pexels-photo-17299048.jpeg?auto=compress&cs=tinysrgb&w=1200",
                fallback: "https://images.pexels.com/photos/17299048/pexels-photo-17299048.jpeg?auto=compress&cs=tinysrgb&w=1200"
              },
              {
                local: "https://images.pexels.com/photos/10144176/pexels-photo-10144176.jpeg?auto=compress&cs=tinysrgb&w=1200",
                fallback: "https://images.pexels.com/photos/10144176/pexels-photo-10144176.jpeg?auto=compress&cs=tinysrgb&w=1200"
              }
            ]
          }
        ]
      }
    }
  };
})(window);

(function (window) {
  var HHK = (window.HHK = window.HHK || {});
  if (!HHK.data) {
    return;
  }

  var imageSets = {
    sunrise: [
      "image/169ac08bbbe1f9bad181f74e42b801de.jpg",
      "image/abf20c4ea378fac430981dce609d944a.jpg",
      "image/f3ce1668e78d905e42d173a0c4213d10.jpg"
    ],
    estuary: [
      "image/169ac08bbbe1f9bad181f74e42b801de.jpg",
      "image/42aa074e1a50fb61a50b22645fd32100.jpg",
      "image/abf20c4ea378fac430981dce609d944a.jpg"
    ],
    birding: [
      "image/ec6dd4871809c236d35cdf766f2233c6.jpg",
      "image/42aa074e1a50fb61a50b22645fd32100.jpg",
      "image/8e818a92875de535450c3de7595ebf20.jpg"
    ],
    reeds: [
      "image/600bccf86568782befac255bb4d6cfc8.jpg",
      "image/6443d51d1845eab909bd89a825cd3fdc.jpg",
      "image/6e5ae7be554cc27e65792a95c47a76ec.jpg"
    ],
    museum: [
      "image/27b2a94b89f2456c61c03cf58dea7bf4.jpg",
      "image/125020caa0395c8a82ad9490a255ac67.jpg",
      "image/1291d284d74ec3455c04c739a5e98081.jpg"
    ],
    lodge: [
      "image/eco-lodge-room.jpg",
      "image/27b2a94b89f2456c61c03cf58dea7bf4.jpg",
      "image/f86e68e693b3176f698e10e105ce26cc.jpg"
    ],
    suite: [
      "image/reed-suite-room.jpg",
      "image/f2086fdbae5086e6812285e58989439e.jpg",
      "image/3ef5705d5e69110533e14b1e5aeab215.jpg"
    ],
    breakfast: [
      "image/fisherman-terrace.jpg",
      "image/b9579d46d72f70178b9cd1a0d487411b.jpg",
      "image/c660e3c3fa50bcb0fc3ec4944d515c03.jpg"
    ],
    dinner: [
      "image/delta-flavor-dining.jpg",
      "image/f2086fdbae5086e6812285e58989439e.jpg",
      "image/34115218efa9dd22013201ae5ba10b29.jpg"
    ],
    family: [
      "image/600bccf86568782befac255bb4d6cfc8.jpg",
      "image/27b2a94b89f2456c61c03cf58dea7bf4.jpg",
      "image/eco-lodge-room.jpg"
    ]
  };

  var commentSeeds = [
    { id: "c01", author: "晨汐慢旅人", placeId: "delta-estuary-boardwalk", rating: 5, likes: 286, replies: 18, shares: 21, createdAt: "2026-03-30T06:42:00+08:00", imageSet: "sunrise", imageCount: 3, content: "日出真的值回早起，木栈道尽头能同时看到潮沟纹理和晨光铺在水面上。建议 6 点前到，风不大时整个画面很高级。" },
    { id: "c02", author: "观鸟手账", placeId: "migration-observatory", rating: 5, likes: 214, replies: 16, shares: 14, createdAt: "2026-03-29T09:18:00+08:00", imageSet: "birding", imageCount: 2, content: "观鸟塔比想象中更出片，带 300mm 镜头就够用了。上午逆光少，能很清楚拍到候鸟起落的层次。" },
    { id: "c03", author: "带娃去看海", placeId: "reed-marsh-trail", rating: 5, likes: 162, replies: 13, shares: 10, createdAt: "2026-03-29T15:26:00+08:00", imageSet: "family", imageCount: 3, content: "亲子友好度很高，推车也能走，孩子一路都在认芦苇和小鸟。栈道不长，节奏刚好，不会太累。" },
    { id: "c04", author: "住进风景里", placeId: "estuary-lodge", rating: 4, likes: 133, replies: 9, shares: 7, createdAt: "2026-03-28T21:06:00+08:00", imageSet: "lodge", imageCount: 2, content: "民宿整体是安静的木质调，早起去观日出特别方便。前台会提醒第二天适合观鸟的时段，这点很贴心。" },
    { id: "c05", author: "黄河口吃货", placeId: "fisherman-kitchen", rating: 5, likes: 171, replies: 11, shares: 12, createdAt: "2026-03-28T10:22:00+08:00", imageSet: "breakfast", imageCount: 3, content: "看完日出回来吃这顿太舒服了，虾仁蒸蛋和本地小海鲜都很鲜。靠窗能看到水面，早餐也有度假感。" },
    { id: "c06", author: "雨天也有好心情", placeId: "delta-museum", rating: 4, likes: 92, replies: 5, shares: 4, createdAt: "2026-03-27T14:05:00+08:00", imageSet: "museum", imageCount: 2, content: "那天下小雨，先来展馆反而很合理。沉浸式投影和沙盘讲得挺清楚，孩子也能看懂黄河入海口是怎么形成的。" },
    { id: "c07", author: "落日剪影控", placeId: "sunset-pier", rating: 5, likes: 238, replies: 14, shares: 17, createdAt: "2026-03-27T18:48:00+08:00", imageSet: "sunrise", imageCount: 2, content: "傍晚的光线太适合拍人像剪影了，平台很开阔，手机都能拍出电影感。建议提前半小时占位。" },
    { id: "c08", author: "周末住店清单", placeId: "reed-suite", rating: 5, likes: 147, replies: 8, shares: 9, createdAt: "2026-03-26T20:12:00+08:00", imageSet: "suite", imageCount: 3, content: "如果想慢慢玩两天，芦花套房真的不错，房间空间大，软装审美在线。晚上安静，适合度假型旅行。" },
    { id: "c09", author: "沿海晚餐研究员", placeId: "delta-flavor-house", rating: 4, likes: 126, replies: 7, shares: 6, createdAt: "2026-03-26T19:34:00+08:00", imageSet: "dinner", imageCount: 3, content: "适合把看日落和晚餐串起来，菜量挺稳，味道偏清爽。靠窗位夜景不错，整体氛围比想象中精致。" },
    { id: "c10", author: "潮汐观察笔记", placeId: "delta-estuary-boardwalk", rating: 5, likes: 188, replies: 10, shares: 11, createdAt: "2026-03-26T07:15:00+08:00", imageSet: "estuary", imageCount: 2, content: "第一次这么直观地看到黄河和海交汇的纹理变化，滩涂层次特别丰富。站在观景带上会有一种很辽阔的安静感。" },
    { id: "c11", author: "镜头里的候鸟季", placeId: "migration-observatory", rating: 5, likes: 205, replies: 17, shares: 19, createdAt: "2026-03-25T08:42:00+08:00", imageSet: "birding", imageCount: 3, content: "这次候鸟运气很好，塔上视野太宽了，远处鸟群翻飞的时候真的有点震撼。现场保持安静会更容易等到大场面。" },
    { id: "c12", author: "清晨接驳体验官", placeId: "estuary-lodge", rating: 5, likes: 111, replies: 6, shares: 5, createdAt: "2026-03-25T22:10:00+08:00", imageSet: "lodge", imageCount: 1, content: "前一晚住在这里，第二天一早直接去看日出，效率很高。早餐打包也准备得很细，特别适合行程紧凑的人。" },
    { id: "c13", author: "研学路线收藏家", placeId: "delta-museum", rating: 4, likes: 98, replies: 8, shares: 6, createdAt: "2026-03-24T13:55:00+08:00", imageSet: "museum", imageCount: 3, content: "如果是第一次来，建议把展馆放在前面。先建立整体认知，再去湿地实地看，会更容易理解黄河口的地貌变化。" },
    { id: "c14", author: "芦苇风里散步", placeId: "reed-marsh-trail", rating: 5, likes: 144, replies: 9, shares: 8, createdAt: "2026-03-24T16:48:00+08:00", imageSet: "reeds", imageCount: 2, content: "这段真的很适合慢慢走，芦苇在风里摆动的时候特别治愈。人不算多，拍照和散步都很舒服。" },
    { id: "c15", author: "河海早餐俱乐部", placeId: "fisherman-kitchen", rating: 4, likes: 87, replies: 4, shares: 3, createdAt: "2026-03-23T11:24:00+08:00", imageSet: "breakfast", imageCount: 2, content: "本来只是想随便吃点，结果出乎意料地不错。味道比较在地，没有过度调味，适合一早看完景回来补充体力。" },
    { id: "c16", author: "晚霞收藏册", placeId: "sunset-pier", rating: 5, likes: 230, replies: 15, shares: 16, createdAt: "2026-03-23T18:35:00+08:00", imageSet: "sunrise", imageCount: 3, content: "晚霞把整个水面都染成柔和金橙色，现场比照片还梦幻。风小时倒影完整，真的会想多待一会儿。" },
    { id: "c17", author: "工作日逃离计划", placeId: "delta-estuary-boardwalk", rating: 5, likes: 173, replies: 12, shares: 9, createdAt: "2026-03-22T06:58:00+08:00", imageSet: "sunrise", imageCount: 1, content: "工作日清晨人很少，能安静看完整个日出过程。木栈道线条感很好，穿浅色衣服拍照会更干净。" },
    { id: "c18", author: "观鸟器材轻装派", placeId: "migration-observatory", rating: 4, likes: 102, replies: 7, shares: 5, createdAt: "2026-03-22T09:40:00+08:00", imageSet: "birding", imageCount: 2, content: "不用太重的器材也能看得很过瘾，塔上的信息板做得挺清晰。建议早点到，安静等一阵子更有惊喜。" },
    { id: "c19", author: "假日住两晚", placeId: "reed-suite", rating: 5, likes: 134, replies: 8, shares: 7, createdAt: "2026-03-21T21:30:00+08:00", imageSet: "suite", imageCount: 2, content: "两晚住下来节奏特别舒服，白天出去看湿地，晚上回房间慢慢休息。浴缸和窗景都很加分，很像轻奢度假酒店。" },
    { id: "c20", author: "宠物友好观察员", placeId: "estuary-lodge", rating: 4, likes: 89, replies: 5, shares: 4, createdAt: "2026-03-21T17:20:00+08:00", imageSet: "lodge", imageCount: 2, content: "服务态度很好，公共区也比较宽松。整体更适合想住得踏实、第二天继续深度玩的旅伴组合。" },
    { id: "c21", author: "黄河口夜色控", placeId: "delta-flavor-house", rating: 5, likes: 153, replies: 9, shares: 8, createdAt: "2026-03-20T20:08:00+08:00", imageSet: "dinner", imageCount: 3, content: "傍晚看完日落再来吃饭刚刚好，夜色和灯光很柔和。菜品不重口，适合旅行尾声慢慢收尾。" },
    { id: "c22", author: "秋天来吹风", placeId: "reed-marsh-trail", rating: 5, likes: 167, replies: 11, shares: 10, createdAt: "2026-03-20T15:12:00+08:00", imageSet: "reeds", imageCount: 3, content: "虽然现在不是深秋，但已经能想象芦花大片发白时会有多美。这里适合不赶时间地散步，拍照也自然。" },
    { id: "c23", author: "陪爸妈旅行", placeId: "delta-museum", rating: 4, likes: 76, replies: 4, shares: 3, createdAt: "2026-03-19T11:40:00+08:00", imageSet: "museum", imageCount: 1, content: "爸妈对展馆里的地貌演变内容很感兴趣，坐着慢慢看也不累。适合作为全天路线里的中间休整点。" },
    { id: "c24", author: "在地风味记录者", placeId: "fisherman-kitchen", rating: 5, likes: 118, replies: 7, shares: 6, createdAt: "2026-03-19T12:18:00+08:00", imageSet: "breakfast", imageCount: 3, content: "河鲜和本地小菜搭得很舒服，没有游客餐那种敷衍感。想尝在地风味的话，这家可以放心排进路线里。" },
    { id: "c25", author: "黄蓝交汇目击者", placeId: "delta-estuary-boardwalk", rating: 5, likes: 249, replies: 19, shares: 18, createdAt: "2026-03-18T07:08:00+08:00", imageSet: "estuary", imageCount: 3, content: "天气配合时真的能看到河海颜色的分界，现场超级震撼。那一刻会理解为什么这么多人专门来黄河口打卡。" },
    { id: "c26", author: "云层控摄影师", placeId: "sunset-pier", rating: 5, likes: 198, replies: 13, shares: 15, createdAt: "2026-03-18T18:58:00+08:00", imageSet: "sunrise", imageCount: 2, content: "云层有一点层次的时候，晚霞会更有戏。平台空间很够，不会互相挡镜头，拍人像和环境都好看。" },
    { id: "c27", author: "周末两天一夜", placeId: "estuary-lodge", rating: 5, likes: 129, replies: 8, shares: 9, createdAt: "2026-03-17T22:36:00+08:00", imageSet: "family", imageCount: 2, content: "我们是第一天展馆+湿地，第二天早起看日出，这家住宿正好把两天节奏衔接起来。家庭出行会轻松很多。" },
    { id: "c28", author: "一天看尽黄河口", placeId: "migration-observatory", rating: 4, likes: 91, replies: 6, shares: 5, createdAt: "2026-03-17T10:16:00+08:00", imageSet: "birding", imageCount: 1, content: "上午先去观鸟塔，再走木栈道，中午吃河鲜，这样排很顺。观鸟塔是整条路线里最有记忆点的一站。" },
    { id: "c29", author: "风味地图采集员", placeId: "delta-flavor-house", rating: 4, likes: 84, replies: 4, shares: 4, createdAt: "2026-03-16T19:20:00+08:00", imageSet: "dinner", imageCount: 2, content: "吃饭这件事被这里收尾得很好，菜式比较克制，不会太油。适合看完景之后慢慢坐下来聊聊天。" },
    { id: "c30", author: "湿地摄影备忘录", placeId: "delta-estuary-boardwalk", rating: 5, likes: 176, replies: 12, shares: 13, createdAt: "2026-03-16T06:36:00+08:00", imageSet: "estuary", imageCount: 2, content: "如果只推荐一个必去点，我还是选入海口观景带。构图元素非常丰富，潮沟、光线、鸟群都能入镜，很容易拍出层次。" }
  ];

  HHK.data.communitySeedComments = commentSeeds.map(function (item, index) {
    var images = imageSets[item.imageSet] || imageSets.sunrise;
    return {
      id: item.id,
      ownerId: "guest-" + item.id,
      author: item.author,
      avatar: HHK.createAvatarDataUri(item.author),
      placeId: item.placeId,
      rating: item.rating,
      likes: item.likes,
      replies: item.replies,
      shares: item.shares,
      createdAt: item.createdAt,
      images: images.slice(0, item.imageCount),
      content: item.content,
      featured: index < 8
    };
  });
})(window);
