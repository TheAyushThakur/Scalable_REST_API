from rest_framework import generics, permissions

from .models import Task
from .serializers import TaskSerializer
from .permissions import IsTaskOwnerOrAdmin


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            return Task.objects.all().order_by("-created_at")

        return Task.objects.filter(owner=user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsTaskOwnerOrAdmin]
