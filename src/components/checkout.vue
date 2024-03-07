<template>
    <div>
    <div>Welcome to the checkout</div>

    <h2>Shopping Cart</h2>

            <p>Order Details:</p>
            <ul>
                <li v-for="lesson in cart" class="cart">
                    <figure>
                        <img v-bind:src="lesson.image">
                    </figure>
                    <div>
                        <p>Subject:{{lesson.title}}</p>
                        <p>Location: {{lesson.location}}</p>
                        <p>Price: <font-awesome-icon :icon="['fas', 'fa-pound-sign']" />{{lesson.price}}</p>
                        <p>Spaces: {{lesson.spaces}}</p>
                        <button v-on:click="removeLessons(lesson)">Remove</button>
                    </div>
                </li>
            </ul>
<!-- 
            <p>First name:
                <input v-model="order.firstname" />
            </p>
            <p>Phone:
                <input v-model="order.phone" />
            </p>

            <p>User information:</p>
            <p>First name: {{order.firstname}}</p>
            <p>Phone: {{order.phone}}</p>

            <button v-on:click="submitForm" :disabled="!isOrderValid">Place order</button>
         -->
</div>
</template>

<script>
export default{
    name: 'Cart',
    props: ["lessonsDisplayed", "sortedLessons", "cart", "imagesBaseURL", "order"],
    data() {
        return{
           
        }
    },
    methods:{
        removeLessons: function (lesson) {
            this.$emit("remove-lessons", lesson)
      },
      
    },
    computed: {
      itemsInTheCart: function () {
        return this.cart.length || "";
      },

     

    }
}
</script>