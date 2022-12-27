<template>
 <input 
  v-model="fieldVal.val"
  @blur="validate(field)"
  :type="type" :placeholder="placeholder" />
</template>

<script lang="ts" setup>
import { useModalStore } from '@/store';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { IValidation, TValidationField } from '@/store/modal/types';

const props = defineProps<{
  field: keyof IValidation<TValidationField>
}>();

const modalStore = useModalStore();
const { validation } = storeToRefs(modalStore);
const fieldVal = ref(validation.value[props.field])
const type = ref(validation.value[props.field].type)
const placeholder = ref(validation.value[props.field].placeholder)
const { validate } = modalStore;
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/index.scss';


</style>