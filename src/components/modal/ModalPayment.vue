<template>
  <div class="payment">
    <modal-pay-card class="payment__card" />
    <div class="payment__buy-group">
      <div class="payment__sum">
        <span class="payment__sum--header">Total price: </span>
        <span class="payment__sum--total"> $<AppNumber :input="getPromoPrice" :fixed="2" /> </span>
      </div>
      <AppButton class="payment__buy-group--button" @click="buy">Confirm</AppButton>
      <span class="payment__buy-group--alert" :class="{ visible: buyAttemt }">
        Please make sure all fields are filled in correctly
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LocalStorageApi } from '@/services/local-storage';
import ModalPayCard from '@/components/modal/ModalPayCard.vue';
import { useCart, useModal, usePagination, usePromo } from '@/store';
import { storeToRefs } from 'pinia';
import { LSKey } from '@/store/cart/_constants';
import { RouteNames } from '@/router/names';

import router from '@/router';

const _LS = LocalStorageApi.getInstance();
const modalStore = useModal();
const paginationStore = usePagination();
const promoStore = usePromo();
const cartStore = useCart();
const { getPromoPrice } = storeToRefs(promoStore);
const { modalIsShow, isAllValid, orderIsCompleted, buyAttemt } = storeToRefs(modalStore);

const closeModal = (): void => {
  modalStore.$reset();
  modalIsShow.value = false;
  buyAttemt.value = false;
};

const buy = (): void => {
  if (isAllValid.value) {
    orderIsCompleted.value = true;
    _LS.removeProperties([LSKey.cart, LSKey.page, LSKey.limit]);
    cartStore.clearCart();
    cartStore.$reset();
    paginationStore.$reset();
    promoStore.$reset();
    buyAttemt.value = false;

    setTimeout((): void => {
      orderIsCompleted.value = false;
      closeModal();
      router.push({ name: RouteNames.landing });
    }, 3000);
    return;
  }

  buyAttemt.value = true;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

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

      &--header {
        font-weight: 600;
      }

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
