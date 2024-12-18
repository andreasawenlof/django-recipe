import datetime, calendar

from django_reorder.reorder import reorder

from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Meal


class MealPlanner(LoginRequiredMixin, TemplateView):
    """View meal planner"""

    template_name = "meal_planner/meal_planner.html"
    model = Meal

    def get_context_data(self, **kwargs):
        today = datetime.date.today()
        days_in_month = calendar.monthrange(today.eyar, today.month)[1]

        days = [
            datetime.date(today.year, today.month, day)
            for day in range(1, days_in_month, +1)
        ]

        meals = Meal.objects.filter(
            user=self.request.user, meal_date__in=days
        ).order_by(reorder(meal_type=["breakfast", "lunch", "dinner"]))
