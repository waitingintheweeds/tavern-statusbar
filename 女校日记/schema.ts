export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    当前时段: z.string(),
    剧情阶段: z.string(),
    校园骚动度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({当前时间: '2024/09/01-08:00', 当前地点: '教室', 当前时段: '上午课', 剧情阶段: '日常探索', 校园骚动度: 0}),

  主角: z.object({
    伪装度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({伪装度: 80}),

  沧小鱼: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    依赖值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    崩坏值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0, 依赖值: 0, 崩坏值: 0}),

  陆清茶: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    嫉妒值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0, 嫉妒值: 10}),

  青丘雪: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    裂隙值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0, 裂隙值: 0}),

  夏霞: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    原则值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0, 原则值: 80}),

  爱丽丝: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    狩猎欲: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0, 狩猎欲: 30}),

  墨月: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    观察值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 100, 色欲值: 0, 善恶值: 0, 观察值: 50}),

  霍莉莉: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    暴露值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    善恶值: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    信赖值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }).prefault({好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0, 信赖值: 0}),
});

export type Schema = z.output<typeof Schema>;
