<template>
<div>
  
  <b-card
    no-body
    style="max-width: 25rem; margin-bottom: 10px; margin-right: 0px;"
    :img-src="recipe.image"
    img-alt="Image"
    img-top
  >
  <br>

<div>
  <router-link 
    :to="{ name: this.link, params: {recipeId: recipe.id}, query:{is_my_created:this.is_my_created,is_my_family:this.is_my_family } }"
    class="recipe-preview"
  >
        <b-list-group>
      <b-list-group-item class="list">
              <h4 class="mb-0">
        <div :title="recipe.title">
          {{ recipe.title }}
        </div></h4>

        </b-list-group-item>
    </b-list-group>

    <br>
      <b-list-group>
      <b-list-group-item class="list"><b-icon-clock-fill></b-icon-clock-fill> Time to make: {{ recipe.time_to_cook }} minutes </b-list-group-item>
    </b-list-group>
    <b-list-group>
      <b-list-group-item class="list"><b-icon-facebook></b-icon-facebook> Popularity: {{ recipe.popularity }} Likes</b-list-group-item>
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
    <br>
    <b-list-group v-if="recipe.isWatched">
      <b-list-group-item v-if="recipe.isWatched" class="list"><b-icon-eye-fill></b-icon-eye-fill> Watched</b-list-group-item>
    </b-list-group>
    <b-list-group v-if="recipe.isPrefered || !isPressed">
      <b-list-group-item v-if="recipe.isPrefered || !isPressed" class="list"><b-icon-heart-fill></b-icon-heart-fill> Favorite!</b-list-group-item>
    </b-list-group>
  
  </router-link>
      <b-card-body v-if="isPressed && recipe.isPrefered==false && $root.store.username && is_my_created==false && is_my_family==false" >
      <b-button v-if="isPressed && recipe.isPrefered==false && $root.store.username" @click="MarkAsFavorite" style="margin-left: 30%;font-family: Garamond, serif;" variant="outline-dark" >Mark as favorite <b-icon-heart-fill></b-icon-heart-fill> </b-button>
    </b-card-body>
<br>
</div>
</b-card>
</div>
</template>

<script>
import { BIconPatchCheckFill, BIconFacebook, BIconHeartFill,BIconEyeFill, BIconClockFill } from 'bootstrap-vue'
export default {
  mounted() {
    
  },
  created(){
    // console.log("insideCreated");
    // console.log(this.is_my_created)
    // if (this.is_my_created==true){
    //   this.link='myrecipe'
    // }
  },
  data() {
    return {
      link:'recipe',
      isPressed:"a"
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
    },
    is_my_family:{
      type:String,
      default:()=>'false'
    }
  },
  components: { BIconPatchCheckFill, BIconHeartFill,BIconEyeFill, BIconFacebook, BIconClockFill } ,
  
  methods:{
    async MarkAsFavorite(){
      try{
const response = await this.axios.put(
          this.$root.store.server_domain +"/users/mark-as-prefered/"+this.recipe.id,
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",
          {withCredentials:true},
        );
        this.isPressed="";
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
b-list-group-item {
  
  font-family: Garamond, serif;
}
.recipe-preview{
  color: black
}
.list {
  padding-left: 20px;
  font-size: 18px;
}

.mb-0{
  font-family: Garamond, serif;
  color:black;
}
</style>
