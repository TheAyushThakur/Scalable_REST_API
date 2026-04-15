from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from .serializers import LoginSerializer, RegisterSerializer

User = get_user_model()


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request, version=None):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    return Response(
        {
            "success": True,
            "message": "User created successfully.",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            },
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_users(request, version=None):
    if request.user.role != "admin":
        return Response(
            {"success": False, "error": "Only admins can view all users."},
            status=status.HTTP_403_FORBIDDEN,
        )

    users = User.objects.all().order_by("id").values("id", "username", "email", "role")

    return Response(users)
