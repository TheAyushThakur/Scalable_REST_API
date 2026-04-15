from django.urls import path
from .views import TaskListCreateView, TaskDetailView

app_name = "tasks"

urlpatterns = [
    path("", TaskListCreateView.as_view(), name="task-list-create"),
    path("<int:pk>/", TaskDetailView.as_view(), name="task-detail"),
]
