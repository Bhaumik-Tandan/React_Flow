from fastapi import FastAPI, Form
from typing import Dict, List, Set
from collections import defaultdict
import json

app = FastAPI()

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a DAG using DFS
    """
    # Create adjacency list
    adj_list = defaultdict(list)
    for edge in edges:
        adj_list[edge['source']].append(edge['target'])
    
    # Track visited nodes and nodes in current path
    visited = set()
    path = set()
    
    def has_cycle(node: str) -> bool:
        """DFS helper to detect cycles"""
        if node in path:
            return True
        if node in visited:
            return False
            
        visited.add(node)
        path.add(node)
        
        # Check all neighbors
        for neighbor in adj_list[node]:
            if has_cycle(neighbor):
                return True
                
        path.remove(node)
        return False
    
    # Check each node that hasn't been visited
    node_ids = {node['id'] for node in nodes}
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        # Parse pipeline data
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data['nodes']
        edges = pipeline_data['edges']
        
        # Calculate metrics
        num_nodes = len(nodes)
        num_edges = len(edges)
        dag_status = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': dag_status
        }
        
    except Exception as e:
        return {
            'error': str(e),
            'num_nodes': 0,
            'num_edges': 0,
            'is_dag': False
        }