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
                <b-dropdown-item href="#">Favorites</b-dropdown-item>
                <b-dropdown-item href="#">My recipes</b-dropdown-item>
                <b-dropdown-item href="#">Family recipes</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item href="#"><button @click="Logout">Logout</button></b-nav-item>
              <b-nav-item href="#">New Recipe</b-nav-item>
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
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
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
