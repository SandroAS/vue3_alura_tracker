<template>
  <header>
      <h1>
        <img src="../assets/logo.png" alt="">  
      </h1>
      <button class="button" @click="alterarTema">
        {{ textoBotao }}
      </button>
      <nav class="panel mt-5">
        <ul>
          <li class="link">
            <router-link to="/" class="link">
              <i class="fas fa-tasks"></i>
              tarefas
            </router-link>
          </li>
          <hr class="my-1" style="height: 0.5px;">
          <li>
            <router-link to="/projetos" class="link">
              <i class="fas fa-project-diagram"></i>
              projetos
            </router-link>
          </li>
        </ul>
      </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data () {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoBotao () {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  methods: {
    alterarTema () {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel {
  padding: 4px 12px;
  background-color: teal;
  text-align: justify;
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
link:hover {
  color: #0d3b66;
}
link.router-link-active {
  color: #FAF0CA;
}
</style>
