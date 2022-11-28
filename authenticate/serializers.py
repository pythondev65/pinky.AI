from .models import Category, Custcategory, Savedata
from rest_framework import serializers, exceptions


class SavedataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savedata
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class CustomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Custcategory
        fields = '__all__'