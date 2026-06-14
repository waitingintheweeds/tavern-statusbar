<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore, NPC_NAMES, NPC_UNIQUE } from './store';

const store = useDataStore();
const d = computed(() => store.stat_data as any);

const pct = (v: number, max = 100) => Math.max(0, Math.min(100, Math.round((v || 0) / max * 100))) + '%';
const sign = (v: number) => (v >= 0 ? '+' + v : '' + v);

const evilLabel = (v: number) => {
  if (v >= 30) return { t: '善良', c: 'good' };
  if (v >= -30) return { t: '中立', c: 'neu' };
  return { t: '邪恶', c: 'evil' };
};
const expLabel = (v: number) => {
  if (v >= 80) return { t: '危险', c: 'exp-hi' };
  if (v >= 40) return { t: '可疑', c: 'exp-md' };
  return { t: '安全', c: 'exp-lo' };
};

const npcs = computed(() =>
  NPC_NAMES.map(n => ({ name: n, data: d.value?.[n], uk: NPC_UNIQUE[n] }))
    .filter(x => x.data)
);

const sys = computed(() => d.value?.世界 || {});
const mc = computed(() => d.value?.主角 || {});
</script>

<template>
  <div class="sb" v-if="d">
    <!-- 系统行 -->
    <div class="sys-row">
      <span class="sys-it">📅 {{ sys.当前时间 }}</span>
      <span class="sys-it">🕐 {{ sys.当前时段 }}</span>
      <span class="sys-it">📍 {{ sys.当前地点 }}</span>
      <span v-if="sys.校园骚动度 > 0" class="sys-it sys-warn">⚠️ 骚动 {{ sys.校园骚动度 }}</span>
    </div>

    <!-- 主角 -->
    <div class="mc-row">
      <div class="mc-hd">
        <span class="mc-lbl">🎭 伪装度</span>
        <span class="mc-val" :class="mc.伪装度 < 40 ? 'c-danger' : ''">{{ mc.伪装度 }}</span>
      </div>
      <div class="bar"><div class="bar-f bar-dis" :style="{ width: pct(mc.伪装度) }"></div></div>
    </div>

    <!-- NPC 网格 -->
    <div class="npc-grid">
      <div v-for="n in npcs" :key="n.name" class="npc-card">
        <div class="npc-name">{{ n.name }}</div>

        <div class="npc-bars">
          <div class="nr">
            <span class="nr-l">♥</span>
            <div class="bar bar-xs"><div class="bar-f bar-lov" :style="{ width: pct(n.data.好感度) }"></div></div>
            <span class="nr-n">{{ n.data.好感度 }}</span>
          </div>
          <div class="nr">
            <span class="nr-l">👁</span>
            <div class="bar bar-xs" :class="n.data.暴露值 >= 60 ? 'bar-warn' : ''"><div class="bar-f bar-exp" :style="{ width: pct(n.data.暴露值) }"></div></div>
            <span class="nr-n" :class="n.data.暴露值 >= 60 ? 'c-warn' : ''">{{ n.data.暴露值 }}</span>
          </div>
          <div class="nr">
            <span class="nr-l">🔥</span>
            <div class="bar bar-xs"><div class="bar-f bar-lst" :style="{ width: pct(n.data.色欲值) }"></div></div>
            <span class="nr-n">{{ n.data.色欲值 }}</span>
          </div>
          <div class="nr">
            <span class="nr-l" :class="n.data.善恶值 >= 0 ? 'c-good' : 'c-evil'">{{ n.data.善恶值 >= 0 ? '☯' : '☠' }}</span>
            <div class="bar bar-xs bar-dual">
              <div class="bar-f bar-god" :style="{ width: pct(Math.abs(n.data.善恶值), 100) }"></div>
            </div>
            <span class="nr-n" :class="n.data.善恶值 >= 0 ? 'c-good' : 'c-evil'">{{ sign(n.data.善恶值) }}</span>
          </div>
          <div class="nr">
            <span class="nr-l">{{ n.uk.label }}</span>
            <div class="bar bar-xs"><div class="bar-f" :class="'bar-' + n.uk.color" :style="{ width: pct(n.data[n.uk.key]) }"></div></div>
            <span class="nr-n">{{ n.data[n.uk.key] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sb sb-empty" v-else>加载中…</div>
</template>
