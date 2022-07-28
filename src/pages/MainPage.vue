<template>
  <div class="container">
    
    
    <RecipePreviewList title="Random Recipes" class="RandomRecipes center" is_random="true"       
    :is_favorite="false"
    :is_my_created="false"
    :is_my_family="false"
 />
    <RecipePreviewList v-if="$root.store.username"
      title="Last Viewed Recipes"
      is_random="false"
      :is_favorite="false"
      :is_my_created="false"
      :is_my_family="false"
      :class="{
        LastRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>

      <LoginForm v-if="!$root.store.username" class="login"></LoginForm>
    
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div> -->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginForm from "../components/LoginForm.vue";
export default {
  components: {
    RecipePreviewList,
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
  position: absolute;
  display: inline-block;
}
.LastRecipes {
  margin: 10px 0px 10px;
  //padding-left: 50%;
  padding-left: 50%;
}
.login{
  max-width: 1000px;
  padding-left: 50%;
  
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
