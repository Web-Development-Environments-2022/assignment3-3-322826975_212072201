<template>
  <b-container>
    <h3 style="font-family:Garamond, serif; margin-left:20px">
      {{ title }}:
      <slot></slot>
    </h3>
    <b-col v-for="r in recipes" :key="r.id">
      <RecipePreview
        :is_my_created="is_my_created"
        :is_my_family="is_my_family"
        class="recipePreview"
        :recipe="r"
      />
      <br />
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    is_random: {
      type: String,
      required: true,
    },
    is_favorite: {
      type: String,
      default: () => "false",
    },
    is_my_created: {
      type: String,
      default: () => "false",
    },
    is_my_family: {
      type: String,
      default: () => "false",
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      let obj = {
        id: 340,
        image: "https://spoonacular.com/recipeImages/660227-556x370.jpg",
        ingredients_list: (5)[
          ({
            id: 9040,
            aisle: "Produce",
            image: "bananas.jpg",
            consistency: "SOLID",
            name: "banana",
          },
          {
            id: 9040,
            aisle: "Produce",
            image: "bananas.jpg",
            consistency: "SOLID",
            name: "banana",
          },
          {
            id: 9040,
            aisle: "Produce",
            image: "bananas.jpg",
            consistency: "SOLID",
            name: "banana",
          },
          {
            id: 9040,
            aisle: "Produce",
            image: "bananas.jpg",
            consistency: "SOLID",
            name: "banana",
          },
          {
            id: 9040,
            aisle: "Produce",
            image: "bananas.jpg",
            consistency: "SOLID",
            name: "banana",
          })
        ],
        instructions:
          "Place all ingredients in a blender and blend until smooth.",
        isPrefered: false,
        isWatched: true,
        pieces_amount: 1,
        popularity: 7,
        time_to_cook: 45,
        title: "Skinny Green Monster Smoothie",
        vegan: true,
        vegetarian: false,
        gluten_free_sign: true,
      };

      try {
        let address = this.$root.store.server_domain;
        console.log(this.$props.is_random);
        if (this.$props.is_random == "true") {
          // address+="/recipes/get_3_random"
          // address+="/"
        } else {
          if (this.$props.is_favorite == "true") {
            // address+="/users/favorites"
          } else {
            if (this.$props.is_my_created == "true") {
              // address+="/users/get_my_created"
            } else {
              if (this.$props.is_my_family == "true") {
                // address+="/users/get_family"
              } else {
                // address+="/users/get_3_last"
              }
            }
          }
        }
        address += "/users";
        const response = await this.axios.get(
          address,
          // this.$root.store.server_domain + "/users/get_3_last",
          // "https://test-for-3-2.herokuapp.com/recipes/random",
          { withCredentials: true }
        );
        console.log(response);
        let recipes = [obj, obj, obj];
        // let recipes;
        // if (this.$props.is_my_created=="true"){
        //   recipes= response.data.recipes;
        // }
        // else
        // let recipes = response.data.recipes_objects;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
