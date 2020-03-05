from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
import random
import json

def index(request):
    graph1 = {
                0 : [4,3,1],
                1 : [0,2,3,4,5],
                2 : [1,4,5],
                3 : [0,1,4,6,7],
                4 : [0,1,2,3,5,6,7,8],
                5 : [1,2,4,7,8],
                6 : [3,4,7],
                7 : [3,4,5,6,7,8],
                8 : [4,5,7]
            }
    for i in range(1):
        r = random.randint(0,8)
        visited = dfs(graph1,r, [])
        json_pattern=json.dumps(visited)

    return render(request,'patternUnlock/index.html',{"pattern":json_pattern})

def dfs(graph, node, visited):
    random.shuffle(graph[node])
    if node not in visited:
        visited.append(node)
        for n in graph[node]:
            dfs(graph,n, visited)
    k = random.randint(4,9)
    return visited[:k]
