import { projeto } from './modulos/projetos';
import { tarefa } from './modulos/tarefas';
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { NOTIFICAR } from './tipo-mutacoes'
import { INotificacao } from '@/interfaces/INotificacao'
import { EstadoProjeto } from './modulos/projetos'
import { EstadoTarefa } from './modulos/tarefas'

export interface Estado {
  notificacoes: INotificacao[],
  projeto: EstadoProjeto,
  tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    projeto: {
      projetos: []
    },
    tarefa: {
      tarefas: [],
    }
  },
  mutations: {
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
  modules: {
    projeto,
    tarefa
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
