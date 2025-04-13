from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Student, Subject, Result, User
from .serializers import StudentSerializer, SubjectSerializer, ResultSerializer, UserSerializer
from django.views.generic import TemplateView
from django.conf import settings
import os
from django.http import FileResponse, HttpResponse
from django.views import View
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_admin

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser | ReadOnly]

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAdminUser | ReadOnly]

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsAdminUser | ReadOnly]

    @action(detail=False, methods=['GET'])
    def student_results(self, request):
        student_id = request.query_params.get('student_id')
        if student_id:
            results = self.queryset.filter(student_id=student_id)
            serializer = self.get_serializer(results, many=True)
            return Response(serializer.data)
        return Response({'error': 'student_id parameter is required'}, status=400)

    def get_queryset(self):
        queryset = Result.objects.all()
        if self.request.user.is_student:
            queryset = queryset.filter(student__user=self.request.user)
        return queryset

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['GET'])
    def current(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class FrontendView(View):
    def get(self, request, path=''):
        if not path:
            path = 'index.html'
        
        file_path = os.path.join(settings.BASE_DIR, 'static', 'frontend', path)
        
        if os.path.exists(file_path):
            with open(file_path, 'rb') as f:
                content = f.read()
            
            content_type = 'text/html'
            if path.endswith('.js'):
                content_type = 'application/javascript'
            elif path.endswith('.css'):
                content_type = 'text/css'
            
            return HttpResponse(content, content_type=content_type)
        else:
            return HttpResponse('File not found', status=404)
