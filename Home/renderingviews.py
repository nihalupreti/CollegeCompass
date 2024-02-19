from django.shortcuts import render
from .models import College, Program, Subject

def page_detail(request, college_id):
    college = College.objects.get(id=college_id) 
    programs = Program.objects.filter(college=college)
    subjects = Subject.objects.filter(program__in=programs)
    context = {
        'college': college,
        'programs': programs,
        'subjects': subjects,
    }
    return render(request, 'index.html', context)
