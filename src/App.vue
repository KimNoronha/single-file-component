<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script> -->



<template>
  <div id="app">
    
    <!-- <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header> -->

    <header>
      <h2>{{sitename}}</h2>
      <button @click="showCart">
                {{itemsInTheCart}}
      <font-awesome-icon :icon="['fas', 'fa-shopping-cart']" />
      Cart
    </button>

    <button v-if="testConsole" @click="toggleShowTestConsole">
      <font-awesome-icon :icon="['fas', 'fa-text-height']" />
      Test Console
    </button>

    <div v-if="testConsole &&  showTestConsole" class="test-console">
      <button @click="deleteAllCaches" class="test-elem">
        <font-awesome-icon :icon="['fas', 'fa-trash']" />
        Delete All Caches
      </button>

      <button @click="unregisterAllServiceWorkers" class="test-elem">
        <font-awesome-icon :icon="['fab', 'fa-uniregistry']" />
          Unregister All ServiceWorkers
      </button>

      <button @click="reloadPage" class="test-elem">
        <font-awesome-icon :icon="['fas', 'fa-sync']" />
          Reload Page
      </button>

      <strong class="test-elem">HTTPS Test: </strong>
      <a v-bind:href="serverURL" target="_blank">link</a>

    </div>

    </header>

    
    

    <!-- <main>
      <TheWelcome />
    </main> -->

    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<script>

import productList from './components/productList.vue'
import checkout from './components/checkout.vue'

export default{
    name: 'app',
    data() {
        return{
          sitename: 'Individual Demonstration Booking System',
          serverURL: "http://localhost:5502/collections/products",
          cart: [],
          currentView: productList,
          testConsole: true,
          showTestConsole: true,
        }
    },
    components: {
      productList,
      checkout

    },
    methods:{
      showCart() {
        if(this.currentView === productList){this.currentView = checkout;}
        else{this.currentView = productList;}
      },
      toggleShowTestConsole() {
        this.showTestConsole = !this.showTestConsole; // This will toggle the value between true and false
      },
      toggleShowProduct(){
          this.showProduct = this.showProduct ? false : true;
      },
      
      addItemToCart: function (lesson) {
          this.cart.push(lesson);
          this.order.lessonDetails.push({
              lesson_id: lesson.lesson_id,
              id: lesson._id,
              spaces: lesson.spaces,

          });
          this.lessonPresentInCart = true;

          console.log("Lesson Details:", this.order.lessonDetails);


      },

      deleteAllCaches() {
          caches.keys().then(function (names) {
              for (let name of names)
                  caches.delete(name);
          });
          console.log("All Caches Deleted");
      },

      unregisterAllServiceWorkers() {
          navigator.serviceWorker.getRegistrations().then(function (registrations) {
              for (let registration of registrations) {
                  registration.unregister()
              }
          });
          console.log("ServiceWorkers Unregistered");
      },

      reloadPage() {
          window.location.reload();
      },

      performSearch: function () {
          // Get the search query from the data property
          const searchQueryValue = this.searchQuery;

          // Check if the search query is not empty
          if (searchQueryValue.trim() !== '') {
              // fetch(`https://coursework2-env.eba-yvmeadmq.eu-west-2.elasticbeanstalk.com/search?term=${searchQueryValue}`)
              fetch(`http://localhost:5502/search?term=${searchQueryValue}`)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error(`Response status: ${response.status}`);
                      }
                      return response.json();
                  })
                  .then(json => {
                      // Update the lessons data property with the search results
                      this.lessons = json.map(lesson => ({
                          ...lesson,
                          lesson_id: lesson.id,
                          id: lesson._id,
                      }));
                  })
                  .catch(error => {
                      // Handle errors here
                      console.error("Error fetching lessons: ", error);
                      if (error.response) {
                          console.error("Response status:", error.response.status);
                          console.error("Response status text:", error.response.statusText);
                      }
                  });
          } else {
              // Handle the case when the search query is empty
              console.log("Search query is empty. Please enter a search term.");
              // Optionally, you can clear the search results (this.lessons) or display a message to the user.
          }
      },


      submitForm: function () {
          const nameRegex = /^[A-Za-z]+$/;
          const phoneRegex = /^\d+$/;

          if (nameRegex.test(this.order.firstname) && phoneRegex.test(this.order.phone)) {


              fetch('http://localhost:5502/collections/orders', {
                  // fetch('https://coursework2-env.eba-yvmeadmq.eu-west-2.elasticbeanstalk.com/collections/orders', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },

                  body: JSON.stringify({
                      ...this.order,
                      lessonDetails: this.order.lessonDetails.map(detail => ({
                          ...detail,

                          spaces: detail.spaces,
                      })),
                  }),
              })
                  .then(response => response.json())
                  .then(json => {
                      console.log("Order submitted: ", json);
                  })
                  .catch(error => console.error("Error submitting order: ", error));

          }

          this.order.lessonDetails.forEach(detail => {
              const lessonId = detail.id;
              const newSpaces = detail.spaces;

              fetch(`https://coursework2-env.eba-yvmeadmq.eu-west-2.elasticbeanstalk.com/collections/products/${lessonId}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ spaces: newSpaces }),
              })
                  .then(response => response.json())
                  .then(json => {
                      console.log(`Spaces updated for lesson with id ${lessonId}: `, json);
                  })
                  .catch(error => console.error(`Error updating spaces for lesson with id ${lessonId}: `, error));
          });

      },



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
      itemsLeft(lesson) {
          return lesson.spaces - this.cartCount(lesson.id);
      },
      removeLessons: function (lesson) {
          const index = this.cart.indexOf(lesson);
          if (index !== -1) {

              lesson.spaces++;
              this.cart.splice(index, 1);
          }

      },
      saveProductToDB() {
          const newProduct = {
              "id": 14,
              "image": "images/maths.png",
              "title": "Engineering",
              "location": "Scotland",
              "price": 36,
              "spaces": 5


          }

          fetch("https://coursework2-env.eba-yvmeadmq.eu-west-2.elasticbeanstalk.com/collections/products", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",

              },
              body: JSON.stringify(newProduct)
          }).then(
              function (response) {
                  response.json().then(
                      function (json) {
                          alert("Success: " + json.acknowledged);
                          console.log("Success: " + json.acknowledged);

                          webstore.lessons.push(newProduct);
                      }
                  )
              }
          )
      }

    },
    computed: {
      itemsInTheCart: function () {
        return this.cart.length || "";
      },
    }
  };

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
