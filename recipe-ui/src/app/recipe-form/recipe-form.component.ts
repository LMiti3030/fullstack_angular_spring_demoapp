import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit{

  model : any ;

  constructor(
    private router: Router, 
    private recipeService : RecipeService,
    private route: ActivatedRoute){
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null){
      this.recipeService.getRecipe(this.route.snapshot.paramMap.get('id')).
      subscribe({next: r => this.model = r, error: e => console.log(e)});
    } else{
      this.model = {id: null, name: null, description: null};
    }
  }


  onSubmit() : void{
    if(this.model.id){
      //update existing recipe
      //after updating, returns to display the recipes list
      this.recipeService.updateRecipe(this.model.id, this.model).
      subscribe(
        {
          next: r => this.router.navigate(['/']),
          error: e => console.log(e)
        }
      );
    } else{
      //adds a new recipe
      //after adding returns to display the list of recipes
      this.recipeService.createRecipe(this.model).
      subscribe(
        {
          next: r => this.router.navigate(['/']),
          error: e => console.log(e)
        }
      );
    }
    //programatically calling the Angular router and we're specifying the router to which we want to navigate back to
    //eliminated this as the promise would execute later than this call and we want to have smth to display
    // this.router.navigate(['/']);
  }

}
