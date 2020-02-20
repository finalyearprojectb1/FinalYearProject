import random
graph1 = {
    '1' : ['5','4','2'],
    '2' : ['1','3','4','5','6'],
    '3' : ['2','5','6'],
    '4' : ['1','2','5','7','8'],
    '5' : ['1','2','3','4','6','7','8','9'],
    '6' : ['2','3','5','8','9'],
    '7' : ['4','5','8'],
    '8' : ['4','5','6','7','8','9'],
    '9' : ['5','6','8']
}

def dfs(graph, node, visited):
    random.shuffle(graph[node])
    if node not in visited:
        visited.append(node)
        for n in graph[node]:
            dfs(graph,n, visited)
    k = random.randint(4,9)
    return visited[:k]
for i in range(5):
    r = random.randint(1,9)
    visited = dfs(graph1,str(r), [])
    print(visited)