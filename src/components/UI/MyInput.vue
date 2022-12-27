<template>
  <div class="my-input">
    <h4 class="my-input__header">{{ fieldObj.header }}</h4>
    <div class="my-input__group">
      <input
        class="my-input__group--input"
        v-model="fieldObj.val"
        @blur="validate(field)"
        @change="validate(field)"
        :type="fieldObj.type"
        :placeholder="fieldObj.placeholder"
      />
      <span v-if="fieldObj.isAlert" class="my-input__alert">
        {{ fieldObj.alert }}
      </span>
      <span class="my-input__group--check">
        <font-awesome-icon v-if="fieldObj.isValid" icon="fa-solid fa-check" />
        <font-awesome-icon v-if="fieldObj.isAlert" icon="fa-solid fa-xmark" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'my-input',
};
</script>

<script lang="ts" setup>
import { useModalStore } from '@/store';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { IValidation, TValidationField } from '@/store/modal/types';

const props = defineProps<{
  field: keyof IValidation<TValidationField>;
}>();

const modalStore = useModalStore();
const { validation } = storeToRefs(modalStore);
const fieldObj = ref(validation.value[props.field]);
const { validate } = modalStore;
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.my-input {
  display: flex;
  flex-direction: column;

  &__header {
    margin-top: 0;
    margin-bottom: 0.3rem;
    font-size: 0.9em;
    text-transform: uppercase;
  }

  &__group {
    display: flex;
    flex-direction: column;
    position: relative;

    &--input {
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
      right: -25px;
      top: 3px;

      .fa-check {
        color: $success;
      }

      .fa-xmark {
        color: $danger;
      }
    }
  }

  &__alert {
    margin-top: 0.3em;
    font-size: 0.8em;
    color: $danger;
  }
}
</style>
