<template>
  <Teleport to="body">
    <transition-group name="modal-anime">
      <div class="buy" v-if="modalIsShow" @mousedown="closeModal">
        <section v-show="!orderIsCompleted" @mousedown.stop @submit.prevent class="buy__form">
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
          </section>
        </section>
        <span v-show="orderIsCompleted" class="buy__success">Order successfully completed!</span>
      </div>
    </transition-group>
  </Teleport>
</template>

<script lang="ts" setup>
import { LocalStorageApi } from '@/services/local-storage';
import { useCartStore, useModalStore, usePaginationStore, usePromoStore } from '@/store';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import PayCard from '@/components/modal/PayCard.vue';
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
    _LS.removeProperties(['cart', 'cart-page', 'cart-limit']);
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

watch(modalIsShow, (newModalIsShow) => {
  if (newModalIsShow) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
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
  z-index: 15;
  user-select: none;

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
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

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
    }
  }

  .buy__success {
    padding: 1rem;
    font-size: 1.5rem;
    color: $primary;
    border: 1px solid $secondary;
    @include block-style;
  }
}

.modal-anime {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0);
  }

  &-leave-active {
    transform: scale(0);
  }
}
</style>
