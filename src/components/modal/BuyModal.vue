<template>
  <div class="buy">
    <form @submit.prevent class="buy__form">
      <input v-model="validation.fullName.val" @blur="modalStore.validateName" type="text" placeholder="Full name" />
      <input v-model="validation.phone.val" type="tel" placeholder="Phone number" />
      <input v-model="validation.adress.val" type="text" placeholder="Delivery adress" />
      <input v-model="validation.email.val" type="email" placeholder="E-mail" />
      <input v-model="validation.card.val" type="number" placeholder="Cart number" />
      <input v-model="validation.date.val" type="number" placeholder="Date" />
      <input v-model="validation.CVV.val" type="number" placeholder="Code" />
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useModalStore } from '@/store';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { validation } = storeToRefs(modalStore);
</script>
<style lang="scss" scoped>
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
  }
}
</style>
