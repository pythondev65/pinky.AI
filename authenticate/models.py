from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User


# Create your models here.
class Savedata(models.Model):
    title = models.CharField(max_length=200)
    data= models.TextField()
    query=models.CharField(max_length=200)
    category=models.CharField(max_length=200)
    user_id = models.ForeignKey(User,to_field='id',on_delete=models.CASCADE)
    
    
    


class Category(models.Model):
    title = models.CharField(max_length=200)
    query=models.CharField(max_length=200)
    user_id = models.ForeignKey(User,to_field='id',on_delete=models.CASCADE)
    


class Custcategory(models.Model):
    title = models.CharField(max_length=200)
    query=models.CharField(max_length=200)
    
    def __str__(self):
       return  self.title
    
    
        
    
class Setting(models.Model):
    name= models.CharField(max_length=200,default='test')
    temperature = models.FloatField()
    temperature=models.FloatField()
    max_tokens=models.IntegerField()
    top_p=models.FloatField()
    frequency_penalty=models.FloatField()
    presence_penalty=models.FloatField()
    categoryid = models.ForeignKey(Custcategory,to_field='id',on_delete=models.CASCADE,default='10')
    
    def __str__(self):
         return self.name
    
Size_Image = (
    ('1024','1024'),
    ('256', '256'),
   
)

class Dalle(models.Model):
    size = models.CharField(max_length=6, choices=Size_Image, default='256')   
    
    def __str__(self):
         return "Set size of image"

    
    
    
    