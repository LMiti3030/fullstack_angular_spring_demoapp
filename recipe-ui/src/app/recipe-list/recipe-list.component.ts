import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{


  constructor(private recipeService : RecipeService ){}

  //TODO: will be replaced by actual backend data later from Spring
  //data should look similar to how it will come back from the DB
  // recipes = [
  //   { id: 1, name: 'Chocolate Chip Cookies', description: "Sugar, flour, chocolate chips, etc."},
  //   { id: 2, name: 'Wheat Bread', description: "Yeast, flour, water, etc."},
  //   { id: 3, name: 'Apple Pie', description: "Apple pie filling, pie crust, water, etc."}
  // ];

  recipes : any;

  selectedRecipe? : any;

  ngOnInit(): void {
    this.recipeService.getRecipeList().
    subscribe({next: r => this.recipes = r, error: e => console.log(e)})
  }

  onSelect(recipe : any) : void{
    this.selectedRecipe = recipe;
  }

  onDelete(recipe: any) : void{
    this.recipeService.deleteRecipe(recipe.id).
    subscribe({next: r => this.ngOnInit(), error: e => console.log(e)});
    // this.recipes = this.recipes.filter( obj => obj.id != recipe.id );
    //TODO: call backend delete and list refresh here and remove line above
  }


}
