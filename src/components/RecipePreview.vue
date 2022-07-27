<template>
<div>
  <router-link 
    :to="{ name: this.link, params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
  <b-card
    no-body
    style="max-width: 25rem; margin-bottom: 10px; margin-right: 0px;"
    :img-src="recipe.image"
    img-alt="Image"
    img-top
  >
    <template #header>
      <h4 class="mb-0">
        <div :title="recipe.title">
          {{ recipe.title }}
        </div></h4>
    </template>

    <b-list-group>
      <b-list-group-item class="list">Time to make: {{ recipe.time_to_cook }} minutes <b-icon-clock-fill></b-icon-clock-fill></b-list-group-item>
    </b-list-group>
    <b-list-group>
      <b-list-group-item class="list">Popularity: {{ recipe.popularity }}<b-icon-hand-thumbs-up-fill></b-icon-hand-thumbs-up-fill></b-list-group-item>
    </b-list-group>
    <b-list-group v-if="recipe.vegan">
      <b-list-group-item v-if="recipe.vegan" class="list"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegan</b-list-group-item>
    </b-list-group>
    <b-list-group v-if="recipe.vegetarian">
      <b-list-group-item v-if="recipe.vegetarian" class="list"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegetarian</b-list-group-item>
    </b-list-group>
    <b-list-group v-if="recipe.gluten_free_sign">
      <b-list-group-item v-if="recipe.gluten_free_sign" class="list"><b-icon-patch-check-fill></b-icon-patch-check-fill> Gluten-Free</b-list-group-item>
    </b-list-group>
    <b-list-group v-if="recipe.isWatched">
      <b-list-group-item v-if="recipe.isWatched" class="list"><b-icon-eye-fill></b-icon-eye-fill></b-list-group-item>
    </b-list-group>
    <b-list-group v-if="recipe.isPrefered">
      <b-list-group-item v-if="recipe.isPrefered" class="list"><b-icon-heart-fill></b-icon-heart-fill></b-list-group-item>
    </b-list-group>

    <b-card-body v-if="recipe.isPrefered==false && $root.store.username" >
      <b-button v-if="recipe.isPrefered==false && $root.store.username" @click="MarkAsFavorite" style="margin-left: 30%;" variant="outline-info" >Mark as favorite</b-button>
    </b-card-body>

  </b-card>
  </router-link>
</div>
<!-- <div>
  <router-link 
    :to="{ name: this.link, params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.time_to_cook }} minutes <b-icon-clock-fill></b-icon-clock-fill></li>
        <li>{{ recipe.popularity }} <b-icon-hand-thumbs-up-fill></b-icon-hand-thumbs-up-fill></li>
        <li v-if="recipe.vegan"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegan</li>
        <li v-if="recipe.vegetarian"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegetarian</li>
        <li v-if="recipe.gluten_free_sign"><b-icon-patch-check-fill></b-icon-patch-check-fill> Gluten-Free</li>
        <li v-if="recipe.isWatched"> <b-icon-eye-fill></b-icon-eye-fill></li>
        <li v-if="recipe.isPrefered"><b-icon-heart-fill></b-icon-heart-fill></li>
        
      </ul>
    </div>
  </router-link>
        <b-button v-if="recipe.isPrefered==false && $root.store.username" @click="MarkAsFavorite" variant="outline-info">Mark as favorite</b-button>
</div> -->
</template>

<script>
import { BIconPatchCheckFill, BIconHeartFill,BIconEyeFill, BIconHandThumbsUpFill, BIconClockFill } from 'bootstrap-vue'
export default {
  mounted() {
    
  },
  created(){
    if (this.is_my_created=='true'){
      this.link='myrecipe'
    }
  },
  data() {
    return {
      link:'recipe'
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    is_my_created:{
      type:String,
      default:()=>'false'
    }
  },
  components: { BIconPatchCheckFill, BIconHeartFill,BIconEyeFill, BIconHandThumbsUpFill, BIconClockFill } ,
  
  methods:{
    async MarkAsFavorite(){
      try{
const response = await this.axios.put(
          this.$root.store.server_domain +"/users/mark-as-prefered/"+this.recipe.id,
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",
          {withCredentials:true},
        );
      }
      catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
          
    }
  }   
};
// id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  
</script>

<style>
.b-list-group-item {
  color: red;
}
.recipe-preview{
  color: black
}
.list {
  padding-left: 20px;
  font-size: 18px;
}
</style>
