from django import forms
from .models import Profile
from tinymce.widgets import TinyMCE


class ProfileForm(forms.ModelForm):
    """Form to create a profile"""

    class Meta:
        model = Profile
        fields = ["image", "bio"]

        labels = {"image": "Avatar", "bio": "Bio"}
