<template>
<div>
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

</div>
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
  components:{
    BIconClockFill,
BIconHandThumbsUpFill,
BIconHeartFill,
BIconEyeFill,
BIconPatchCheckFill
  },
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

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100px;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
