<template>
  <Teleport to="body">
    <transition name="modal-anime">
      <div class="buy" v-if="modalIsShow" @mousedown="closeModal">
        <section v-show="!orderIsCompleted" @mousedown.stop @submit.prevent class="buy__form">
          <span class="buy__form--close" @click="closeModal">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </span>
          <h2 class="buy__form--header">Ordering</h2>
          <section class="buy__form--info">
            <div class="personal-info">
              <AppInput :field="'fullName'" />
              <AppInput :field="'phone'" />
              <AppInput :field="'adress'" />
              <AppInput :field="'email'" />
            </div>
            <modal-payment />
          </section>
        </section>
        <span v-show="orderIsCompleted" class="buy__success">Order successfully completed!</span>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/store';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import ModalPayment from '@/components/modal/ModalPayment.vue';

const modalStore = useModalStore();
const { modalIsShow, orderIsCompleted, buyAttemt } = storeToRefs(modalStore);

const closeModal = (): void => {
  modalStore.$reset();
  modalIsShow.value = false;
  buyAttemt.value = false;
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
@import '@/assets/scss/variables.scss';

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
    border-radius: 20px;

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
      font: {
        family: 'Pacifico', cursive;
        size: 1.6rem;
      }
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
    }
  }

  .buy__success {
    padding: 1rem;
    font-size: 1.5rem;
    color: $primary;
    background-color: $white;
    border: 1px solid $secondary;
    border-radius: 20px;
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
