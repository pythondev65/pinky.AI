import os
from random import choices
from django.conf import settings
import openai
from authenticate.models import Category, Savedata,User,Setting,Custcategory
from rest_framework.views import APIView



openai.api_key = settings.OPENAI_API_KEY


# class setting(APIView):
#     def get(self,request):
#         qry=Setting.objects.get(id=1)
        


def MailAI(query):
    qry=Setting.objects.get(categoryid=3)
    response = openai.Completion.create(
        model="davinci-instruct-beta",
        prompt="write a cold email to potential clients about:{}".format(
            query),
        temperature=qry.temperature,
        max_tokens=qry.max_tokens,
        top_p=qry.top_p,
        frequency_penalty=qry.frequency_penalty,
        presence_penalty=qry.presence_penalty
    )
    if 'choices' in response:
        if len(response['choices']) > 0:
            answer = response['choices'][0]['text']
        else:
            answer = "oops Sorry.You beat the AI this time 1"
    else:
        answer = "oops Sorry.You beat the AI this time 2"
    return answer





def JobAI(query):
    qry=Setting.objects.get(categoryid=5)
    response = openai.Completion.create(
        model="davinci-instruct-beta",
        prompt="Generate a detailed job description for :{}".format(
            query),
        temperature=qry.temperature,
        max_tokens=qry.max_tokens,
        top_p=qry.top_p,
        frequency_penalty=qry.frequency_penalty,
        presence_penalty=qry.presence_penalty
    )
    
    if 'choices' in response:
        if len(response['choices']) > 0:
            answer = response['choices'][0]['text']
        else:
            answer = "oops Sorry.You beat the AI this time 1"
    else:
        answer = "oops Sorry.You beat the AI this time 2"
    return answer

def AnyAI(query):
    qry=Setting.objects.get(categoryid=1)
    response = openai.Completion.create(
        model="davinci-instruct-beta",
        prompt= query,
        temperature=qry.temperature,
        max_tokens=qry.max_tokens,
        top_p=qry.top_p,
        frequency_penalty=qry.frequency_penalty,
        presence_penalty=qry.presence_penalty
    )
    if 'choices' in response:
        if len(response['choices']) > 0:
            answer = response['choices'][0]['text']
        else:
            answer = "oops Sorry.You beat the AI this time 1"
    else:
        answer = "oops Sorry.You beat the AI this time 2"
    return answer


def TweetAi(query):
    qry=Setting.objects.get(categoryid=6)
    response = openai.Completion.create(
        model="davinci-instruct-beta",
        prompt=query,
        temperature=qry.temperature,
        max_tokens=qry.max_tokens,
        top_p=qry.top_p,
        frequency_penalty=qry.frequency_penalty,
        presence_penalty=qry.presence_penalty
    )
    if 'choices' in response:
        if len(response['choices']) > 0:
            answer = response['choices'][0]['text']
        else:
            answer = "oops Sorry.You beat the AI this time 1"
    else:
        answer = "oops Sorry.You beat the AI this time 2"
    return answer


def YoutubeIdeasAI(query):
    qry=Setting.objects.get(categoryid=9)
    response = openai.Completion.create(
        model="davinci-instruct-beta",
        prompt="Generate a Youtube Video Topic ideas on:{}".format(
            query),
        temperature=qry.temperature,
        max_tokens=qry.max_tokens,
        top_p=qry.top_p,
        frequency_penalty=qry.frequency_penalty,
        presence_penalty=qry.presence_penalty
    )
    if 'choices' in response:
        if len(response['choices']) > 0:
            answer = response['choices'][0]['text']
        else:
            answer = "oops Sorry.You beat the AI this time 1"
    else:
        answer = "oops Sorry.You beat the AI this time 2"
    return answer


def OpenAIquery(query):
    qry=Setting.objects.get(categoryid=10)
    response = openai.Completion.create(
        model="davinci-instruct-beta",
        prompt=query,
        temperature=qry.temperature,
        max_tokens=qry.max_tokens,
        top_p=qry.top_p,
        frequency_penalty=qry.frequency_penalty,
        presence_penalty=qry.presence_penalty
    )
    if 'choices' in response:
        if len(response['choices']) > 0:
            answer = response['choices'][0]['text']
        else:
            answer = "oops Sorry.You beat the AI this time 1"
    else:
        answer = "oops Sorry.You beat the AI this time 2"
    return answer
