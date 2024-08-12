<template>
  <div>
    <!--<img v-if="imageUrl" :src="imageUrl" alt="Image" />-->
    <div>
      <router-link v-for="(image, index) in imageUrls"
      :key="index"
      :to="{ name: 'Book' ,params:{'index':index}}">
        <img :src="image"  class="image" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Book from './Book.vue'
export default {
  name:'SelectBook',
  data() {
    return {
      imageUrls : {},
      lastBook:'00000'
    };
  },
  mounted() {
    this.initBookList();
  },
  methods: {
    async initBookList(){
      await this.getLastBook();
      this.getbooks();
    },
    async getLastBook(){
      const response = await axios.get('/kabuki/book_reader/api/get_last_book').
      then((response) =>{
        this.lastBook = response.data;
      });
    },
    booklistFormat(numberString){
      length = numberString.length;
      let bookIndex = ''
      for (let i = 0 ; i < 5 - length ; i ++)
        bookIndex += '0'
      bookIndex += numberString;
      return bookIndex
    },
    async getbooks(){
      let bookIndex;

      for (let index = parseInt(this.lastBook) ; index >= 0 ; index --){
        bookIndex = this.booklistFormat(String(index));
        await this.fetchImage(bookIndex);
      }
    },
    async fetchImage(bookIndex) {
        let url = '/kabuki/book_reader/api/get_image/' + bookIndex + '/0'
        const response = await axios.get(url, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(new Blob([response.data]));
        this.imageUrls[bookIndex] = imageUrl;
    },
    async openImage(bookIndex) {
      this.imageUrls = {};
      for (let i = 0 ; i <= 10 ; i ++){
        this.fetchImages(bookIndex,i)
      }
    }
  },
};
</script>

<style>

.image {
  width: 20vw;
  margin: 0 5px;
}
</style>
