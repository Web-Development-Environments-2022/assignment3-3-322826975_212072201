<template>
  <div class="recipe-view-container">
    <b-form @submit.prevent="onCreate">
      <b-form-group
        id="input-group-title"
        label-cols-sm="3"
        label="Title:"
        label-for="title"
      >
        <b-form-input
          id="title"
          v-model="$v.form.title.$model"
          type="text"
          :state="validateState('title')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Title is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-image"
        label-cols-sm="3"
        label="URL to Image:"
        label-for="image"
      >
        <b-form-input
          id="image"
          v-model="$v.form.image.$model"
          type="text"
          :state="validateState('image')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Image URL invalid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-time_to_cook"
        label-cols-sm="3"
        label="Cooking time (minutes):"
        label-for="time_to_cook"
      >
        <b-form-input
          id="time_to_cook"
          v-model="$v.form.time_to_cook.$model"
          type="number"
          min="0"
          :state="validateState('time_to_cook')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Cooking time invalid
        </b-form-invalid-feedback>
      </b-form-group>

<!-- //        image: "",
        ingredients_list: "",
        vegan: "",
        vegetarian: "",
        gluten_free_sign: "", -->

      <b-form-group
        id="input-group-pieces_amount"
        label-cols-sm="3"
        label="Servings:"
        label-for="pieces_amount"
      >
        <b-form-input
          id="pieces_amount"
          v-model="$v.form.pieces_amount.$model"
          type="number"
          min="0"
          :state="validateState('pieces_amount')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Servings invalid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-popularity"
        label-cols-sm="3"
        label="Popularity:"
        label-for="popularity"
      >
        <b-form-input
          id="popularity"
          v-model="$v.form.popularity.$model"
          type="number"
          min="0"
          :state="validateState('popularity')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Popularity invalid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-instructions"
        label-cols-sm="3"
        label="Instructions:"
        label-for="instructions"
      >

        <b-form-textarea
          id="instructions"
          v-model="$v.form.instructions.$model"
          type="textarea"
          :state="validateState('instructions')"
                placeholder="Enter something..."
      rows="3"
      max-rows="6"

        ></b-form-textarea>
        <b-form-invalid-feedback>
          Instructions are required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-ingredients_list"
        label-cols-sm="3"
        label="Ingredients list:"
        label-for="ingredients_list"
      >

        <b-form-textarea
          id="ingredients_list"
          v-model="$v.form.ingredients_list.$model"
          type="textarea"
          :state="validateState('ingredients_list')"
                placeholder="Enter something..."
      rows="3"
      max-rows="6"

        ></b-form-textarea>
        <b-form-invalid-feedback>
          Ingredients are required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-vegetarian"
        label-cols-sm="3"
        label-for="vegetarian"
              v-slot="{ ariaDescribedby }"

      >
            <b-form-radio-group
          v-model="$v.form.vegetarian.$model"
        :options="vegetarian_options"
        :aria-describedby="ariaDescribedby"
button-variant="outline-primary"

        buttons
                  id="vegetarian"
          type="text"
          :state="validateState('vegetarian')"

      ></b-form-radio-group>
        <b-form-invalid-feedback>
          Vegetarian sign is required
        </b-form-invalid-feedback>

      </b-form-group>

      <b-form-group
        id="input-group-vegan"
        label-cols-sm="3"
        label-for="vegan"
              v-slot="{ ariaDescribedby }"

      >
            <b-form-radio-group
          v-model="$v.form.vegan.$model"
        :options="vegan_options"
        :aria-describedby="ariaDescribedby"
button-variant="outline-primary"

        buttons
                  id="vegan"
          type="text"
          :state="validateState('vegan')"

      ></b-form-radio-group>
        <b-form-invalid-feedback>
          Vegan sign is required
        </b-form-invalid-feedback>

      </b-form-group>

      <b-form-group
        id="input-group-gluten_free_sign"
        label-cols-sm="3"
        label-for="gluten_free_sign"
              v-slot="{ ariaDescribedby }"

      >
            <b-form-radio-group
          v-model="$v.form.gluten_free_sign.$model"
        :options="gluten_free_sign_options"
        :aria-describedby="ariaDescribedby"
button-variant="outline-primary"

        buttons
                  id="gluten_free_sign"
          type="text"
          :state="validateState('gluten_free_sign')"

      ></b-form-radio-group>
        <b-form-invalid-feedback>
          Gluten sign is required
        </b-form-invalid-feedback>

      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Create</b-button
      >
      
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Created failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required,minValue,url } from "vuelidate/lib/validators";
export default {
  name: "NewRecipeForm",
  data() {
    return {
      form: {
        username: "",
        image: "",
        ingredients_list: "",
        instructions: "",
        pieces_amount: "",
        popularity: "",
        time_to_cook: "",
        title: "",
        vegan: false,
        vegetarian: false,
        gluten_free_sign: false,
        submitError: undefined
      },
      vegan_options:[
          { text: "I'm vegan friendly", value: true },
          { text: "I'm not", value: false },
        ],
      vegetarian_options:[
                  { text: "Suitable for vegetarians", value: true },
          { text: "I'm not", value: false },
      ],
      gluten_free_sign_options:[
                  { text: "I'm gluten free", value: true },
          { text: "I'm not", value: false },

      ],
      modal:"",
    };
  },
  validations: {
    form: {
      image: {
        required,
        url
        
      },
      ingredients_list: {
        required
      },
      instructions: {
        required
      },
      pieces_amount: {
        required,
        minValue:0
      },
      popularity: {
        minValue:0
      },
      time_to_cook: {
        required,
        minValue:0
      },
      title: {
        required
      },
      vegan: {
        
      },
      vegetarian: {
        
      },
      gluten_free_sign: {
        
      },

    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Create() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain +"/users/create_recipe",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",
          {
          image: this.form.image,
          ingredients_list: this.form.ingredients_list,
          instructions: this.form.instructions,
          pieces_amount: this.form.pieces_amount,
          popularity: this.form.popularity,
          time_to_cook: this.form.time_to_cook,
          title: this.form.title,
          vegan: this.form.vegan,
          vegetarian: this.form.vegetarian,
          gluten_free_sign: this.form.gluten_free_sign
          },
          {withCredentials:true},
        );
        console.log(response);
        // this.$root.loggedIn = true;
        //console.log(this.$root.store.login);
        //this.$cookie.set("username", response.data.username, "expiring time")
        // console(this.$cookies.get("session"));
        // this.$root.store.login(this.form.username);
        
        // this.$router.push("/");
        this.$emit('exit');
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onCreate() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");
      this.Create();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
