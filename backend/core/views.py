from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def index(request, version=None):
    return Response({"status": "ok", "version": version or "v1", "message": "Core app working"})
