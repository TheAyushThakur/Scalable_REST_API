from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Task


User = get_user_model()


class TaskApiTests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner",
            email="owner@example.com",
            password="StrongPass123!",
        )
        self.other_user = User.objects.create_user(
            username="other",
            email="other@example.com",
            password="StrongPass123!",
        )
        self.admin = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="StrongPass123!",
        )

        self.owner_task = Task.objects.create(
            owner=self.owner,
            title="Owner Task",
            description="Owned by owner",
        )
        self.other_task = Task.objects.create(
            owner=self.other_user,
            title="Other Task",
            description="Owned by other",
        )

        self.list_url = "/api/v1/tasks/"

    def test_create_task_sets_owner_from_authenticated_user(self):
        self.client.force_authenticate(user=self.owner)
        payload = {"title": "New Task", "description": "Create task flow"}

        response = self.client.post(self.list_url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        task = Task.objects.get(title="New Task")
        self.assertEqual(task.owner, self.owner)

    def test_regular_user_lists_only_own_tasks(self):
        self.client.force_authenticate(user=self.owner)

        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Owner Task")

    def test_admin_lists_all_tasks(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_regular_user_cannot_access_other_users_task_detail(self):
        self.client.force_authenticate(user=self.owner)

        response = self.client.get(f"/api/v1/tasks/{self.other_task.id}/")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_update_and_delete_any_task(self):
        self.client.force_authenticate(user=self.admin)

        update_response = self.client.put(
            f"/api/v1/tasks/{self.other_task.id}/",
            {
                "title": "Updated By Admin",
                "description": "Changed by admin",
                "is_completed": True,
            },
            format="json",
        )
        delete_response = self.client.delete(f"/api/v1/tasks/{self.owner_task.id}/")

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
