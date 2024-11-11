from django.views.generic import CreateView, ListView, DetailView, DeleteView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from .models import Recipe
from .forms import RecipeForm


class Recipes(ListView):
    """View all recipes"""

    template_name = "recipes/recipes.html"
    model = Recipe
    context_object_name = "recipes"


class RecipeDetail(DetailView):
    """View a single recipe"""

    template_name = "recipes/recipe_detail.html"
    model = Recipe
    context_object_name = "recipe"


class AddRecipe(LoginRequiredMixin, CreateView):
    """Add Recipe View"""

    template_name = "recipes/add_recipe.html"
    model = Recipe
    form_class = RecipeForm
    success_url = "/recipes/"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["include_tinymce"] = True
        return context

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(AddRecipe, self).form_valid(form)

class EditRecipe(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    """ Edit a recipe """
    template_name = "recipes/edit_recipe.html"
    model = Recipe
    form_class = RecipeForm
    success_url = '/recipes/'
    def test_func(self):
        return self.request.user == self.get_object().user
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["include_tinymce"] = True
        return context

class DeleteRecipe(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    """ Delete a Recipe """
    model = Recipe
    success_url = '/recipes/'
    
    def test_func(self):
        return self.request.user == self.get_object().user
    
    
