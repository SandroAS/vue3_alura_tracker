import { Estado } from './../../index'
import { Module } from 'vuex'
import http from '@/http'
import ITarefa from '@/interfaces/ITarefa'
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from '@/store/tipo-acoes'
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from '@/store/tipo-mutacoes'

export interface EstadoTarefa {
  tarefas: ITarefa[],
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(tarefa => tarefa.id === tarefa.id)
      state.tarefas[index] = tarefa
    },
  },
  actions: {
    [OBTER_TAREFAS] ({ commit }, filtro: string) {
      let url = 'tarefas'
      if(filtro) url += '?descricao=' + filtro
      http.get(url)
        .then(res => commit(DEFINIR_TAREFAS, res.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa, ) {
      return http.post('/tarefas', tarefa)
        .then(res => commit(ADICIONA_TAREFA, res.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    }
  }
}
