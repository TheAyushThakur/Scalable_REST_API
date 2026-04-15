import jwt
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class AuthApiTests(APITestCase):
    def setUp(self):
        self.register_url = "/api/v1/auth/register/"
        self.login_url = "/api/v1/auth/login/"
        self.users_url = "/api/v1/auth/users/"

    def test_register_creates_user_with_hashed_password_and_default_role(self):
        payload = {
            "username": "alice",
            "email": "alice@example.com",
            "password": "StrongPass123!",
        }
        response = self.client.post(self.register_url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])

        user = User.objects.get(username="alice")
        self.assertTrue(user.check_password("StrongPass123!"))
        self.assertEqual(user.role, "user")

    def test_login_returns_jwt_tokens_with_custom_claims(self):
        user = User.objects.create_user(
            username="bob",
            email="bob@example.com",
            password="StrongPass123!",
            role="user",
        )

        response = self.client.post(
            self.login_url,
            {"username": "bob", "password": "StrongPass123!"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

        payload = jwt.decode(
            response.data["access"],
            options={"verify_signature": False},
            algorithms=["HS256"],
        )
        self.assertEqual(payload["username"], user.username)
        self.assertEqual(payload["role"], user.role)

    def test_non_admin_cannot_list_users(self):
        user = User.objects.create_user(
            username="charlie",
            email="charlie@example.com",
            password="StrongPass123!",
        )
        self.client.force_authenticate(user=user)

        response = self.client.get(self.users_url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(response.data["success"])

    def test_admin_can_list_users(self):
        User.objects.create_user(
            username="member",
            email="member@example.com",
            password="StrongPass123!",
        )
        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="StrongPass123!",
        )
        self.client.force_authenticate(user=admin_user)

        response = self.client.get(self.users_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 2)
