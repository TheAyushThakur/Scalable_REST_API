from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .serializers import LoginSerializer, RegisterSerializer

User = get_user_model()
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response({
        "message": "User created successfully."
    }, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    if request.user.role != "admin":
        return Response({"error": "Only admins can view all users."}, status=403)

    users = User.objects.all().values(
        'id', 'username', 'email', 'role'
    )

    return Response(users)