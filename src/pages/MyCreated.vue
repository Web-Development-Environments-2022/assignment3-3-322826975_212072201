<template>
  <div class="container">

    <RecipePreviewList v-if="$root.store.username"
      title="My Recipes"
      :is_random="false"
      :is_my_created="true"
      :is_favorite = "false"
      :class="{
        row: true,
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
    
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
  position: absolute;
  display: inline-block;
}
.row{
  justify-items:flex-end;
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
