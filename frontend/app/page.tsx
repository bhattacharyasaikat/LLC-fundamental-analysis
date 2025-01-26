import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Database, MessageSquare, BarChart3, Users } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
   <main>



    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"
          style={{
            backgroundImage: `url('/placeholder.svg?height=600&width=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Transform your analysis process
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">
              MarketAI's Agent-Based Experimental Analysis (ABEA) is an AI-powered tool that helps you analyze companies and markets holistically, seamlessly work with large data. Our hybrid chat + forms interface enables multi-agent collaboration in our interactive reports and visuals.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/sign-in">
                Get started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            title="Dynamic Data Collection"
            description="Collect data from any source by asking MarketAI to find, extract, and summarize information from websites, databases, APIs, and more"
            icon={Database}
          />
          <FeatureCard
            title="Multi-Agent Analysis"
            description="Collaborate with multiple agents in the same conversation, and use our built-in voting system to make decisions based on agent consensus"
            icon={Users}
          />
          <FeatureCard
            title="Hybrid Chat"
            description="Ask MarketAI to explain its reasoning for any response, and use our built-in forms to collect structured data from agents without leaving the conversation"
            icon={MessageSquare}
          />
          <FeatureCard
            title="Interactive Reports & Visuals"
            description="Easily create and share interactive reports and visuals with your team or clients using our built-in report builder"
            icon={BarChart3}
          />
        </div>
      </section>
    </div>
   </main>
  )
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <Card className="bg-gray-900 border-gray-800 transition-transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-lg bg-blue-600">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}



