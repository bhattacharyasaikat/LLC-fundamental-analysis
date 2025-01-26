import React from 'react';

interface HistoryProps {
    history: string[];
}


import jsPDF from 'jspdf';

const generatePDF = (history: string[]) => {
    const doc = new jsPDF();
    doc.text('Chat History', 10, 10);
    history.forEach((session, index) => {
        doc.text(`${session}`, 10, 20 + (index * 10));
    });
    doc.save('chat_history.pdf');
};

const History: React.FC<HistoryProps> = ({ history }) => {
    return (
        <div>
            <h2>Chat History</h2>
            <ul>
                {history.map((session, index) => (
                    <li key={index}>{session}</li>
                ))}
            </ul>
         
            <button onClick={() => generatePDF(history)}>Download PDF</button>
        </div>
    );
};

export default History;