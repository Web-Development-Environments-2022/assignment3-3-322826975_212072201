<template>
  <div class="container">
    <h1 class="title">Search</h1>
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
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
          :state="validateState('search')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.search.required">
          search is required
        </b-form-invalid-feedback>
      </b-form-group>


      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="Number:"
        label-for="number"
      >
        <b-form-input
          id="number"
          type="number"
          v-model="$v.form.number.$model"
          :state="validateState('number')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.number.required">
          Password is required
        </b-form-invalid-feedback>
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
        <b-form-invalid-feedback>	
          Country is required	
        </b-form-invalid-feedback>	
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
        <b-form-invalid-feedback>	
          Country is required	
        </b-form-invalid-feedback>	
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
        <b-form-invalid-feedback>	
          Country is required	
        </b-form-invalid-feedback>	
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Search</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
    </b-alert>

    <SearchResults
      title="Results"
      :class="{
        blur: !$root.store.username,
        center: true
      }"
      :recipes="recipes"
    ></SearchResults>

  </div>
</template>

<script>
import cuisines from "../assets/cuisines.js";
import diets from "../assets/diets.js";
import intolerances from "../assets/intolerances.js";

import {
  required,
} from "vuelidate/lib/validators";
import SearchResults from "../components/SearchResults";

export default {
  name: "Search",
  components:{
    SearchResults
  },
  data() {
    return {
      form: {
        search: "",
        number: "",
        cuisine: null,
        diet: null,
        intolerance: "",
        submitError: undefined
      },
      cuisines:[{ value: null, text: "--None--", disabled: false }],
      diets:[{ value: null, text: "--None--", disabled: false }],
      intolerances:[{ value: null, text: "--None--", disabled: false }],
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
      cuisine:{
        required,
      },
      diet:{
        required,
      },
      intolerance:{
        required,
      },
      
    }
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
          this.$root.store.server_domain + `/users/`
          // "https://test-for-3-2.herokuapp.com/user/Register",
          // this.$root.store.server_domain + "/users/search_recipe",{
          //   params:
          //   {
          //   search_string: this.form.search,
          //   num: this.form.number,
          //   cuisine: this.form.cuisine,
          //   diet:this.form.diets,
          //   intolerance:this.form.intolerances,
          // },
          // withCredentials:true
          // }
        );
        
      let recipes=[obj,obj,obj]
      // const recipes = response.data.recipes_objects;
      
      this.recipes = [];
      this.recipes.push(...recipes);

      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      // console.log("register method called");
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
        number: "",
        cuisine: "",
        diet: "",
        intolerance: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
