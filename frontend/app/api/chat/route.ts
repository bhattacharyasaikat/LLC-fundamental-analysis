// import { StreamingTextResponse } from 'ai'

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   const { messages } = await req.json()
//   const lastMessage = messages[messages.length - 1]

//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: lastMessage.content }),
//     });

//     const data = await response.json();

//     // Create a ReadableStream from the response data
//     const stream = new ReadableStream({
//       start(controller) {
//         controller.enqueue(data.response);
//         controller.close();
//       },
//     });

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error('Error calling Flask API:', error);
//     return new Response('Error processing your request', { status: 500 });
//   }
// }

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const lastMessage = messages[messages.length - 1];

//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: lastMessage.content }),
//     });

//     const data = await response.json();
//     console.log(data.response)

//     // Ensure the response is in the expected format
//     return new Response(JSON.stringify({ content: data.response }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error('Error calling Flask API:', error);
//     return new Response(JSON.stringify({ content: 'Error processing your request' }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  try {
    const response = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: lastMessage.content }),
    });

    const data = await response.json();
    // console.log('Backend response:', data.response); // Check if the response is correct

    // Ensure the response is in the expected format
    return new Response(JSON.stringify({ content: data.response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error calling Flask API:', error);
    return new Response(JSON.stringify({ content: 'Error processing your request' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function GET(req:Request){
  try {
    const response = await fetch("https://mocki.io/v1/f4dd7a18-8ed8-4b9a-8d33-8a01cebdff7b",{
      method:"GET",
      headers:{ "Content-Type": "application/json" }
    })

    const data = await response.json() ;
    // console.log(data.response);
    return new Response(JSON.stringify({ content: data.response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    
  } catch (error) {
    console.error('Error calling  Mock API:', error);
    return new Response(JSON.stringify({ content: 'Error processing your request' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}