package mititelu.laura.recipe.controllers;

import mititelu.laura.recipe.models.Recipe;
import mititelu.laura.recipe.repositories.RecipeJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/recipes")
public class RecipeRestController {

    @Autowired
    private RecipeJpaRepository recipeJpaRepository;

    @GetMapping("")
    public List<Recipe> listRecipes(){
        return recipeJpaRepository.findAll(); //select all on the database level
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id){
        return recipeJpaRepository.getReferenceById(id);
    }

    @PostMapping("")
    public Recipe createRecipe(@RequestBody Recipe recipe){
        return recipeJpaRepository.save(recipe);
        //it knows to save an object whether a new or existing object
        //returns the newly saved object
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@RequestBody Recipe recipe, @PathVariable Long id){
        Recipe currentRecipe = recipeJpaRepository.getReferenceById(id);
        currentRecipe.setName(recipe.getName());
        currentRecipe.setDescription(recipe.getDescription());

        //if lots of attributes/properties on the entity, do a property copy or use Apache Commons to help with that
        return recipeJpaRepository.save(currentRecipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        recipeJpaRepository.deleteById(id);
    }

}
