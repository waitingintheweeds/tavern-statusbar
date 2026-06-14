import { ref } from 'vue';

export const NPC_NAMES = ['沧小鱼', '陆清茶', '青丘雪', '夏霞', '爱丽丝', '墨月', '霍莉莉'];

export const NPC_UNIQUE = {
  沧小鱼: { key: '依赖值', label: '🤍依赖', color: 'dep' },
  陆清茶: { key: '嫉妒值', label: '💚嫉妒', color: 'jea' },
  青丘雪: { key: '裂隙值', label: '💔裂隙', color: 'fis' },
  夏霞: { key: '原则值', label: '⚖️原则', color: 'pri' },
  爱丽丝: { key: '狩猎欲', label: '🎯狩猎', color: 'hnt' },
  墨月: { key: '观察值', label: '👁观察', color: 'obs' },
  霍莉莉: { key: '信赖值', label: '🤝信赖', color: 'trs' },
};

function emptyNpc() {
  return { 好感度: 0, 暴露值: 0, 色欲值: 0, 善恶值: 0 };
}

function mkEmpty() {
  const npcs: any = {};
  for (const n of NPC_NAMES) npcs[n] = { ...emptyNpc(), [NPC_UNIQUE[n].key]: 0 };
  return {
    世界: { 当前时间: '', 当前地点: '', 当前时段: '', 剧情阶段: '', 校园骚动度: 0 },
    主角: { 伪装度: 80 },
    ...npcs,
  };
}

function mkInit() {
  const npcs: any = {};
  for (const n of NPC_NAMES) npcs[n] = { ...emptyNpc(), [NPC_UNIQUE[n].key]: 0 };
  // Per initvar defaults
  npcs['陆清茶'].嫉妒值 = 10;
  npcs['夏霞'].原则值 = 80;
  npcs['爱丽丝'].狩猎欲 = 30;
  npcs['墨月'].暴露值 = 100;
  npcs['墨月'].观察值 = 50;
  return {
    世界: { 当前时间: '2024/09/01-08:00', 当前地点: '教室', 当前时段: '上午课', 剧情阶段: '日常探索', 校园骚动度: 0 },
    主角: { 伪装度: 80 },
    ...npcs,
  };
}

export function useDataStore() {
  const stat_data = ref<any>(mkInit());

  if ('function' === typeof (window as any).getVariables) {
    try {
      const raw = (window as any).getVariables({ type: 'message', message_id: -1 });
      const d = (window as any)._?.get(raw, 'stat_data', null);
      if (d && d.世界?.当前地点) {
        stat_data.value = d;
      }
    } catch (_) {}
    window.addEventListener('message', (e) => {
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (d?.stat_data?.世界?.当前地点) {
          stat_data.value = d.stat_data;
        }
      } catch (_) {}
    });
  }
  return { stat_data, mkInit, mkEmpty };
}
