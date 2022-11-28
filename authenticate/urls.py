from django.urls import path
from . import views

urlpatterns = [
    path('home', views.home, name ="home"),
    path('login/', views.login_user, name ='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('', views.index, name='index'),
    path('indexpage', views.indexpage, name='indexpage'),
    
    path('profile/', views.profile, name='profile'),
    path('newhome/', views.newhome, name='newhome'),
    path('dalle/', views.dalle, name='dalle'),
    
    
    
    
    
    
    path('change_password/', views.change_password, name='change_password'),
    
    path('generate-anything/',views.GenerateAnything.as_view(), name='generateAnything'),
    path('saveanything/',views.saveAnything.as_view(), name='saveAnything'),
    path('profile/fetchanything-data/',views.fetchanything.as_view(), name='fetchanything'),
    
   
    
    path('product-description/',views.productDescription.as_view(), name='productDescription'),
    path('job-description/',views.jobDescription.as_view(), name='jobDescription'),
    path('tweet-ideas/',views.tweetIdeas.as_view(), name='tweetIdeas'),
    path('cold-emails/',views.coldEmails.as_view(), name='coldEmails'),
    path('social-media/',views.socialMedia.as_view(), name='socialMedia'),
    path('businesspitch-ideas/',views.businessPitch.as_view(), name='businessPitch'),
    path('video-ideas/',views.videoIdeas.as_view(), name='videoIdeas'),
    path('social-media/',views.socialMedia.as_view(), name='socialMedia'),
    path('process/',views.process.as_view(), name='process'),
    path('video-description/',views.videoDescription.as_view(), name='videoDescription'),
    
    
    path('newhome/saveanything/',views.saveAnything.as_view(), name='saveAnything'),
    path('profile/newhome/fetchalldata/',views.fetchalldata.as_view(), name='fetchalldata'),
    
    

    path('newhome/fromdatafetch/',views.fetchfromDatabase.as_view(), name='fetchfromDatabase'),
    path('fromdatafetch/',views.fetchfromDatabase.as_view(), name='fetchfromDatabase'),
    
    path('newhome/anything-generate/',views.anythingGenerate.as_view(), name='anythingGenerates'),
    path('anything-generate/',views.anythingGenerate.as_view(), name='anythingGenerates'),
    
    path('dalle/test/',views.test.as_view(), name='test'),
    
    
    
    
]

