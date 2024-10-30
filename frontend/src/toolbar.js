import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Original Nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* Task1 Nodes */}
                <DraggableNode type='timerNode' label='Timer' />
                <DraggableNode type='mathNode' label='Math' />
                <DraggableNode type='filterNode' label='Filter' />
                <DraggableNode type='httpNode' label='HTTP' />
                <DraggableNode type='arrayNode' label='Array' />

                {/* Task2 Nodes */}
                <DraggableNode type='task2_input' label='Task2 Input' />
                <DraggableNode type='task2_llm' label='Task2 LLM' />
                <DraggableNode type='task2_output' label='Task2 Output' />
                <DraggableNode type='task2_text' label='Task2 Text' />

                {/* Task3 Nodes */}
                <DraggableNode type='task3_text' label='Task3 Text' />
            </div>
        </div>
    );
};
