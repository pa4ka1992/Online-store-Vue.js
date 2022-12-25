<template>
  <div class="buy-wrapper">
    <form @submit.prevent class="buy-form">
      <input
        v-model="validation.fullName.val"
        @blur="modalStore.validateName"
        type="text"
        placeholder="Full name" />
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
<style lang="scss" scoped></style>
