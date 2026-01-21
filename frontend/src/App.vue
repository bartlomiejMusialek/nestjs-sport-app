<template>
  <div class="container">
    <h1>⚽ Top Scorers – Champions League</h1>

    <p v-if="loading" class="status">⏳ Data loading...</p>
    <p v-if="error" class="status error">{{ error }}</p>

    <ul v-if="topScorers.length" class="top-scorers">
      <li
          v-for="(player, index) in topScorers"
          :key="player.id"
          class="scorer"
      >
        <span class="position">{{ index + 1 }}.</span>

        <img
            :src="player.playerPhoto"
            :alt="player.playerName"
            class="photo"
        />

        <div class="info">
          <strong>{{ player.playerName }} • </strong>
          <small> {{ player.teamName }} • {{ player.playerCountry }}</small>
        </div>

        <div class="stats">
          ⚽ {{ player.goals }}
          <span class="assists">🅰 {{ player.assists }}</span>
        </div>
      </li>
    </ul>

    <button @click="fetchTopScorers">
      🔄 Refresh Data
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const topScorers = ref([])
const loading = ref(false)
const error = ref('')

const fetchTopScorers = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch(
        'http://localhost:3000/api/top-scorer/get-champions-league-top-scorers'
    )

    if (!res.ok) {
      throw new Error('Error fetching top scorers')
    }

    topScorers.value = await res.json()
  } catch (err) {
    error.value = '❌ Error loading data'
  } finally {
    loading.value = false
  }
}

onMounted(fetchTopScorers)
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #0f172a;
  color: #e5e7eb;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
}

.top-scorers {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.scorer {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #020617;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
}

.position {
  font-weight: bold;
  width: 30px;
}

.photo {
  width: 48px;
  height: 48px;
}

.info {
  flex: 1;
  text-align: left;
}

.info small {
  color: #94a3b8;
}

.stats {
  font-weight: bold;
}

.assists {
  margin-left: 0.5rem;
  color: #38bdf8;
}

button {
  background: #38bdf8;
  border: none;
  color: #020617;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #0ea5e9;
}

.status {
  margin-top: 1rem;
  font-weight: bold;
}

.error {
  color: #f87171;
}
</style>
