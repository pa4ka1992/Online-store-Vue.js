<template>
  <div class="buy" @click="modalIsShow = false" >
    <form 
    @click.stop
    @submit.prevent 
    class="buy__form">
      <input 
      v-model="fullName.val"
      @blur="validate('fullName')"
      type="text" placeholder="Full name" />
      <input
      v-model="phone.val"
      @blur="validate('phone')"
      type="number"
      placeholder="Phone number" />
      <input
      v-model="adress.val"
      @blur="validate('adress')"
      type="text"
      placeholder="Delivery adress" />
      <input
      v-model="email.val"
      @blur="validate('email')"
      type="email"
      placeholder="E-mail" />
      <input
      v-model="card.val"
      type="number"
      placeholder="Cart number" />
      <input
      v-model="date.val"
      type="number"
      placeholder="Date" />
      <input
      v-model="CVV.val"
      type="number"
      placeholder="Code" />
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useModalStore } from '@/store';
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { validation, modalIsShow } = storeToRefs(modalStore);
const { fullName, phone, adress, email, card, date, CVV } = toRefs(validation.value);
const { validate } = modalStore;
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
