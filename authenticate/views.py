from math import trunc
import string
from unicodedata import category
from urllib import response
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash 
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib import messages

from authenticate.models import Category, Custcategory, Dalle, Savedata,User
from .forms import SignUpForm, EditProfileForm 
from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from authenticate import aicontent 
from django.views.decorators.csrf import csrf_exempt     
from rest_framework.serializers import *
from .serializers import CustomeCategorySerializer, SavedataSerializer,CategorySerializer
# from django.views.decorators.csrf import requires_csrf_token


def home(request): 
	return render(request, 'authenticate/home.html', {})

def profile(request):
	return render(request, 'authenticate/profile.html', {})
    
def newhome(request):
    	return render(request, 'authenticate/newhome.html', {})    

def index(request): 
	return render(request, 'authenticate/newhome.html', {})

def indexpage(request):
    return render(request, 'authenticate/index.html', {})


def dalle(request):
    return render(request,'authenticate/newdalle.html')
    


def login_user (request):
	if request.method == 'POST': #if someone fills out form , 
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(request, username=username, password=password)
		if user is not None:# if user exist
			login(request, user)
			messages.success(request,('Youre logged in'))
			return redirect('newhome') #routes to 'home' on successful login  
		else:
			messages.success(request,('Error logging in'))
			return redirect('login') #re routes to login page upon unsucessful login
	else:
		return render(request, 'authenticate/login.html', {})

def logout_user(request):
	logout(request)
	messages.success(request,('Youre now logged out'))
	return redirect('home')

def register_user(request):
	if request.method =='POST':
		form = SignUpForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data['username']
			password = form.cleaned_data['password1']
			user = authenticate(username=username, password=password)
			login(request,user)
                
			messages.success(request, ('Youre now registered'))
			return redirect('home')
	else: 
		form = SignUpForm() 

	context = {'form': form}
	return render(request, 'authenticate/register.html', context)

def edit_profile(request):
	if request.method =='POST':
		form = EditProfileForm(request.POST, instance= request.user)
		if form.is_valid():
			form.save()
			messages.success(request, ('You have edited your profile'))
			return redirect('home')
	else: 		#passes in user information 
		form = EditProfileForm(instance= request.user) 

	context = {'form': form}
	return render(request, 'authenticate/edit_profile.html', context)
	#return render(request, 'authenticate/edit_profile.html',{})





def change_password(request):
	if request.method =='POST':
		form = PasswordChangeForm(data=request.POST, user= request.user)
		if form.is_valid():
			form.save()
			update_session_auth_hash(request, form.user)
			messages.success(request, ('You have edited your password'))
			return redirect('home')
	else: 		#passes in user information 
		form = PasswordChangeForm(user= request.user) 

	context = {'form': form}
	return render(request, 'authenticate/change_password.html', context)



# d = Category.filter(id = "a")
# query_from_db = d.query
# query = request.POST.get("name")

# query = query_from_db + query
# openAIAnswer = aicontent.AnyAI(query)


# AI


class fetchfromDatabase(APIView):
    def post(self,request):
        current_user = request.user
        print(current_user)
        qry=Custcategory.objects.all()
        return JsonResponse({"msg":CustomeCategorySerializer(qry,many=True).data})

    
def coldemail(openAIAnswer):
    openAIAnswer = openAIAnswer.replace('\n', '<br>')
    return openAIAnswer
    
def tweetIdeasz(query):
        get_qry = Custcategory.objects.get(title = 'HashTags for social')
        mainquery=get_qry.query +  query
        mainquery = aicontent.AnyAI(mainquery)
        return mainquery
       
def remove(string):
    return string.replace("  ", "").replace("\n"," ")  

    
class anythingGenerate(APIView):
    def post(self,request):
        title = request.POST.get("title")
        query = request.POST.get("name")
        qry1=remove(query)
        get_qry = Custcategory.objects.get(title = title)
        mainqry=get_qry.query.ljust(len(get_qry.query)+1)
        mainquery=mainqry +  qry1
        print(mainquery)
        openAIAnswer = aicontent.AnyAI(mainquery)
        if title=="Cold Email":
            openAIAnswer=coldemail(openAIAnswer) 
        elif title=="Tweet Ideas":
            mainquery=tweetIdeasz(query)   
            print(mainquery)
            print(openAIAnswer)
            openAIAnswer = """
            {}
            <br>
            {}
            """.format(openAIAnswer,mainquery)
        elif title=="Video Ideas":
            openAIAnswer=coldemail(openAIAnswer)
        elif title=="Video Desc":
            openAIAnswer=coldemail(openAIAnswer)
        response = {
        'data': openAIAnswer,
        'query':query
        }

        return  Response(response)
       
        
        
        
        


class GenerateAnything(APIView):
    
    def post(self,request):
        
        query = request.POST.get("name")
        openAIAnswer = aicontent.AnyAI(query)
        response = {
        'data': openAIAnswer,
        'query':query
        }

        return  Response(response)
    
    
    
class saveAnything(APIView):
    def post(self,request):
        title = request.POST.get("title")
        query = request.POST.get("query")
        data = request.POST.get("data")
        category = request.POST.get("category")
        current_user = request.user
        print(current_user.id)
        qry=Savedata(title=title,query=query,data=data,user_id=current_user,category=category)
        qry.save()
        return JsonResponse({"flag": True, "msg": SavedataSerializer(qry).data}, safe=True)
      
        
class fetchanything(APIView):
    def get(self,request):
        current_user = request.user
        category = request.GET.get("category")
        qry=Savedata.objects.filter(category=category,user_id=current_user)
        return JsonResponse({"msg":SavedataSerializer(qry,many=True).data}, safe=True)
    
class fetchalldata(APIView):
    def get(self,request):
        current_user = request.user
        qry=Savedata.objects.filter(user_id=current_user).order_by('-id')
        return JsonResponse({"msg":SavedataSerializer(qry,many=True).data}, safe=True)
        
        
        
              
        
        

class productDescription(APIView):

    def post(self,request):
        query = request.POST.get("name")
        submit = "generate a detailed product description for:{}".format(query)
        openAIAnswer = aicontent.OpenAIquery(submit)
        response = {
        'data': openAIAnswer,
        'query':query
        }
        return  Response(response)
    
class jobDescription(APIView):
   
    def post(self,request):
        query = request.POST.get("name")
        openAIAnswer = aicontent.JobAI(query)
        response = {
        'data': openAIAnswer,
        'query':query
        }
        return  Response(response)
        
        

class tweetIdeas(APIView):
    def post(self,request):
        submission = request.POST.get("name")
        part1 = aicontent.TweetAi("Generate a tweet on the subject :{}".format(
            submission))
        part2 = aicontent.TweetAi(
            'Generate a twitter hashtags for:{}'.format(submission))
        openAIAnswer = """
        {}
        <br>
        {}
        """.format(part1, part2)
        response = {
        'data': openAIAnswer,
        'query':submission
        }
        return  Response(response)

class coldEmails(APIView):
    @csrf_exempt
    def post(self,request):
        query = request.POST.get("name")
        openAIAnswerunformatted = aicontent.MailAI(query)
        openAIAnswer = openAIAnswerunformatted.replace('\n', '<br>')
        print(openAIAnswer)

        prompt = 'AI Suggestions for {} are:'.format(query)
        response = {
        'data': openAIAnswer,
        'query':query
        }
        return  Response(response)
    
    
class socialMedia(APIView):
  
    def post(self,request):
        query = request.POST.get("name")
        submit = "Generate a social media advert ideas for :{}".format(query)
        openAIAnswer = aicontent.OpenAIquery(submit)
        response = {
         'data': openAIAnswer
        }
        return  Response(response)
      
      
class businessPitch(APIView):
    
    def post(self,request):
        query = request.POST.get("name")
        submit = "Generate a ideas for business:{}".format(query)
        print(submit)
        openAIAnswer = aicontent.OpenAIquery(submit)
        print(openAIAnswer)
        response = {
         'data': openAIAnswer,
         'query':query
        }
        return  Response(response)
    
class videoIdeas(APIView):
    @csrf_exempt
    def post(self,request):
        query = request.POST.get("name")
        openAIAnswerunformatted = aicontent.YoutubeIdeasAI(query)
        openAIAnswer = openAIAnswerunformatted.replace('\n', '<br>')
        prompt = 'AI Suggestions for {} are:'.format(query)
        response = {
         'data': openAIAnswer,
         'query':query
        }
        return  Response(response)
    
    

class videoDescription(APIView):
    def post(self,request):
        submission = request.POST.get("name")
        query = "Write a detailed Youtube Video desciption for the following topic :{}".format(
            submission)
        openAIAnswerunformatted = aicontent.OpenAIquery(query)
        openAIAnswer = openAIAnswerunformatted.replace('\n', '<br>')
        response = {
         'data': openAIAnswer,
         'query':submission
        }
        return  Response(response)
        
        
  
    
    
class process(APIView):
    @csrf_exempt
    def post(self,request):
        digit=request.POST.get("digit")
        if digit=='':
            digit=9

        name=request.POST.get("name")
      
        
        
        data = {
            "prompt": name
            }
        resp = requests.post("https://backend.craiyon.com/generate", json= data)
        if resp.status_code == 200:
            final = resp.json()
            result =final["images"]
            
            if name:
                newName = name
                response = {
                    'name': newName,
                    'data':final,
                    'digit':digit,
                }
                return  Response(response)
            return JsonResponse({'error' : 'Missing data!'})
        else:
            resp = requests.post("https://backend.craiyon.com/generate", json= data)
            final = resp.json()
            result =final["images"]
            
            if name:
                newName = name
                response = {
                    'name': newName,
                    'data':final,
                    'digit':digit
                }
                return  Response(response)
            return JsonResponse({'error' : 'Missing data!'})
        
        
# from craiyon import Craiyon
# class cryion(APIView):
#     def get(self,request):
#         text=request.data['prompt']
#         generator = Craiyon() # Instantiates the api wrapper
#         result = generator.generate(text)
#         images = result.images
#         dict={}
#         for i in images:
#             dict[i]=i
#             print(dict)
#         return JsonResponse({"data":dict})




class test(APIView):
    def post(self,request):
        text = request.POST.get("text")
        
        # text=request.data["text"]
        if text is None:
            text="flower"
            
        print(text)
        print("Dalle 2 is called")
        server_url = 'grpcs://dalle-flow.dev.jina.ai'
        
        prompt = text

        from docarray import Document
        num = 0
        print("thiissss====>")
        dicts = []
        for i in range(2):
            da = Document(text=prompt).post(server_url, parameters={'num_images': 1}).matches
            print("heyeyeyeyye====>>>")
            # da.plot_image_sprites(fig_size=(10,10), show_index=True)
            for j in range(2):
                    print("IN Looopppp===>>>")
                    print("Image : ",num)
                    fav_id = j
                    fav = da[fav_id]
                    qry=Dalle.objects.get(id=1)
#                     if qry.size=="256":
#                         dicts.append(fav.uri)
#                     else:
#                         fav = fav.post(f'{server_url}/upscale')
                    dicts.append(fav.uri)
                    # dicts[i]=fav.uri
                    # fav = fav.post(f'{server_url}/upscale')
        return JsonResponse({"data":dicts})
