from django.conf import Settings
from django.contrib import admin

from authenticate.models import Custcategory, Dalle, Savedata,Category,Setting

# Register your models here.

admin.site.register(Savedata)
admin.site.register(Category)


admin.site.register(Custcategory)
admin.site.register(Dalle)


@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    change_form_template = "admin/authenticate/setting/change_form.html"
   


