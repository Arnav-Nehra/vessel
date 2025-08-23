'use client'

import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function EditorPage() {
  const { slug } = useParams()
  const editorRef = useRef<any>(null);
  const [editorData, setEditorData] = useState<any>(null)
  const [isEditorReady, setIsEditorReady] = useState(false)

  useEffect(() => {
    const initEditor = async () => {
      try {
        // Import EditorJS only on the client side
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        const Quote = (await import("@editorjs/quote")).default
        const Code = (await import("@editorjs/code")).default
        const ImageJS = (await import("@editorjs/image")).default
        const Paragraph = (await import("@editorjs/paragraph")).default
        const Table = (await import("@editorjs/table")).default

        editorRef.current = new EditorJS({
          holder: "editorjs",
          autofocus: true,
          placeholder: 'Start writing your content',
          tools: {
            header: Header,
            quote: Quote,
            code: Code,
            image: ImageJS,
            paragraph: Paragraph,
            table: Table,
          }
        })

        setIsEditorReady(true)
      } catch (error) {
        console.error('Error initializing EditorJS:', error)
      }
    }

    // Only initialize on client side
    if (typeof window !== 'undefined') {
      const timer = setTimeout(initEditor, 100)
      return () => clearTimeout(timer)
    }

    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (error) {
          console.error('Error destroying editor:', error)
        }
        editorRef.current = null;
      }
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Document Editor</h1>
        <p className="text-gray-600 mb-2">
          Edit your content below. Document: <code className="bg-blue-100 px-2 py-1 rounded">{slug}</code>
        </p>
      </div>
      
      <div className="border rounded-lg p-4 min-h-[500px] bg-white dark:bg-gray-900">
        <div id="editorjs" className="min-h-[400px]" />
        {!isEditorReady && (
          <div className="flex items-center justify-center h-64 text-gray-500">
            Loading EditorJS...
          </div>
        )}
      </div>
    </div>
  )
}