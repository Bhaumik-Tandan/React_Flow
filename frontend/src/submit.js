import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { AlertCircle, Check, XCircle } from 'lucide-react';

// Basic Alert Components
const Alert = ({ children, className }) => (
    <div className={`p-4 rounded-lg border ${className}`}>
        {children}
    </div>
);

const AlertTitle = ({ children }) => (
    <h4 className="font-bold">{children}</h4>
);

const AlertDescription = ({ children }) => (
    <p>{children}</p>
);

export const SubmitButton = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const instance = useReactFlow();

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            
            // Get current nodes and edges
            const nodes = instance.getNodes();
            const edges = instance.getEdges();
            
            // Create pipeline data
            const pipelineData = new FormData();
            pipelineData.append('pipeline', JSON.stringify({ nodes, edges }));
            
            // Send to backend
            const response = await fetch('/pipelines/parse', {
                method: 'POST',
                body: pipelineData
            });
            
            const data = await response.json();
            
            // Show alert with results
            setAlertData(data);
            setShowAlert(true);
            
            // Hide alert after 5 seconds
            setTimeout(() => setShowAlert(false), 5000);
            
        } catch (error) {
            console.error('Failed to submit pipeline:', error);
            setAlertData({
                error: 'Failed to process pipeline. Please try again.'
            });
            setShowAlert(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end gap-4">
            {showAlert && alertData && (
                <Alert className={`w-96 ${alertData.error ? 'border-red-500' : alertData.is_dag ? 'border-green-500' : 'border-yellow-500'}`}>
                    <div className="flex items-center gap-2">
                        {alertData.error ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                        ) : alertData.is_dag ? (
                            <Check className="h-5 w-5 text-green-500" />
                        ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                        <AlertTitle>
                            {alertData.error ? 'Error' : 'Pipeline Analysis'}
                        </AlertTitle>
                    </div>
                    <AlertDescription className="mt-2">
                        {alertData.error ? (
                            alertData.error
                        ) : (
                            <>
                                <div>Nodes: {alertData.num_nodes}</div>
                                <div>Edges: {alertData.num_edges}</div>
                                <div>Valid DAG: {alertData.is_dag ? 'Yes' : 'No'}</div>
                            </>
                        )}
                    </AlertDescription>
                </Alert>
            )}
            
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
            </button>
        </div>
    );
};

export default SubmitButton;
