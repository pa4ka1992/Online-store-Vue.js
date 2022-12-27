<template>
  <div class="my-input">
    <h4 class="my-input__header"> {{ placeholder }} </h4>
    <div class="my-input__group">
      <input 
        class="my-input__group--input"
        v-model="fieldVal.val"
        @blur="validate(field)"
        :type="type"
        :placeholder="placeholder" />
      <span v-if="isValid" class="my-input__group--check">
        <font-awesome-icon icon="fa-solid fa-check" />
      </span>
    </div>
    <p class="my-input__alert"></p>
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
const fieldVal = ref(validation.value[props.field]);
const type = ref(validation.value[props.field].type);
const placeholder = ref(validation.value[props.field].placeholder);
const isValid = ref(validation.value[props.field].isValid);
const { validate } = modalStore;

</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.my-input {
  font-family: 'Poppins', sans-serif;
  &__header {
    margin-top: 0;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
  }

}
.my-input__group--input {
  padding: 0.3em 0.6rem;
  font-size: 1.1em;
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
</style>
