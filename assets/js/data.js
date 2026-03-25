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
    ]
  };
})(window);
