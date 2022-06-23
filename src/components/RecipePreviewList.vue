<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      let obj={
          id: 660227,
          image: "https://spoonacular.com/recipeImages/660227-556x370.jpg",
          ingredients_list: (5) [{id: 9040, aisle: 'Produce', image: 'bananas.jpg', consistency: 'SOLID', name: 'banana'}, 
          {id: 9040, aisle: 'Produce', image: 'bananas.jpg', consistency: 'SOLID', name: 'banana'},
          {id: 9040, aisle: 'Produce', image: 'bananas.jpg', consistency: 'SOLID', name: 'banana'},
          {id: 9040, aisle: 'Produce', image: 'bananas.jpg', consistency: 'SOLID', name: 'banana'},
          {id: 9040, aisle: 'Produce', image: 'bananas.jpg', consistency: 'SOLID', name: 'banana'}
          ],
          instructions: "Place all ingredients in a blender and blend until smooth.",
          isPrefered: false,
          isWatched: false,
          pieces_amount: 1,
          popularity: 7,
          time_to_cook: 45,
          title: "Skinny Green Monster Smoothie",
          vegan: false,
          vegetarian: false,
          gluten_free_sign: true
        }
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes",
          // this.$root.store.server_domain + "/recipes/get_3_random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        console.log(response);
        const recipes=[obj,obj,obj]
        // const recipes = response.data.recipes_objects;
        
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
