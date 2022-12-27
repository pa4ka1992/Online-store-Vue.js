<template>
  <div class="buy" @mousedown="modalIsShow = false" >
    <form 
    @mousedown.stop
    @submit.prevent 
    class="buy__form">
      <my-input :field="'fullName'" />
      <my-input :field="'phone'" />
      <my-input :field="'adress'" />
      <my-input :field="'email'" />
      <my-input :field="'card'" />
      <my-input :field="'date'" />
      <my-input :field="'CVV'" />   
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useModalStore } from '@/store';
import { storeToRefs } from 'pinia';
import MyInput from '@/components/UI/MyInput.vue';

const modalStore = useModalStore();
const { modalIsShow } = storeToRefs(modalStore);

</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.buy {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem;
    background-color: $light;
    @include block-style;
  }
}
</style>
