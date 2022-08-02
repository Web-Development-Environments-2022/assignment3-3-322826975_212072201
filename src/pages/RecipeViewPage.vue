<template>
  <div class="pageView">
    <br><br><br>
    <div v-if="recipe" class="recipeContainer">
      <b-card-group columns>
        <b-card :title="recipe.title" :img-src="recipe.image" img-alt="Image" img-top>
          <b-card-text>
            <b-icon-clock-fill></b-icon-clock-fill> {{ recipe.time_to_cook }} minutes
          </b-card-text>
        </b-card>

        <b-card title="Information" text-variant="white" bg-variant="dark"><br>
          <b-card-text>

            <p>
              <b-icon-hand-thumbs-up-fill></b-icon-hand-thumbs-up-fill> {{ recipe.popularity }} Likes!
            </p>
            <p v-if="recipe.vegan == 'true' || recipe.vegan == true">
              <b-icon-patch-check-fill></b-icon-patch-check-fill> Vegan
            </p>
            <p v-if="recipe.vegetarian == 'true' || recipe.vegetarian == true">
              <b-icon-patch-check-fill></b-icon-patch-check-fill> Vegetarian
            </p>
            <p v-if="recipe.gluten_free_sign == 'true' || recipe.gluten_free_sign == true">
              <b-icon-patch-check-fill></b-icon-patch-check-fill> Gluten-Free
            </p>
            <p v-if="recipe.isWatched == 'true' || recipe.isWatched == true">
              <b-icon-eye-fill></b-icon-eye-fill>
            </p>
            <p v-if="recipe.isPrefered == 'true' || recipe.isPrefered == true">
              <b-icon-heart-fill></b-icon-heart-fill>
            </p>

          </b-card-text>
        </b-card>

        <b-card title="You'll need">
          <b-card-text>
            <ul>
              <li v-for="(r, index) in recipe.ingredients_list" :key="index + '_' + r.id">

                {{ r.original }} , {{ r.amount }}
              </li>
            </ul>
          </b-card-text>
          <b-card-text class="danger-text">For {{ recipe.pieces_amount }} servings</b-card-text>
        </b-card>

        <b-card
          v-if="(recipe.isPrefered == false || recipe.isPrefered == 'false') && $root.store.username && this.$route.query.is_my_created == 'false' && this.$route.query.is_my_family == 'false'">
          <b-button @click="MarkAsFavorite" variant="outline-dark">Mark as favorite</b-button>

        </b-card>

        <b-card>
          <b-card-title>Instructions</b-card-title>
          <b-card-text>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </b-card-text>
        </b-card>
        <b-card title="Our Family Recipe" v-show="this.$route.query.is_my_family == 'true'" text-variant="white"
          bg-variant="dark"><br>
          <b-card-text>

            <p>
              <b-icon-person></b-icon-person> {{ recipe.maker }}
            </p>
            <p>
              <b-icon-calendar2-day></b-icon-calendar2-day> {{ recipe.when_making }}
            </p>

          </b-card-text>
        </b-card>
        <b-card v-show="this.$route.query.is_my_family == 'true'" :img-src="recipe.family_img" img-alt="Image">
        </b-card>

      </b-card-group>
    </div>
  </div>
</template>

<script>
import { BIconPerson, BIconCalendar2Day } from 'bootstrap-vue'

export default {
  mounted() {
    try {
      console.log(this.$root.store.server_domain + `/users/mark-as-watched/${this.$route.params.recipeId}`);
      if ((this.$route.query.is_my_family == 'false' || this.$route.query.is_my_family == false) && (this.$route.query.is_my_created == 'false' || this.$route.query.is_my_created == false) && this.$root.store.username) {
        this.axios.put(
          this.$root.store.server_domain + `/users/mark-as-watched/${this.$route.params.recipeId}`,
          { withCredentials: true }

        );
      }
    } catch (error) {
      console.log("error.response.status", error);
      this.$router.replace("/NotFound");
      return;
    }
  },
  components: {
    BIconPerson,
    BIconCalendar2Day

  },
  props: {

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
      let urladdr = this.$root.store.server_domain;
      if (this.$route.query.is_my_family == 'true' || this.$route.query.is_my_family == true)
        urladdr += `/users/get_family_recipe/${this.$route.params.recipeId}`;
      else {
        if (this.$route.query.is_my_created == 'true' || this.$route.query.is_my_created == true)
          urladdr += `/users/get_created_recipe/${this.$route.params.recipeId}`;
        else {
          urladdr += `/recipes/full_recipe/${this.$route.params.recipeId}`;

        }
      }
      try {

        response = await this.axios.get(
          urladdr,
          { withCredentials: true }
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId
          // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId,
          // {
          //   params: { recipeID: this.$route.params.recipeId }
          // }
        );

        console.log(response);
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      if (this.$route.query.is_my_family == 'true' || this.$route.query.is_my_family == true) {
        let {
          instructions,
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
          maker,
          when_making,
          family_img
        } = response.data.recipes_objects[0];
        let _instructions = "";

        _instructions = JSON.parse(instructions).map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
          .reduce((a, b) => [...a, ...b], []);
        let _recipe = {
          _instructions,
          instructions,
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
          maker,
          when_making,
          family_img

        };

        this.recipe = _recipe;
        this.recipe.ingredients_list = JSON.parse(ingredients_list)

      }
      else {
        let {
          analyzedInstructions,
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
        } = response.data.recipes_objects[0];
        // } = obj;

        try {
          let _instructions = analyzedInstructions
            .map((fstep) => {
              fstep.steps[0].step = fstep.name + fstep.steps[0].step;
              return fstep.steps;
            })
            .reduce((a, b) => [...a, ...b], []);
          let _recipe = {
            // instructions,
            _instructions,
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

        }
        catch (e) {
          let _instructions = "";
          try {
            _instructions = JSON.parse(instructions).map((fstep) => {
              fstep.steps[0].step = fstep.name + fstep.steps[0].step;
              return fstep.steps;
            })
              .reduce((a, b) => [...a, ...b], []);

          }
          catch (err) {
            _instructions = instructions.map((fstep) => {
              fstep.steps[0].step = fstep.name + fstep.steps[0].step;
              return fstep.steps;
            })
              .reduce((a, b) => [...a, ...b], []);
          }
          let _recipe = {
            _instructions,
            instructions,
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
          this.recipe.ingredients_list = JSON.parse(ingredients_list)

        }

      }

    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async MarkAsFavorite() {
      try {
        const response = await this.axios.put(
          this.$root.store.server_domain + "/users/mark-as-prefered/" + this.recipe.id,
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",
          { withCredentials: true },
        );
        this.recipe.isPrefered = true;
      }
      catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }

    }

  }
};
</script>

<style scoped>
/* .recipePageContainer{
    position: absolute;
  width:80%;
  left:10%;
  right:10%;
} */
/* .wrapper {
  display: flex;
    width:100%;
  padding: 0 10% 0  10%;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
} */

.pageView {
  width: 100%;
}

.recipeContainer {
  width: 90%;
  margin-left: 5%
}

/* .recipe-header{

} */
</style>
