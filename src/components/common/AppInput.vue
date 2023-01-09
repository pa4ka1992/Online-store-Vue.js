<template>
  <div class="app-input">
    <div class="form">
      <h4 class="form__header">{{ fieldObj.header }}</h4>
      <div class="form__group">
        <input
          class="form__group--input"
          type="text"
          :maxlength="fieldObj?.maxLength"
          v-model.trim="fieldObj.val"
          @input="fieldObj.modify()"
          @blur="validate(field)"
          @change="validate(field)"
          :placeholder="fieldObj.placeholder"
        />
        <span class="form__group--check">
          <font-awesome-icon v-if="fieldObj.isValid" icon="fa-solid fa-circle-check" />
          <font-awesome-icon v-if="fieldObj.isAlert" icon="fa-solid fa-circle-xmark" />
        </span>
      </div>
    </div>
    <span v-if="fieldObj.isAlert" class="app-input__alert">
      {{ fieldObj.alert }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppInput',
};
</script>

<script lang="ts" setup>
import { useModalStore } from '@/store';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { IValidation, TValidationField } from '@/store/modal/_types';

const props = defineProps<{
  field: keyof IValidation<TValidationField>;
}>();

const modalStore = useModalStore();
const { validation } = storeToRefs(modalStore);
const fieldObj = ref(validation.value[props.field]);
const { validate } = modalStore;
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.app-input {
  display: flex;
  flex-direction: column;

  .form {
    &__header {
      margin: 0;
      font-size: 0.9em;
      text-transform: uppercase;
    }

    &__group {
      display: flex;
      flex-direction: column;
      position: relative;

      &--input {
        font-family: 'Poppins', sans-serif;
        flex-basis: 100%;
        padding: 0.3em 0.6rem;
        font-size: 1em;
        border: none {
          radius: 10px;
        }
        outline: 2px solid $secondary;
        transition: all 0.2s;

        &:focus-visible {
          transform: scale(0.96);
          outline-color: $primary;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }

      &--check {
        position: absolute;
        right: -1.4em;
        top: 2px;

        .fa-circle-check,
        .fa-circle-xmark {
          background-color: $light;
          border-radius: 50%;
        }

        .fa-circle-check {
          color: $success;
        }

        .fa-circle-xmark {
          color: $danger;
        }
      }
    }
  }

  &__alert {
    opacity: 1;
    margin-top: 0.3rem;
    font-size: 0.8rem;
    color: $danger;
  }
}
</style>
