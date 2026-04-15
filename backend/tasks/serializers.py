from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Task
        fields = ["id", "owner", "title", "description", "is_completed", "created_at"]

    def validate_title(self, value):
        title = value.strip()
        if not title:
            raise serializers.ValidationError("Title cannot be empty.")
        return title

    def validate_description(self, value):
        if value is None:
            return ""
        description = value.strip()
        if len(description) > 2000:
            raise serializers.ValidationError("Description cannot exceed 2000 characters.")
        return description
