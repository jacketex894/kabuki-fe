<template>
    <div>
      <div class="images">
        <div v-for="(image,index) in imageUrls" >
          <img :src="image"  class="page" />
        </div>
      </div>
      <router-link to="/">Go to Home</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'Book',
    data() {
    return {
      imageUrls : {}
      }
    },
    mounted() {
    this.openImage(this.$route.params.index);
    },
    methods: {
      async getPages(path){
        let url = '/kabuki/book_reader/api/get_pages/' + path;
        const response = await axios.get(url);
        return response
      },
      async fetchImages(path,page) {
        let url = '/kabuki/book_reader/api/get_image/' + path + '/' + page;
        const response = await axios.get(url, {
          responseType: 'blob', // 注意此處使用 blob 作為回應類型
        });
        const imageUrl = URL.createObjectURL(new Blob([response.data]));
        this.imageUrls[page] = imageUrl;
      },
      async openImage(bookIndex) {
        let result = await this.getPages(bookIndex);
        console.log(result.data)
        this.imageUrls = {};
        for (let i = 0 ; i < result.data ; i ++){
          this.fetchImages(bookIndex,i)
        }
      }
    }
  }

  
  </script>
  <style>
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .page {
    padding: 5px;
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  </style>