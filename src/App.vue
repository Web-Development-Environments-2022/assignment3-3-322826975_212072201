<template>
  <div id="app">
    <div>
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">Perricipes</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#"
                ><router-link :to="{ name: 'main' }"
                  >Main</router-link
                ></b-nav-item
              >
              <b-nav-item href="#"
                ><router-link :to="{ name: 'search' }"
                  >Search</router-link
                ></b-nav-item
              >
              <b-nav-item href="#"
                ><router-link :to="{ name: 'about' }"
                  >About</router-link
                ></b-nav-item
              >
            </b-navbar-nav>

<b-navbar-nav class="ml-auto" v-if="!$root.store.username">
              <b-nav-text>Hello guest</b-nav-text>

              <b-nav-item href="#"
                ><router-link :to="{ name: 'register' }"
                  >Register</router-link
                ></b-nav-item
              >
              <b-nav-item href="#"
                ><router-link :to="{ name: 'login' }"
                  >Login</router-link
                ></b-nav-item
              >
</b-navbar-nav>
<b-navbar-nav class="ml-auto" v-if="$root.store.username">
                          <b-nav-text>Hello, {{ $root.store.username }}</b-nav-text>            

            <!-- Right aligned nav items -->

            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown text="Personal Area" right>
                <b-dropdown-item href="#"><router-link :to="{ name: 'favorites' }"
                  >Favorites</router-link
                ></b-dropdown-item>
                <b-dropdown-item href="#"><router-link :to="{ name: 'mycreated' }"
                  >My recipes</router-link
                ></b-dropdown-item>
                <b-dropdown-item href="#">Family recipes</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item href="#"><button @click="Logout">Logout</button></b-nav-item>
              <div>
              <b-nav-item href="#"><b-button v-b-modal.modal-1>New Recipe</b-button>
              
  <b-modal id="modal-1" ok-only ok-title="Cancel" ok-variant="dark"  title="Hey Chef, enter your recipe ">
    <new-recipe-form @exit="closeModal"></new-recipe-form>
    
  </b-modal>
  </b-nav-item>
</div>
            </b-navbar-nav>
</b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import NewRecipeForm from './components/NewRecipeForm.vue';

export default {
  components: { NewRecipeForm},
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    closeModal(){
      // console.log("iam closing it");
      this.$bvModal.hide('modal-1');
    }
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}




</style>
