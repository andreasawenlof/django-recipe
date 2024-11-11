from django import forms
from tinymce.widgets import TinyMCE
from .models import Recipe


class RecipeForm(forms.ModelForm):
    """Forms to create a recipe"""

    class Meta:
        model = Recipe
        fields = [
            "title",
            "description",
            "ingredients",
            "instructions",
            "image",
            "image_alt",
            "meal_type",
            "cuisine_types",
            "calories",
        ]

        widgets = {
            "description": forms.Textarea(attrs={"rows": 5}),
            "ingredients": TinyMCE(),
            "instructions": TinyMCE(),
        }

        labels = {
            "title": "Recipe Title",
            "description": "Description",
            "ingredients": "Recipe Ingredients",
            "instructions": "Recipe Instructions",
            "image": "Recipe Image",
            "image_alt": "Describe Image",
            "meal_type": "Meal Type",
            "cuisine_types": "Cuisine Type",
            "calories": "Calories",
        }
