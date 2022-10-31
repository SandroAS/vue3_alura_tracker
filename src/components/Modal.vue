<template>
  <div
    v-if="mostrar"
    class="modal"
    :class="{ 'is-active': mostrar }"
  >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <slot name="cabecalho"/>
        </header>
        <section class="modal-card-foot">
          <slot name="corpo"/>
        </section>
        <footer class="modal-card-foot">
          <slot name="rodape"/>
        </footer>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    mostrar: {
      required: true,
      type: Boolean
    }
  }
})

</script>
