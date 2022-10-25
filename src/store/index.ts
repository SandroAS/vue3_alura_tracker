import { projeto } from './modulos/projetos/index';
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from './tipo-mutacoes'
import { INotificacao } from '@/interfaces/INotificacao'
import http from '@/http'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from './tipo-acoes'
import ITarefa from '@/interfaces/ITarefa'
import { EstadoProjeto } from './modulos/projetos'

export interface Estado {
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    notificacoes: [],
    projeto: {
      projetos: []
    }
  },
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
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        )
      }, 3000)
    }
  },
  actions: {
    [OBTER_TAREFAS] ({ commit }) {
      http.get('tarefas')
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
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
