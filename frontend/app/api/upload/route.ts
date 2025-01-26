// import { NextResponse } from 'next/server'
// import { writeFile } from 'fs/promises'
// import path from 'path'

// export async function POST(request: Request) {
//   const formData = await request.formData()
//   const file = formData.get('file') as File

//   if (!file) {
//     return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
//   }

//   const bytes = await file.arrayBuffer()
//   const buffer = Buffer.from(bytes)

//   // // Save the file
//   // const uploadDir = path.join(process.cwd(), 'uploads')
//   // const filePath = path.join(uploadDir, file.name)
  
//   // try {
//   //   await writeFile(filePath, buffer)
//   //   console.log(`File saved to ${filePath}`)
//   //   return NextResponse.json({ message: 'File uploaded successfully' })
//   // } catch (error) {
//   //   console.error('Error saving file:', error)
//   //   return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
//   // }
//   const response = await fetch('http://127.0.0.1:8000/api/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     return NextResponse.json({ error: errorData.error }, { status: response.status });
//   }

// }

// --------------------------------------
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const formDataToSend = new FormData();
  formDataToSend.append('file', file);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/upload', {
      method: 'POST',
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Show toast notification for uploading
      document.dispatchEvent(new CustomEvent('show-toast', { detail: 'Document is uploading...' }));
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }

    const responseData = await response.json();
    console.log('Backend response:', responseData.message);
    return NextResponse.json({ message: responseData.message });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
