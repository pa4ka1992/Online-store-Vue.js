<template>
  <div class="buy" @mousedown="closeModal">
    <section @mousedown.stop @submit.prevent class="buy__form">
      <span class="buy__form--close" @click="closeModal">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </span>
      <h2 class="buy__form--header">Ordering</h2>
      <section class="buy__form--info">
        <div class="personal-info">
          <my-input :field="'fullName'" />
          <my-input :field="'phone'" />
          <my-input :field="'adress'" />
          <my-input :field="'email'" />
        </div>
        <div class="payment">
          <pay-card class="payment__card" />
          <my-button class="payment__button" @click="buy">Confirm</my-button>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore, useModalStore, usePaginationStore, usePromoStore } from '@/store';
import {} from '@/store';
import { storeToRefs } from 'pinia';
import MyInput from '@/components/UI/MyInput.vue';
import MyButton from '@/components/UI/MyButton.vue';
import PayCard from '@/components/modal/PayCard.vue';

const modalStore = useModalStore();
const paginationStore = usePaginationStore();
const promoStore = usePromoStore();
const cartStore = useCartStore();
const { modalIsShow } = storeToRefs(modalStore);

const closeModal = (): void => {
  modalStore.$reset();
  modalIsShow.value = false;
};

const buy = (): void => {
  cartStore.clearStore();
  paginationStore.clearStore();
  cartStore.$reset();
  paginationStore.$reset();
  promoStore.$reset();
  closeModal();
};
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
  font-family: 'Poppins', sans-serif;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &__form {
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    padding: 1.5rem 3rem;
    background-color: $light;
    @include block-style;

    &--close {
      position: absolute;
      top: 10px;
      right: 20px;
      padding: 0.3rem;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: $danger;
      }
    }

    &--header {
      margin: 0;
    }

    &--info {
      display: flex;
      gap: 4rem;

      .personal-info {
        display: flex;
        flex-direction: column;
      }

      .payment {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &__card {
        }

        &__button {
          margin-top: 2rem;
        }
      }
    }
  }
}
</style>
