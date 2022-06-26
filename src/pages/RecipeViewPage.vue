<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <div>
          <b-card-group deck>
            <b-card 
              border-variant="secondary"
              :header="recipe.title"
              header-border-variant="secondary"
              align="center"
            >
              <b-card-img
                :src="recipe.image"
                img-alt="Card image"                
                img-left
                class="center"
              ></b-card-img>
            </b-card>
          </b-card-group>
        </div>

      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
                      <li>{{ recipe.time_to_cook }} minutes <b-icon-clock-fill></b-icon-clock-fill></li>
        <li>{{ recipe.popularity }} <b-icon-hand-thumbs-up-fill></b-icon-hand-thumbs-up-fill></li>
        <li v-if="recipe.vegan"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegan</li>
        <li v-if="recipe.vegetarian"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegetarian</li>
        <li v-if="recipe.gluten_free_sign"><b-icon-patch-check-fill></b-icon-patch-check-fill> Gluten-Free</li>
        <li v-if="recipe.isWatched"> <b-icon-eye-fill></b-icon-eye-fill></li>
        <li v-if="recipe.isPrefered"><b-icon-heart-fill></b-icon-heart-fill></li>

            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients_list"
                :key="index + '_' + r.id"
              >
              
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
import { BIconPatchCheckFill, BIconHeartFill,BIconEyeFill, BIconHandThumbsUpFill, BIconClockFill } from 'bootstrap-vue'

export default {
  mounted() {
    try {
      this.axios.put(
        this.$root.store.server_domain + `/users/mark-as-watched/${recipe.id}`,
        { withCredentials: true }
        // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId,
        // {
        //   params: { recipeID: this.$route.params.recipeId }
        // }
      );
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
  },
  components:{
        BIconClockFill,
BIconHandThumbsUpFill,
BIconHeartFill,
BIconEyeFill,
BIconPatchCheckFill

  },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      let obj = {
        id: 660227,
        image: "https://spoonacular.com/recipeImages/660227-556x370.jpg",
        ingredients_list: (5)[
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
          },
          {
            id: 9040,
            aisle: "Produce",
            image: "bananas.jpg",
            consistency: "SOLID",
            name: "banana",
          }
        ],
        instructions:
          "Place all ingredients in a blender and blend until smooth.",
        isPrefered: false,
        isWatched: false,
        pieces_amount: 1,
        popularity: 7,
        time_to_cook: 45,
        title: "Skinny Green Monster Smoothie",
        vegan: false,
        vegetarian: false,
        gluten_free_sign: true,
      };
      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/recipes"
          // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId,
          // {
          //   params: { recipeID: this.$route.params.recipeId }
          // }
        );

        //console.log(response)
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        // analyzedInstructions,
        instructions,
        // extendedIngredients,
        time_to_cook,
        image,
        title,
        id,
        popularity,
        vegan,
        vegetarian,
        gluten_free_sign,
        ingredients_list,
        pieces_amount,
        isPrefered,
        isWatched,
        // } = response.data.recipes_objects[0];
      } = obj;
      {
      }

      // let _instructions = analyzedInstructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        // instructions,
        // // _instructions,
        // analyzedInstructions,
        // extendedIngredients,
        // aggregateLikes,
        // readyInMinutes,
        // image,
        // title,
        instructions,
        // extendedIngredients,
        time_to_cook,
        image,
        title,
        id,
        popularity,
        vegan,
        vegetarian,
        gluten_free_sign,
        ingredients_list,
        pieces_amount,
        isPrefered,
        isWatched,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
