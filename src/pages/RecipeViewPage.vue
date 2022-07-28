<template>
  <div class="pageView">
    <br><br><br>
    <div v-if="recipe" class="recipeContainer">
  <b-card-group columns >
    <b-card
      :title="recipe.title"
      :img-src="recipe.image"
      img-alt="Image"
      img-top
    >
      <b-card-text>
        <b-icon-clock-fill></b-icon-clock-fill> {{ recipe.time_to_cook }} minutes
      </b-card-text>
    </b-card>

    <b-card title="Information" text-variant="white" bg-variant="dark"><br>
      <b-card-text >
        
        <p><b-icon-hand-thumbs-up-fill></b-icon-hand-thumbs-up-fill> {{ recipe.popularity }} </p>
        <p v-if="recipe.vegan"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegan</p>
        <p v-if="recipe.vegetarian"><b-icon-patch-check-fill></b-icon-patch-check-fill> Vegetarian</p>
        <p v-if="recipe.gluten_free_sign"><b-icon-patch-check-fill></b-icon-patch-check-fill> Gluten-Free</p>
        <p v-if="recipe.isWatched"> <b-icon-eye-fill></b-icon-eye-fill></p>
        <p v-if="recipe.isPrefered"><b-icon-heart-fill></b-icon-heart-fill></p>

      </b-card-text>
    </b-card>

    <b-card title="You'll need" >
      <b-card-text>
        <ul>
              <li
                v-for="(r, index) in recipe.ingredients_list"
                :key="index + '_' + r.id"
              >
              
                {{ r.original }} , {{r.amount}}
              </li>
            </ul>   </b-card-text>
      <b-card-text class="danger-text">For {{recipe.pieces_amount}} servings</b-card-text>
    </b-card>

    <b-card v-if="recipe.isPrefered==false && $root.store.username && this.$route.query.is_my_created=='false' && this.$route.query.is_my_family=='false'">
              <b-button  @click="MarkAsFavorite" variant="outline-dark">Mark as favorite</b-button>

    </b-card>

    <b-card >
      <b-card-title>Instructions</b-card-title>
      <b-card-text>
                    <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
      </b-card-text>
    </b-card>
<b-card title="Family Stuff" v-if=" this.$route.query.is_my_family=='true'" text-variant="white" bg-variant="dark"><br>
      <b-card-text >
        
        <p><b-icon-person></b-icon-person>  {{ recipe.maker }} </p>
        <p><b-icon-calendar2-day></b-icon-calendar2-day>  {{ recipe.when_making }} </p>

      </b-card-text>
    </b-card>

    <b-card v-if=" this.$route.query.is_my_family=='true'"
      :img-src="recipe.image"
      img-alt="Image"
      
    >
    </b-card>

  </b-card-group>
</div>
  </div>
</template>

<script>
import { BIconPerson, BIconCalendar2Day } from 'bootstrap-vue'

export default {
  mounted() {
    try {
      this.axios.put(
        this.$root.store.server_domain + `/users/mark-as-watched/${recipe.id}`
        // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId,
        // {
        //   params: { recipeID: this.$route.params.recipeId }
        // }
      );
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
  },
  components:{
        BIconPerson,
        BIconCalendar2Day

  },
  props:{
    
  },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      let obj = {
            "id": 1,
            "title": "Fried Anchovies with Sage",
            "time_to_cook": 45,
            "image": "https://spoonacular.com/recipeImages/1-556x370.jpg",
            "popularity": 3,
            "vegan": false,
            "vegetarian": false,
            "gluten_free_sign": false,
            "ingredients_list": [
                {
                    "id": 15001,
                    "aisle": "Seafood",
                    "image": "fresh-anchovies.jpg",
                    "consistency": "SOLID",
                    "name": "anchovies",
                    "nameClean": "boquerones",
                    "original": "1lb of anchovies cleaned, spine removed",
                    "originalName": "anchovies cleaned, spine removed",
                    "amount": 1,
                    "unit": "lb",
                    "meta": [
                        "cleaned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1,
                            "unitShort": "lb",
                            "unitLong": "pound"
                        },
                        "metric": {
                            "amount": 453.592,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 18371,
                    "aisle": "Baking",
                    "image": "white-powder.jpg",
                    "consistency": "SOLID",
                    "name": "baking powder",
                    "nameClean": "low sodium baking powder",
                    "original": "1 teaspoon of baking powder",
                    "originalName": "baking powder",
                    "amount": 1,
                    "unit": "teaspoon",
                    "meta": [],
                    "measures": {
                        "us": {
                            "amount": 1,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 1123,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "egg.png",
                    "consistency": "SOLID",
                    "name": "egg",
                    "nameClean": "egg",
                    "original": "1 egg",
                    "originalName": "egg",
                    "amount": 1,
                    "unit": "",
                    "meta": [],
                    "measures": {
                        "us": {
                            "amount": 1,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 1,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 20081,
                    "aisle": "Baking",
                    "image": "flour.png",
                    "consistency": "SOLID",
                    "name": "flour",
                    "nameClean": "wheat flour",
                    "original": "1 cup of flour",
                    "originalName": "flour",
                    "amount": 1,
                    "unit": "cup",
                    "meta": [],
                    "measures": {
                        "us": {
                            "amount": 1,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 99226,
                    "aisle": "Produce",
                    "image": "fresh-sage.png",
                    "consistency": "SOLID",
                    "name": "sage leaves",
                    "nameClean": "sage",
                    "original": "sage leaves (optional - if you are not a fan of sage just omit)",
                    "originalName": "sage (optional - if you are not a fan of sage just omit)",
                    "amount": 1,
                    "unit": "leaves",
                    "meta": [
                        "(optional - if you are not a fan of sage just omit)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1,
                            "unitShort": "leaf",
                            "unitLong": "leave"
                        },
                        "metric": {
                            "amount": 1,
                            "unitShort": "leaf",
                            "unitLong": "leave"
                        }
                    }
                },
                {
                    "id": 2047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consistency": "SOLID",
                    "name": "salt",
                    "nameClean": "table salt",
                    "original": "1 teaspoon of salt",
                    "originalName": "salt",
                    "amount": 1,
                    "unit": "teaspoon",
                    "meta": [],
                    "measures": {
                        "us": {
                            "amount": 1,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 14121,
                    "aisle": "Beverages",
                    "image": "sparkling-water.png",
                    "consistency": "LIQUID",
                    "name": "seltzer water",
                    "nameClean": "sparkling water",
                    "original": "seltzer water",
                    "originalName": "seltzer water",
                    "amount": 3,
                    "unit": "servings",
                    "meta": [],
                    "measures": {
                        "us": {
                            "amount": 3,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 3,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 4513,
                    "aisle": null,
                    "image": null,
                    "consistency": "SOLID",
                    "name": "vegetable oil",
                    "nameClean": null,
                    "original": "vegetable oil for frying",
                    "originalName": "vegetable oil for frying",
                    "amount": 3,
                    "unit": "servings",
                    "meta": [
                        "for frying"
                    ],
                    "measures": {
                        "us": {
                            "amount": 3,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 3,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                }
            ],
            "instructions": "<p>If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza (\"extra anchovies\")! These little suckers are delicious &amp; actually good for you! Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with SageAcciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for fryingIn a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.Heat oil in a pot to 350 degree.Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.Remove from oil &amp; drain on a paper towel.Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.</p>",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza (\"extra anchovies\")! These little suckers are delicious &amp; actually good for you!",
                            "ingredients": [
                                {
                                    "id": 15001,
                                    "name": "anchovies",
                                    "localizedName": "anchovies",
                                    "image": "anchovies.jpg"
                                },
                                {
                                    "id": 0,
                                    "name": "lollipops",
                                    "localizedName": "lollipops",
                                    "image": "no.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 2,
                            "step": "Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with Sage",
                            "ingredients": [
                                {
                                    "id": 15001,
                                    "name": "anchovies",
                                    "localizedName": "anchovies",
                                    "image": "anchovies.jpg"
                                },
                                {
                                    "id": 10115261,
                                    "name": "fish",
                                    "localizedName": "fish",
                                    "image": "fish-fillet.jpg"
                                },
                                {
                                    "id": 99226,
                                    "name": "sage",
                                    "localizedName": "sage",
                                    "image": "fresh-sage.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Acciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for frying",
                            "ingredients": [
                                {
                                    "id": 15001,
                                    "name": "anchovies",
                                    "localizedName": "anchovies",
                                    "image": "anchovies.jpg"
                                },
                                {
                                    "id": 99226,
                                    "name": "sage",
                                    "localizedName": "sage",
                                    "image": "fresh-sage.png"
                                },
                                {
                                    "id": 4582,
                                    "name": "cooking oil",
                                    "localizedName": "cooking oil",
                                    "image": "vegetable-oil.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "In a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.",
                            "ingredients": [
                                {
                                    "id": 18369,
                                    "name": "baking powder",
                                    "localizedName": "baking powder",
                                    "image": "white-powder.jpg"
                                },
                                {
                                    "id": 14121,
                                    "name": "sparkling water",
                                    "localizedName": "sparkling water",
                                    "image": "sparkling-water.png"
                                },
                                {
                                    "id": 20081,
                                    "name": "all purpose flour",
                                    "localizedName": "all purpose flour",
                                    "image": "flour.png"
                                },
                                {
                                    "id": 1123,
                                    "name": "egg",
                                    "localizedName": "egg",
                                    "image": "egg.png"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "localizedName": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "localizedName": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 5,
                            "step": "Heat oil in a pot to 350 degree.",
                            "ingredients": [
                                {
                                    "id": 4582,
                                    "name": "cooking oil",
                                    "localizedName": "cooking oil",
                                    "image": "vegetable-oil.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404752,
                                    "name": "pot",
                                    "localizedName": "pot",
                                    "image": "stock-pot.jpg"
                                }
                            ]
                        },
                        {
                            "number": 6,
                            "step": "Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.",
                            "ingredients": [
                                {
                                    "id": 15001,
                                    "name": "anchovies",
                                    "localizedName": "anchovies",
                                    "image": "anchovies.jpg"
                                },
                                {
                                    "id": 99226,
                                    "name": "sage",
                                    "localizedName": "sage",
                                    "image": "fresh-sage.png"
                                },
                                {
                                    "id": 0,
                                    "name": "dip",
                                    "localizedName": "dip",
                                    "image": ""
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 7,
                            "step": "Remove from oil &amp; drain on a paper towel.",
                            "ingredients": [
                                {
                                    "id": 4582,
                                    "name": "cooking oil",
                                    "localizedName": "cooking oil",
                                    "image": "vegetable-oil.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 405895,
                                    "name": "paper towels",
                                    "localizedName": "paper towels",
                                    "image": "paper-towels.jpg"
                                }
                            ]
                        },
                        {
                            "number": 8,
                            "step": "Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.",
                            "ingredients": [
                                {
                                    "id": 14106,
                                    "name": "white wine",
                                    "localizedName": "white wine",
                                    "image": "white-wine.jpg"
                                },
                                {
                                    "id": 0,
                                    "name": "prosecco",
                                    "localizedName": "prosecco",
                                    "image": "champagne.png"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "localizedName": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": []
                        }
                    ]
                }
            ],
            "pieces_amount": 3,
            "isPrefered": false,
            "isWatched": false
        };
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/users/",
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId
          // this.$root.store.server_domain + "/recipes/full_recipe/"+this.$route.params.recipeId,
          // {
          //   params: { recipeID: this.$route.params.recipeId }
          // }
        );

        console.log(response);
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        // extendedIngredients,
        time_to_cook,
        image,
        title,
        id,
        popularity,
        vegan,
        vegetarian,
        gluten_free_sign,
        ingredients_list,
        pieces_amount,
        isPrefered,
        isWatched,
        // } = response.data.recipes_objects[0];
      } = obj;
      {
      }
      try{
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);
      let _recipe = {
        // instructions,
        _instructions,
        // analyzedInstructions,
        // extendedIngredients,
        // aggregateLikes,
        // readyInMinutes,
        // image,
        // title,
        instructions,
        // extendedIngredients,
        time_to_cook,
        image,
        title,
        id,
        popularity,
        vegan,
        vegetarian,
        gluten_free_sign,
        ingredients_list,
        pieces_amount,
        isPrefered,
        isWatched,
      };

      this.recipe = _recipe;

      }
      catch(e){
      let _instructions = JSON.parse(instructions)
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);
      let _recipe = {
        _instructions,
        instructions,
        time_to_cook,
        image,
        title,
        id,
        popularity,
        vegan,
        vegetarian,
        gluten_free_sign,
        ingredients_list,
        pieces_amount,
        isPrefered,
        isWatched,
      };

      this.recipe = _recipe;
      this.recipe.ingredients_list=JSON.parse(ingredients_list)

      }

    } catch (error) {
      console.log(error);
    }
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
        this.recipe.isPrefered=true;
      }
      catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
      
    }

  }
};
</script>

<style scoped>

/* .recipePageContainer{
    position: absolute;
  width:80%;
  left:10%;
  right:10%;
} */
/* .wrapper {
  display: flex;
    width:100%;
  padding: 0 10% 0  10%;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
} */

.pageView{
  width: 100%;
}

.recipeContainer{
    width: 90%;
    margin-left:5%

}
/* .recipe-header{

} */
</style>
