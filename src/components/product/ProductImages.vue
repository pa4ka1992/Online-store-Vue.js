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
    <!-- <div class="product__img--slider">
      <img class="slider__img" :src="img" v-for="img in images" :key="img" alt="product" />
    </div>
    <div class="product__img--view">
      <img class="product__img" :src="images[0]" alt="product" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs, ref } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);
const { images } = toRefs(product.value);
const currentSlide = ref(0);

type TIndexedImages = {
  id: number;
  imgLink: string;
};

const indexedImages: TIndexedImages[] = images.value.map((image, ind) => {
  return { id: ind, imgLink: image };
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
  flex-basis: 40%;
  flex-grow: 0;
  width: 500px;

  // .carousel__item {
  //   max-width: 100px;
  //   max-height: 100px;
  // }
  // .carousel__item--main {
  //   max-width: 500px;
  //   max-height: 500px;
  // }

  .slider__img {
    display: block;
    width: 100%;
    max-height: 200px;
  }
  .slider__img--main {
    display: block;
    width: 100%;
    max-width: 400px;
    max-height: 200px;
  }
  // &--slider {
  //   display: flex;
  //   flex-direction: column;
  //   gap: 0.5rem;
  //   max-width: 500px;

  //   .slider__img {
  //     display: block;
  //     max-width: 150px;
  //     @include border;
  //   }
  // }

  // &--slide {
  //   display: flex;
  // }

  // &--view {
  //   .product__img {
  //     display: block;
  //     max-width: 400px;
  //     @include border;
  //   }
  // }
}
</style>
