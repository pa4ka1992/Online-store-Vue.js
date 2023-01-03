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
        <Slide v-for="img in indexedImages" :key="img.id">
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
import { toRefs, ref, Ref, computed } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { TIndexedImages } from './types';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);
const currentSlide = ref(0);

const indexedImages = computed((): TIndexedImages[] => {
  return product.value.images.map((image, ind) => {
    return { id: ind, imgLink: image };
  });
});

const slideTo = (val: number) => {
  currentSlide.value = val;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

@mixin border {
  border: 1px solid $secondary {
    radius: 10px;
  }
}

.product__img {
  flex-basis: 50%;
  flex-grow: 0;
  width: 400px;
  padding: 1rem;
  border-radius: 10px;
  background-color: $mainBG;
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.49) inset;

  .slider__img {
    display: block;
    width: 100%;
    max-height: 100px;
    border: 1px solid $secondary {
      radius: 10px;
    }
  }
  .slider__img--main {
    display: block;
    width: 100%;
    max-width: 400px;
    max-height: 300px;
    border-radius: 10px;
  }
}
</style>
