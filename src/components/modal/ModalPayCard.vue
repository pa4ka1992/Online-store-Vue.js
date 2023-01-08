<template>
  <div class="card">
    <div class="wrapper">
      <h3 class="card__bank-name">BANK</h3>
      <div class="card__pay-service">
        <img
          v-if="cardServiceImg"
          :src="cardServiceImg"
          alt="pay-service"
          class="card__pay-service--img" />
      </div>
    </div>
    <div class="card__chip">
      <img src="@/assets/img/chipLogo.png" alt="card-chip" class="card__chip--img" />
    </div>
    <div class="card__number">
      <AppInput :field="'card'" />
    </div>
    <div class="wrapper">
      <div class="card__info">
        <span class="card__info--owner">John Doe</span>
        <div class="card__info--inputs">
          <AppInput class="date" :field="'date'" />
          <AppInput class="cvv" :field="'CVV'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/store';
import { storeToRefs } from 'pinia';

const { cardServiceImg } = storeToRefs(useModalStore());
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.card {
  position: relative;
  padding: 0.5rem 1.8rem;
  min-width: 365px;
  background: {
    image: url(@/assets/img/cardBG.jpg);
    size: cover;
    repeat: no-repeat;
  }
  border-radius: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
  }

  &__bank-name {
    margin: 0;
  }

  &__pay-service {
    &--img {
      display: block;
      position: absolute;
      top: 10px;
      right: 10px;
      max-width: 70px;
    }
  }

  &__chip {
    margin-left: 1rem;

    &--img {
      display: block;
      max-width: 50px;
    }
  }

  &__number {
    :deep(.form__group--input) {
      text-align: center;
    }
  }

  &__info {
    width: 100%;

    &--owner {
      font-size: 0.8em;
      font-weight: 700;
    }

    &--inputs {
      display: flex;
      gap: 1rem;

      .date {
        flex-basis: 50%;
      }

      .cvv {
        flex-basis: 50%;
      }

      :deep(.app-input .form) {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        font-size: 0.8em;

        .form__header {
          font-weight: 400;
        }

        .form__group--input {
          text-align: center;
          max-width: 5em;
        }
      }
    }
  }
}
</style>
