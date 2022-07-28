<template>
<div class="container">
<LoginForm></LoginForm>

</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import LoginForm from "../components/LoginForm.vue";
export default {
    name: "LoginPage",
    components: { LoginForm }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
