<template>
  <div class="container">
    <h1 class="title">Main Page</h1>


    <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" is_random="true" />
    <RecipePreviewList v-if="$root.store.username"
      title="Last Viewed Recipes"
      is_random="false"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>

    <LoginForm v-if="!$root.store.username"></LoginForm>
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
