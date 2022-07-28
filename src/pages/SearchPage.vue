<template>
  <div class="container">
    <div ><h3 class="title">Search</h3></div>
    
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset" class="search">
      <b-form-group
        id="input-group-search"
        label-cols-sm="3"
        label="Search text:"
        label-for="search"
      >
        <b-form-input
          id="search"
          v-model="$v.form.search.$model"
          type="text"
          class="mb-2 mr-sm-2 mb-sm-0 space"
          :state="validateState('search')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.search.required">
          search is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="Number: "
        label-for="number"

      >
        <b-form-select
          id="number"
          class="mb-2 mr-sm-2 mb-sm-0 space"
          :options="[
            { text: '5', value: 5 },
            { text: '10', value: 10 },
            { text: '15', value: 15 },
          ]"
          v-model="$v.form.number.$model"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-cuisine"
        label-cols-sm="3"
        label="Cuisine:"
        label-for="cuisine"
      >
        <b-form-select
          id="cuisine"
          :options="cuisines"
          v-model="$v.form.cuisine.$model"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-diet"
        label-cols-sm="3"
        label="Diet:"
        label-for="diet"
      >
        <b-form-select
          id="diet"
          :options="diets"
          v-model="$v.form.diet.$model"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-intolerance"
        label-cols-sm="3"
        label="Intolerances:"
        label-for="intolerance"
      >
        <b-form-select
          id="intolerance"
          :options="intolerances"
          v-model="$v.form.intolerance.$model"
        ></b-form-select>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:inline;"
        class="mx-auto"

        >Search</b-button
      >&nbsp;
      <b-button type="reset" variant="outline-danger" style="width:75px;display:inline;" class="mx-auto">Reset</b-button>
    </b-form>

    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >{{form.submitError}}
    </b-alert>
    <br><br>
    <table>
      <tr>
        <th>
          <h3 v-if="recipes.length > 0">Results</h3>
          <b-container>
          <b-dropdown v-if="recipes.length > 0" id="dropdown-dropright" dropright text="Sort" variant="outline-dark" class="m-2">
          <b-dropdown-item @click="sort('timeAsc')">Cooking time asc</b-dropdown-item>
          <b-dropdown-item @click="sort('timeDes')">Cooking time desc</b-dropdown-item>
          <b-dropdown-item @click="sort('popularityAsc')">Popularity asc</b-dropdown-item>
          <b-dropdown-item @click="sort('popularityDes')">Popularity desc</b-dropdown-item>
          </b-dropdown>
          <br><br>
            <!-- <b-button @click="sort('time')" type="reset" variant="outline-info"
              >Order by time to cook</b-button
            >
            <b-button @click="sort('popularity')" type="reset" variant="outline-info"
              >Order by popularity</b-button
            > -->

            <b-row v-for="r in recipes" :key="r.id">
              <RecipePreview class="recipePreview" :recipe="r" />
            </b-row>
          </b-container>
        </th>
        <th>
        <h2 v-if="recipes.length == 0 && $root.store.username && $root.store.lastSearchResults && !form.submitError" style="text-align: center;">
        <br>
          <div v-show="$root.store.lastSearchResults">Here is your last search:
            <r v-for="r in $root.store.lastSearchResults" :key="r.id">
              <RecipePreview class="recipePreview" :recipe="r" />
            </r>
          </div>
        </h2>
        </th>
      </tr>
    </table>

  </div>
</template>

<script>
import cuisines from "../assets/cuisines.js";
import diets from "../assets/diets.js";
import intolerances from "../assets/intolerances.js";
import { required } from "vuelidate/lib/validators";
import RecipePreview from "../components/RecipePreview";
export default {
  name: "Search",
  components: {
    RecipePreview
},
  data() {
    return {
      recipes: [],
      form: {
        search: "",
        number: "5",
        cuisine: null,
        diet: null,
        intolerance: null,
        submitError: undefined,
      },
      cuisines: [{ value: null, text: "--None--", disabled: false }],
      diets: [{ value: null, text: "--None--", disabled: false }],
      intolerances: [{ value: null, text: "--None--", disabled: false }],
      errors: [],
    };
  },
  validations: {
    form: {
      search: {
        required,
      },
      number: {
        required,
      },
      cuisine: {},
      diet: {},
      intolerance: {},
    },
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      // console.log("search clicked")
      let recipes = [
        {
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
          isWatched: false,
          pieces_amount: 1,
          popularity: 55,
          time_to_cook: 2,
          title: "Skinny Green Monster Smoothie",
          vegan: false,
          vegetarian: false,
          gluten_free_sign: true,
        },
        {
          id: 660227,
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
          isWatched: false,
          pieces_amount: 1,
          popularity: 7,
          time_to_cook: 18,
          title: "Skinny Green Monster Smoothie",
          vegan: false,
          vegetarian: false,
          gluten_free_sign: true,
        },
        {
          id: 660227,
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
          isWatched: false,
          pieces_amount: 1,
          popularity: 10,
          time_to_cook: 12,
          title: "Skinny Green Monster Smoothie",
          vegan: false,
          vegetarian: false,
          gluten_free_sign: true,
        },
      ];
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + `/users/`
          // "https://test-for-3-2.herokuapp.com/user/Register",
          // this.$root.store.server_domain + "/users/search_recipe",{
          //   params:
          //   {
          //   search_string: this.form.search,
          //   num: this.form.number,
          //   cuisine: this.form.cuisine,
          //   diet:this.form.diet,
          //   intolerance:this.form.intolerance,
          // },
          // withCredentials:true
          // }
        );
        // let recipes = [obj, obj, obj];
        // const recipes = response.data.recipes_objects;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
        if (recipes.length== 0){
          this.form.submitError = "No results found!";
        }

        if (this.$root.store.username) {
          this.$root.store.search(
            this.form.search,
            this.form.number,
            this.form.cuisine,
            this.form.diet,
            this.form.intolerance,
            this.recipes
          );
        }
        // [
        // {id:search_string,value:this.form.search},
        // {id:num,value:this.form.number},
        // {id:cuisine,value:this.form.cuisine},
        // {id:diet,value:this.form.diets},
        // {id:intolerance,value:this.form.intolerances}
        // ]);
        // console.log("search finished");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      //console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Search();
    },
    onReset() {
      this.form = {
        search: "",
        number: "5",
        cuisine: "",
        diet: "",
        intolerance: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sort(option) {
      switch (option) {
        case "popularityAsc":
          this.recipes.sort(function(a, b) {
            return parseFloat(a.popularity) - parseFloat(b.popularity);
          });
          break;
        case "popularityDes":
          this.recipes.sort(function(a, b) {
            return parseFloat(b.popularity) - parseFloat(a.popularity);
          });
          break;
        case "timeAsc":
          this.recipes.sort(function(a, b) {
            return parseFloat(a.time_to_cook) - parseFloat(b.time_to_cook);
          });
          break;
        case "timeDes":
          this.recipes.sort(function(a, b) {
            return parseFloat(b.time_to_cook) - parseFloat(a.time_to_cook);
          });
          break;
        default:
          console.log("default");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search{
  border-width: 2px;
  border-style: solid;
  border-color: red;
  padding: 20px;
  margin-top: 20px;
  border-radius: 25px;
  border: 2px solid #283a0c;
  // font-family: Garamond, serif;
  // font-size: 25px;
}


.title{
  margin-top: 0px;
  text-align: center;
  // font-family: Garamond, serif
  
}
</style>
