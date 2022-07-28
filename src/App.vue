<template>
  <div id="app">
    <div>
      <div>
        <!-- <img class="img-time-matters" :src="require(`./assets/banner.jpg`)"> -->
  <b-card
    overlay
    :img-src="require(`./assets/banner.jpg`)"
    img-alt="Card Image"
    text-variant="white"
  >
  <div class="myNav">
        <b-navbar toggleable="lg"  >
          <h1 >Perricipes</h1>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#"
                ><router-link class="lnk" :to="{ name: 'main' }"
                  >Main</router-link
                ></b-nav-item
              >
              <b-nav-item href="#"
                ><router-link class="lnk" :to="{ name: 'search' }"
                  >Search</router-link
                ></b-nav-item
              >
              <b-nav-item href="#"
                ><router-link class="lnk" :to="{ name: 'about' }"
                  >About</router-link
                ></b-nav-item
              >
            </b-navbar-nav>

<b-navbar-nav class="ml-auto" v-if="!$root.store.username" >
              <b-nav-text  class="txt"><span class="txt">Hello guest</span></b-nav-text>

              <b-nav-item href="#"
                ><router-link class="lnk" :to="{ name: 'register' }"
                  >Register</router-link
                ></b-nav-item
              >
              <b-nav-item href="#"
                ><router-link class="lnk" :to="{ name: 'login' }"
                  >Login</router-link
                ></b-nav-item
              >
</b-navbar-nav>
<b-navbar-nav class="ml-auto" v-if="$root.store.username">
                          <b-nav-text ><span class="txt">Hello, {{ $root.store.username }}</span></b-nav-text>            

            <!-- Right aligned nav items -->

            <b-navbar-nav class="ml-auto" >
              <b-nav-item-dropdown text="Personal Area" class="txt" right>
                <b-dropdown-item href="#"><router-link style="color:black" :to="{ name: 'favorites' }"
                  >Favorites</router-link
                ></b-dropdown-item>
                <b-dropdown-item href="#"><router-link style="color:black" :to="{ name: 'mycreated' }"
                  >My recipes</router-link
                ></b-dropdown-item>
                <b-dropdown-item href="#"><router-link style="color:black" :to="{ name: 'myfamily' }"
                  >Family recipes</router-link
                ></b-dropdown-item>
              </b-nav-item-dropdown>
              
              <b-nav-item href="#"><button class="buttonNav" @click="Logout">Logout</button></b-nav-item>
              <div>
              <b-nav-item href="#"><button  v-b-modal.modal-1>New Recipe</button>
              
  <b-modal id="modal-1" ok-only ok-title="Cancel" ok-variant="dark" title="Hey Chef, enter your recipe ">
    <new-recipe-form @exit="closeModal"></new-recipe-form>
    
  </b-modal>
  </b-nav-item>
</div>
            </b-navbar-nav>
</b-navbar-nav>
          </b-collapse>
        </b-navbar>

  </div>
  </b-card>

        
      </div>
      <br>
    <br>
    <br>
    </div>
    <router-view />
    <br><br><br>
  </div>
  

</template>

<script>
import NewRecipeForm from './components/NewRecipeForm.vue';

export default {
  components: { NewRecipeForm},
  name: "App",
  data(){
    return{

    }
  },
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
      this.$root.toast("Success!", "New Recipe Created", "success");

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

#nav a {
  font-weight: bold;
  color: pink;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.myNav{
  background-color:rgba(0,0,0,0.5);
}


.myNav,router-link {
  color:white;
}

.lnk, .lnk:hover{
  color:white;
  text-decoration-line: none;
}

.txt{
  color:white
}


</style>
