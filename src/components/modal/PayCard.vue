<template>
  <div class="card">
    <div class="wrapper">
      <h3 class="card__bank-name">BANK</h3>
      <div class="card__pay-service">
        <img src="@/assets/img/visa.png" alt="pay-service" class="card__pay-service--img" />
      </div>
    </div>
    <div class="card__chip">
      <img src="@/assets/img/chip-logo-black-and-white.png" alt="card-chip" class="card__chip--img" />
    </div>
    <div class="card__number">
      <my-input :field="'card'" />
    </div>
    <div class="wrapper">
      <div class="card__info">
        <span class="card__info--owner">John Doe</span>
        <div class="card__info--inputs">
          <my-input class="date" :field="'date'" />
          <my-input class="cvv" :field="'CVV'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from '@/store';
import MyInput from '@/components/UI/MyInput.vue';
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.card {
  position: relative;
  padding: 0.5rem 1.5rem;
  min-width: 300px;
  background: {
    image: url(@/assets/img/card-bg.jpg);
    size: cover;
    repeat: no-repeat;
  }
  border-radius: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  &__chip,
  &__number,
  &__info {
    padding: 0 1rem;
  }

  &__chip {
    margin: 0.5rem 0;

    &--img {
      display: block;
      max-width: 50px;
    }
  }

  &__number {
    :deep(.my-input__group--input) {
      text-align: center;
    }
  }

  &__info {
    margin-top: 0.5rem;
    width: 100%;

    &--owner {
      font-size: 0.8em;
      font-weight: 700;
    }

    &--inputs {
      display: flex;
      align-items: center;
      justify-content: space-between;

      :deep(.my-input) {
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
        font-size: 0.8em;

        .my-input__header {
          font-weight: 400;
        }

        .my-input__group--input {
          max-width: 45px;
        }
      }
    }
  }
}
</style>
