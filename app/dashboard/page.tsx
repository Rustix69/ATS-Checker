"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, FileText, LogOut, RefreshCw, Settings, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// Mock data for history
const mockHistory = [
  {
    id: "1",
    resumeName: "Software_Engineer_Resume.pdf",
    jobName: "Senior Frontend Developer",
    score: 82,
    date: "2023-03-15T10:30:00Z",
    matchedKeywords: ["React", "TypeScript", "JavaScript", "Redux", "HTML", "CSS"],
    missingKeywords: ["Next.js", "GraphQL"],
  },
  {
    id: "2",
    resumeName: "Software_Engineer_Resume_v2.pdf",
    jobName: "Full Stack Developer",
    score: 75,
    date: "2023-03-10T14:45:00Z",
    matchedKeywords: ["React", "Node.js", "JavaScript", "MongoDB"],
    missingKeywords: ["AWS", "Docker", "Kubernetes"],
  },
  {
    id: "3",
    resumeName: "Software_Engineer_Resume_v3.pdf",
    jobName: "Frontend Engineer",
    score: 68,
    date: "2023-03-05T09:15:00Z",
    matchedKeywords: ["React", "JavaScript", "CSS", "HTML"],
    missingKeywords: ["TypeScript", "Redux", "Testing"],
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("history")
  const router = useRouter()
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const handleDownload = (id: string) => {
    toast({
      title: "Report downloaded",
      description: "Your ATS analysis report has been downloaded",
    })
  }

  const handleRerun = (id: string) => {
    toast({
      title: "Analysis started",
      description: "We're re-analyzing your resume against the job description",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-bold">ATS Score Checker</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Upload className="mr-2 h-4 w-4" />
              New Check
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your resume checks and view your history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            <div className="grid gap-6">
              {mockHistory.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.jobName}</CardTitle>
                        <CardDescription>Resume: {item.resumeName}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <div
                          className={`text-lg font-bold ${
                            item.score >= 80 ? "text-green-600" : item.score >= 60 ? "text-amber-600" : "text-red-600"
                          }`}
                        >
                          {item.score}%
                        </div>
                        <CardDescription>{formatDate(item.date)}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Matched Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.matchedKeywords.slice(0, 3).map((keyword, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {keyword}
                              </span>
                            ))}
                            {item.matchedKeywords.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                +{item.matchedKeywords.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Missing Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.missingKeywords.slice(0, 3).map((keyword, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                {keyword}
                              </span>
                            ))}
                            {item.missingKeywords.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                +{item.missingKeywords.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button variant="outline" size="sm" onClick={() => handleDownload(item.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleRerun(item.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Re-run Analysis
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockHistory.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No history yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't checked any resumes yet. Upload a resume to get started.
                </p>
                <Button onClick={() => router.push("/")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Name</label>
                      <div className="font-medium">John Doe</div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Email</label>
                      <div className="font-medium">john.doe@example.com</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Subscription</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="font-medium">Free Plan</div>
                    <p className="text-sm text-muted-foreground">
                      You are currently on the free plan. Upgrade to get more features.
                    </p>
                    <Button className="mt-3" size="sm">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Danger Zone</h3>
                  <div className="bg-red-50 p-3 rounded-md border border-red-200">
                    <div className="font-medium text-red-700">Delete Account</div>
                    <p className="text-sm text-red-600">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" className="mt-3" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

