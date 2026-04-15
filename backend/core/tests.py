from rest_framework import status
from rest_framework.test import APITestCase


class CoreApiTests(APITestCase):
    def test_health_endpoint_works_for_v1(self):
        response = self.client.get("/api/v1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "ok")

    def test_invalid_api_version_is_rejected(self):
        response = self.client.get("/api/v2/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
