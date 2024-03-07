<template>

    <div>

        <div>
            Welcome to the product list
        </div>

<!-- 
    <input type="text" id="searchTerm" placeholder="Enter search term" v-model="searchQuery">
    <button @click="performSearch">Search</button>

    <h2>Search Results</h2>
    <ul id="searchResults"></ul> -->


    
        <div v-for="lesson in lessonsDisplayed" :key="lesson.id" class="lesson">
            
            <figure>
                <img v-bind:src="lesson.image">
                <!-- <img v-bind:src="imagesBaseURL + product.image "
                class="smallimage"> -->
            </figure>
            <div>
                <p>Subject: {{lesson.title}}</p>
                <p>Location: {{lesson.location}}</p>
                <p>Price: {{lesson.price}}</p>
                <!-- <p>Spaces: {{itemsLeft(lesson)}}</p> -->
            </div>
                <button v-if="canAddToCart(lesson)" v-on:click="addItemToCart(lesson)">
                    <font-awesome-icon :icon="['fas', 'fa-shopping-cart']" />
                    Add to cart</button>
                <button v-else disabled>Add to cart</button>
            


        </div>
    </div>
</template>


<script>
export default{
    name: 'productList',
    props: ["lessonsDisplayed", "sortedLessons", "cart"],
    data() {
        return{
           
        }
    },
    methods:{

        canAddToCart: function (lesson) {
          return lesson.spaces > this.cartCount(lesson.id);
        },

        cartCount(id) {
          let count = 0;
          for (let i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === id) {
                  count++;
              }

          }
          return count;
      },
    }
}
</script>