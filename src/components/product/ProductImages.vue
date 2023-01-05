<template>
  <div class="product__img">
    <section class="slider">
      <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
        <Slide v-for="img in indexedImages" :key="img.id">
          <div class="carousel__item--main">
            <img class="slider__img--main" :src="img.imgLink" alt="product" />
          </div>
        </Slide>
      </Carousel>

      <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel">
        <Slide class="slide" v-for="img in indexedImages" :key="img.id">
          <div class="carousel__item" @click="slideTo(img.id)">
            <img class="slider__img" :src="img.imgLink" alt="product" />
          </div>
        </Slide>
      </Carousel>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs, reactive, ref, computed } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { TIndexedImages } from './types';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = reactive(props);
const { images } = toRefs(product);
const currentSlide = ref(0);

const indexedImages = computed((): TIndexedImages[] => {
  return images.value.map((image, ind) => {
    return { id: ind, imgLink: image };
  });
});

const slideTo = (val: number) => {
  currentSlide.value = val;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

#thumbnails {
  margin-top: 1rem;
}

.carousel__slide {
  margin: 0 0.5rem;
}

.product__img {
  flex-basis: 50%;
  flex-grow: 0;
  width: 400px;
  padding: 1rem;
  border-radius: 10px;
  background-color: $gray-400;

  .slider__img {
    &,
    &--main {
      display: block;
      width: 100%;
      border-radius: 10px;
      cursor: pointer;
    }

    & {
      max-height: 100px;
      border: 1px solid $secondary;
    }

    &--main {
      max-width: 400px;
      max-height: 300px;
    }
  }
}
</style>
