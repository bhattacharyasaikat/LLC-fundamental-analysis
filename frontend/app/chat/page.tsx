
// 'use client';

// import { useState } from 'react';
// import { Avatar } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Paperclip, Send } from 'lucide-react';

// export default function ChatPage() {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileUpload, setFileUpload] = useState<File | null>(null);

//   const fetchResponse = async (message: string) => {
//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Received response:', data.content); // Verify the content
//         const assistantMessage = { role: 'assistant', content: data.content };
//         setMessages((prevMessages) => [...prevMessages, assistantMessage]);
//       } else {
//         console.error('Failed to fetch response:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error while fetching response:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);
//     await fetchResponse(input);
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const file = e.target.files[0];
//       setFileUpload(file);

//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           console.log('File uploaded successfully');
//         } else {
//           console.error('File upload failed');
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-950">
//       {/* Header */}
//       <header className="border-b border-gray-800 p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold text-white">AI Analytics</h1>
//           <Avatar className="h-8 w-8">
//             <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
//           </Avatar>
//         </div>
//       </header>

//       {/* Chat Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
//           >
//             <div className="flex items-start gap-2 max-w-[80%]">
//               {message.role === 'user' && (
//                 <Avatar className="h-8 w-8">
//                   <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
//                 </Avatar>
//               )}
//               <Card
//                 className={`p-3 ${message.role === 'user' ? 'bg-gray-800 text-white border-gray-700' : 'bg-blue-600 text-white border-blue-500'}`}
//               >
//                 {/* <p>{typeof(message.content)}</p> */}
//                 <p>{message.content}</p>
//               </Card>
//               {message.role === 'assistant' && (
//                 <Avatar className="h-8 w-8">
//                   <img src="/placeholder.svg?height=32&width=32" alt="AI avatar" />
//                 </Avatar>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="border-t border-gray-800 p-4">
//         <div className="container mx-auto">
//           <form onSubmit={handleSubmit} className="flex items-center gap-2">
//             <input
//               type="file"
//               id="file-upload"
//               className="hidden"
//               onChange={handleFileChange}
//               accept=".pdf,.csv"
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors"
//             >
//               <Paperclip className="h-5 w-5 text-gray-400" />
//             </label>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//           {fileUpload && (
//             <div className="mt-2 text-sm text-gray-400">File attached: {fileUpload.name}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Paperclip, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import History from '@/components/History';
export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [history, setHistory] = useState<string[]>([]); // Example history

  const fetchResponse = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
      });
      // const response = await fetch('/api/chat', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      if (response.ok) {
        const data = await response.json();
        const assistantMessage = { role: 'assistant', content: data.content };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        setHistory((prevHistory) => [...prevHistory, message, data.content]); // Update history
        
      } else {
        console.error('Failed to fetch response:', response.statusText);
      }
    } catch (error) {
      console.error('Error while fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    console.log("printing usermessage.content: ",userMessage.content)
    // setHistory([...history, userMessage.content]); // Update history
    console.log(history);
    await fetchResponse(input);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFileUpload(file);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
   <div>
    {/* <Navbar/> */}
    <div className="flex h-screen bg-gray-950">
      {/* Left Sidebar */}
      <aside className="w-1/4 border-r border-gray-800 bg-gray-900 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold text-white mb-4">Chat History</h2>
        <ul className="space-y-2">
          {/* {history.map((session, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              {session}
            </li>
          ))} */}

          <History history={history} />
        </ul>
      </aside>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 p-4 bg-gray-900">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">AI Chat</h1>
            <Avatar className="h-8 w-8">
              <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
            </Avatar>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                  </Avatar>
                )}
                <Card
                  className={`p-3 ${
                    message.role === 'user'
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-blue-600 text-white border-blue-500'
                  }`}
                >
                  <p>{message.content}</p>
                </Card>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <img src="/placeholder.svg?height=32&width=32" alt="AI avatar" />
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4 bg-gray-900">
          <div className="container mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.csv"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Paperclip className="h-5 w-5 text-gray-400" />
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
            {fileUpload && (
              <div className="mt-2 text-sm text-gray-400">File attached: {fileUpload.name}</div>
            )}
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
