from rest_framework import serializers
from .models import Student, Subject, Result, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_student', 'is_admin')
        read_only_fields = ('id',)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('user', 'roll_number', 'name', 'class_name')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'name', 'code')

class ResultSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)

    class Meta:
        model = Result
        fields = ('id', 'student', 'subject', 'marks', 'date_added', 'student_name', 'subject_name')
        read_only_fields = ('date_added',) 