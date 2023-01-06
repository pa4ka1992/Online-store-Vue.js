import { ref, Ref, watch } from 'vue';

export function useChunkLoader<Type>(chunkSize: number) {
  const array: Ref<Type[]> = ref([]);

  const chunkedArray: Ref<Type[]> = ref([]);

  const chunkIndex: Ref<number> = ref(0);

  const isEnd = ref(false);

  function getPart(): Type[] {
    const index = chunkIndex.value * chunkSize;
    return array.value.slice(index, index + chunkSize);
  }

  watch(array, () => {
    chunkIndex.value = 0;
    chunkedArray.value = getPart();
    isEnd.value = chunkedArray.value.length === array.value.length;
  });

  function load() {
    console.log('Call!');
    if (!isEnd.value) {
      chunkIndex.value += 1;
      chunkedArray.value.push(...getPart());
      isEnd.value = chunkedArray.value.length >= array.value.length;
    }
  }

  return { 
    array,
    chunkedArray,
    isEnd,
    load
  };
}