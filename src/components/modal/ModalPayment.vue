<template>
  <div class="payment">
    <modal-pay-card class="payment__card" />
    <div class="payment__buy-group">
      <div class="payment__sum">
        <span class="payment__sum--header">Total price: </span>
        <span class="payment__sum--total"> <my-number :input="getPromoPrice" :fixed="2" /> $ </span>
      </div>
      <my-button class="payment__buy-group--button" @click="buy">Confirm</my-button>
      <span class="payment__buy-group--alert" :class="{ visible: buyAttemt }">
        Please make sure all fields are filled in correctly
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LocalStorageApi } from '@/services/local-storage';
import ModalPayCard from '@/components/modal/ModalPayCard.vue';
import { useCartStore, useModalStore, usePaginationStore, usePromoStore } from '@/store';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { LSKey } from '@/store/cart/constants';

import router from '@/router';

const _LS = LocalStorageApi.getInstance();
const modalStore = useModalStore();
const paginationStore = usePaginationStore();
const promoStore = usePromoStore();
const cartStore = useCartStore();
const { getPromoPrice } = storeToRefs(promoStore);
const { modalIsShow, isAllValid } = storeToRefs(modalStore);
const buyAttemt = ref(false);
const orderIsCompleted = ref(false);

const closeModal = (): void => {
  modalStore.$reset();
  modalIsShow.value = false;
  buyAttemt.value = false;
};

const buy = (): void => {
  if (isAllValid.value) {
    orderIsCompleted.value = true;
    _LS.removeProperties([LSKey.cart, LSKey.page, LSKey.limit]);
    cartStore.$reset();
    paginationStore.$reset();
    promoStore.$reset();
    buyAttemt.value = false;

    setTimeout((): void => {
      orderIsCompleted.value = false;
      closeModal();
      router.push({ name: 'overview' });
    }, 3000);
    return;
  }

  buyAttemt.value = true;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.payment {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__buy-group {
    display: flex;
    flex-direction: column;

    .payment__sum {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 1rem 0;
      font-size: 1.1rem;
      text-transform: uppercase;

      &--total {
        color: $success;
      }
    }

    &--alert {
      margin-top: 0.3rem;
      font-size: 0.8rem;
      color: $danger;
      opacity: 0;
    }

    .visible {
      opacity: 1;
    }
  }
}
</style>
