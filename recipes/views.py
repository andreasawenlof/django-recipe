from django.views.generic import CreateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Recipe
from .forms import RecipeForm


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
